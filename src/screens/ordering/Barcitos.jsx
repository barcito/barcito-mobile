import { useNavigation } from "@react-navigation/native";
import { makeStyles, Tile, SearchBar, Text, Button, Card } from "@rneui/themed";
import { View, ScrollView, Alert } from "react-native";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import { useState, useEffect } from "react";
import { useOrderingDispatch } from "../../context/OrderingState";
import { AuthAPI } from "../../api/AuthAPI";
import CustomModal from "../../components/CustomModal";
import CustomButton from "../../components/CustomButton";

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
        <View style={styles.screenContainer}>
            <SearchBar
                placeholder="Buscar barcito"
                onChangeText={updateSearch}
                value={search}
                round={true}
            />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                { barcitoList.map((bar, i)=> {
                    return (
                        <Card containerStyle={{ width: '80%', height: 500 }} wrapperStyle={{ height: '100%' }}>
                            <Card.FeaturedTitle style={{color: 'red'}}>{bar.name}</Card.FeaturedTitle>
                            <Card.FeaturedSubtitle style={{color: 'red'}}>{bar.name}</Card.FeaturedSubtitle>
                            <Card.Image source={{ uri: bar.imagePath }} resizeMethod='resize' resizeMode='cover' style={{ height: '85%' }} />
                            <CustomButton buttonStyle={styles.buttonStyle} title='Ver en mapa' onPress={() => {setShowMap(true); setBarMap(bar)}} />
                        </Card>
                        /* <View key={bar.id} style={styles.tileContainer}>
                            <Tile
                                imageSrc={{ uri: bar.imagePath }}
                                title={`${bar.name}, ${bar.academicUnit.description}`}
                                titleStyle={styles.tileTitle}
                                onPress={() => onTilePress(bar)}
                            />
                            <CustomButton title='Ver en mapa' onPress={() => {setShowMap(true); setBarMap(bar)}} />
                        </View> */
                    );
                })
                }
            </ScrollView>
            <CustomModal isVisible={showMap} setIsVisible={setShowMap} barcito={barMap} />
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    contentContainer: {
        paddingBottom: 80,
        alignItems: 'center',
    },
    tileContainer: {
        width: '100%',
        borderWidth: 5
    },
    tileTitle: {
        color: theme.colors.onBackgroud,
        fontSize: 20,
        textAlign: 'center'
    },
    tileDescription: {
        textAlign: 'center',
        fontSize: 15,
        color: theme.colors.onBackgroud
    },
    buttonStyle: {
        backgroundColor: theme.colors.secondary,
        width: '50%',
        alignSelf: 'center'
    }
}));

export default Barcitos;