import { useNavigation } from "@react-navigation/native";
import { makeStyles, Tile, SearchBar, Text } from "@rneui/themed";
import { View, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import { useState } from "react";
import { useOrderingDispatch } from "../../context/OrderingState";

const Barcitos = () => {
    const styles = useStyles();
    const { setBarcito } = useOrderingDispatch();
    const { data: barList, isLoading } = useQuery(['barcitos'], async () => BarcitoAPI.getAllBarcitos());
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

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
                        <View key={bar.id} style={{ backgroundColor: 'gray' }}>
                            <Tile
                                imageSrc={{ uri: bar.imagePath }}
                                title={bar.name}
                                titleStyle={{ fontSize: 20, textAlign: 'center', paddingBottom: 5 }}
                                onPress={() => onTilePress(bar)}
                            />
                            <Text style={{ textAlign: 'center'}}>{bar.location}</Text>
                        </View>
                    );
                })
                }
            </ScrollView>
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