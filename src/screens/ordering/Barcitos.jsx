import { useNavigation } from "@react-navigation/native";
import { makeStyles, Tile, SearchBar, Text, Button, Card, Image } from "@rneui/themed";
import { View, ScrollView, Alert, Pressable } from "react-native";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import { useState, useEffect } from "react";
import { useOrderingDispatch } from "../../context/OrderingState";
import { AuthAPI } from "../../api/AuthAPI";
import CustomModal from "../../components/CustomModal";
import CustomButton from "../../components/CustomButton";
import LoadingScreen from "../../components/LoadingScreen";

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
        return <LoadingScreen />;
    }

    const barcitoList = search === '' ? barList : barList.filter((bar) => bar.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <SearchBar
                placeholder="Buscar barcito"
                onChangeText={updateSearch}
                value={search}
                round={true}
                containerStyle={styles.searchBarContainer}
                inputStyle={styles.searchInput}
                cursorColor={styles.searchCursor}
            />
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                { barcitoList.map((bar, i)=> {
                    return (
                        <Pressable key={bar.id} style={styles.pressable} onPress={() => onTilePress(bar)}>
                            <View style={styles.barCard}>
                                <Image source={{ uri: bar.imagePath }} containerStyle={styles.imageContainer} resizeMode="cover"/>
                                <Text style={styles.titleText}>{bar.name}</Text>
                                <Text style={styles.subtitleText}>{bar.academicUnit.description}</Text>
                                <CustomButton
                                    title='Ver en mapa'
                                    containerStyle={styles.buttonContainer}
                                    onPress={() => {setShowMap(true); setBarMap(bar)}}
                                />
                            </View>
                        </Pressable>
                    );
                })
                }
            </ScrollView>
            <CustomModal isVisible={showMap} setIsVisible={setShowMap} barcito={barMap} />
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    searchBarContainer: {
        backgroundColor: theme.colors.backgroundVariant
    },
    searchInput: {
        color: theme.colors.onBackground
    },
    searchCursor: theme.colors.primary,
    scrollViewContainer: {
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressable: {
        width: '85%'
    },
    barCard: {
        height: 400,
        marginVertical: 15,
        backgroundColor: theme.colors.backgroundVariant,
        borderRadius: 10,
        padding: 10
    },
    imageContainer: {
        width: '100%',
        height: '75%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: theme.colors.onBackground
    },
    subtitleText: {
        fontSize: 15,
        textAlign: 'center',
        color: theme.colors.onBackground,
        marginBottom: 5
    },
    buttonContainer: {
        width: '50%',
        alignSelf: 'center',
        borderRadius: 5
    }
}));

export default Barcitos;