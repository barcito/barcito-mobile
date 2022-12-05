import { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, SearchBar, Icon, makeStyles } from "@rneui/themed";
import { Alert, FlatList, Pressable, View, Text, ImageBackground } from "react-native";
import { OrderingContext, useOrdering, useOrderingDispatch } from "../../context/OrderingState";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import BarcitoImageBackground from "../../components/BarcitoImageBackground";
import LoadingScreen from "../../components/LoadingScreen";

const Categories = () => {
    const { barcito, orderedProducts } = useOrdering();
    const { onClean } = useOrderingDispatch();
    const { data: catList, isLoading } = useQuery(['categories'], async () => BarcitoAPI.getCategories(barcito.id));
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const styles = useStyles();
    
    useEffect( () => {
        if(orderedProducts.length > 0){
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
                Alert.alert(
                    '¿Cancelar pedido?',
                    'Si querés volver a la pantalla de barcitos, se quitarán los productos del pedido actual.',
                    [
                        {
                            text: 'Continuar pedido', style: 'cancel', onPress: () => {}
                        },
                        {
                            text: 'Cancelar pedido',
                            style: 'destructive',
                            onPress: () => { onClean(); navigation.dispatch(e.data.action) }
                        }
                    ]
                );
            });
        } else {
            navigation.removeListener('beforeRemove');
        }
    }, [navigation, orderedProducts]);
    
    const updateSearch = (searchValue) =>{
        setSearch(searchValue);
    };
    
    const onPressCategory = (category) => {
        navigation.navigate('Home', {
            screen: 'Products',
            params: { categoryId: category.id, categoryName: category.description }
        })
    };

    if(isLoading){
        return <LoadingScreen />;
    }
    
    const cates = catList.filter( (cat) => cat.barcitoId === barcito.id );
    
    const categoriesList = search === '' ? cates : cates.filter((cat) => cat.description.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <SearchBar
                placeholder="Buscar categoria"
                onChangeText={updateSearch}
                value={search}
                round={true}
                containerStyle={styles.searchBarContainer}
                inputStyle={styles.searchInput}
                cursorColor={styles.searchCursor}
            />
            <BarcitoImageBackground barcito={barcito} />
            <Pressable style={styles.container} onPress={() => onPressCategory({ id: 0, description: 'TODO'})}>
                <ListItem containerStyle={styles.item} style={{ padding: 5 }}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}>Todo</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron color={styles.chevron} />
                </ListItem>
            </Pressable>
            <FlatList
                style={styles.container}
                data={categoriesList}
                renderItem={({item}) => 
                    <Pressable onPress={() => onPressCategory(item)}>
                        <ListItem containerStyle={styles.item} style={{ padding: 5 }}>
                            <ListItem.Content>
                                <ListItem.Title style={styles.text}>{item.description}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron color={styles.chevron} />
                        </ListItem>
                    </Pressable>
                }
                keyExtractor={(cat) => cat.id}
            />
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
    container: {
        backgroundColor: theme.colors.background
    },
    item: {
        backgroundColor: theme.colors.backgroundVariant
    },
    text: {
        color: theme.colors.onBackground,
        fontWeight: 'bold'
    },
    chevron: theme.colors.onBackground
}))

export default Categories;