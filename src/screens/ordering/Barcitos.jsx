import { useNavigation } from "@react-navigation/native";
import { makeStyles, Tile, SearchBar, Text } from "@rneui/themed";
import { View, ScrollView, Alert } from "react-native";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import { useState, useEffect } from "react";
import { useOrderingDispatch } from "../../context/OrderingState";
import { AuthAPI } from "../../api/AuthAPI";
import CustomModal from "../../components/CustomModal";
import { Button } from "@rneui/base";

const Barcitos = () => {
    const styles = useStyles();
    const { setBarcito } = useOrderingDispatch();
    const { data: barList, isLoading } = useQuery(['barcitos'], async () => BarcitoAPI.getAllBarcitos());
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const [showMap, setShowMap] = useState(false);
    const [barMap, setBarMap] = useState();

    useEffect( () => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
                '¿Cerrar sesión?',
                'Volverás a la página de login.',
                [
                    {
                        text: 'Cancelar', style: 'cancel', onPress: () => {}
                    },
                    {
                        text: 'Cerrar sesión',
                        style: 'destructive',
                        onPress: () => { AuthAPI.signOut(); navigation.dispatch(e.data.action) }
                    }
                ]
            );
        });
    }, [navigation]);

    const updateSearch = (searchValue) => {
        setSearch(searchValue);
    }

    const onTilePress = (barcito) => {
        setBarcito(barcito);
        navigation.navigate('Home', {
            screen: 'Categories'
        })
    }

    if(isLoading){
        return (<View><Text>Loading...</Text></View>);
    }

    const barcitoList = search === '' ? barList : barList.filter((bar) => bar.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <SearchBar
                placeholder="Buscar barcito"
                onChangeText={updateSearch}
                value={search}
                round={true}
            />
            <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
                { barcitoList.map((bar, i)=> {
                    return (
                        <View key={bar.id} style={{ backgroundColor: 'black' }}>
                            <Tile
                                imageSrc={{ uri: bar.imagePath }}
                                title={bar.name}
                                titleStyle={{ color: 'white', fontSize: 20, textAlign: 'center' }}
                                onPress={() => onTilePress(bar)}
                            />
                            <View style={styles.barFooter}>
                                <Text style={styles.barName}>{bar.academicUnit.description}</Text>
                                <Button title='Ver en mapa' onPress={() => {setShowMap(true); setBarMap(bar)}} />
                            </View>
                        </View>
                    );
                })
                }
            </ScrollView>
            <CustomModal isVisible={showMap} setIsVisible={setShowMap} barcito={barMap} />
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    },
    barTile: {
        width: '90%',
        height: 200,
        backgroundColor: 'red',
        margin: 10
    },
    barFooter: {
        justifyContent: 'space-around'
    },
    barName: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white'
    }
}));

export default Barcitos;