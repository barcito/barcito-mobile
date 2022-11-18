import { useNavigation } from "@react-navigation/native";
import { makeStyles, Tile, SearchBar, Image, Text } from "@rneui/themed";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import { useState } from "react";

const BARS = [
    { id: 1, name: 'Barcito FAI', imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/320px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg', academicUnit: {description: 'Facultad de Informatica'} },
    { id: 2, name: 'Barcito FAIN', imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/320px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg', academicUnit: {description: 'Facultad de Ingenieria'} },
    { id: 3, name: 'Barcito FAEA', imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/320px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg', academicUnit: {description: 'Facultad de Economia y Administracion'} },
    { id: 4, name: 'Barcito FAHUMA', imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/320px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg', academicUnit: {description: 'Facultad de Humanidades'} },
    { id: 5, name: 'Barcito FACIAS', imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/320px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg', academicUnit: {description: 'Facultad de Ciencias de la Educación'} }
]

const Barcitos = () => {
    const styles = useStyles();
    const { data, isLoading } = useQuery(['barcitos'], async () => BarcitoAPI.getAllBarcitos());
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const updateSearch = (searchValue) => {
        setSearch(searchValue);
    }

    const onTilePress = (barcitoId) => {
        navigation.navigate('Home', {
            screen: 'Categories',
            params: { barcitoId }
        })
    }

    if(isLoading){
        return (<View><Text>Loading...</Text></View>);
    }

    const barcitoList = search === '' ? BARS : BARS.filter((bar) => bar.name.toLowerCase().includes(search.toLowerCase()));

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
                        <Tile
                            imageSrc={{ uri: bar.imagePath }}
                            title={bar.name}
                            titleStyle={{ fontSize: 20, textAlign: 'center', paddingBottom: 5 }}
                            onPress={() => onTilePress(bar.id)}
                        />
                    );
                })
                }
            </ScrollView>
            {/* <Button title="Categories" onPress={() => navigation.navigate('Home', { screen: 'Categories' }) } /> */}
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
    }
}));

export default Barcitos;