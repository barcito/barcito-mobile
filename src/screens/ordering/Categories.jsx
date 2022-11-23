import { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, SearchBar } from "@rneui/themed";
import { Alert, FlatList, Pressable } from "react-native";
import { OrderingContext } from "../../context/OrderingContext";

const CATS = [
    { id: 1, description: 'Category 1', barcitoId: 1 },
    { id: 2, description: 'Category 2', barcitoId: 1 },
    { id: 3, description: 'Category 3', barcitoId: 1 },
    { id: 4, description: 'Category 4', barcitoId: 2 },
    { id: 5, description: 'Category 5', barcitoId: 2 },
    { id: 6, description: 'Category 6', barcitoId: 3 },
    { id: 7, description: 'Category 7', barcitoId: 3 },
    { id: 8, description: 'Category 8', barcitoId: 4 },
    { id: 9, description: 'Category 9', barcitoId: 5 },
    { id: 10, description: 'Category 10', barcitoId: 4 },
    { id: 11, description: 'Category 11', barcitoId: 3 },
    { id: 12, description: 'Category 12', barcitoId: 5 }
]

const Categories = () => {
    const { barcito, orderedProducts, onClean } = useContext(OrderingContext);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    
    useEffect( () => {
        navigation.addListener('beforeRemove', (e) => {
            if(!orderedProducts.length > 0){
                return;
            }
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
    }, [navigation, orderedProducts]);

    const cates = CATS.filter( (cat) => cat.barcitoId === barcito.id );

    const updateSearch = (searchValue) =>{
        setSearch(searchValue);
    }

    const onPressCategory = (category) => {
        navigation.navigate('Home', {
            screen: 'Products',
            params: { categoryId: category.id, categoryName: category.description }
        })
    }

    const categoriesList = search === '' ? cates : cates.filter((cat) => cat.description.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <SearchBar
                placeholder="Buscar categoria"
                onChangeText={updateSearch}
                value={search}
                round={true}
            />
            <Pressable onPress={() => onPressCategory(0)}>
                <ListItem style={{ marginBottom: 5 }}>
                    <ListItem.Content>
                        <ListItem.Title>Todo</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </Pressable>
            <FlatList
                data={categoriesList}
                renderItem={({item}) => 
                    <Pressable onPress={() => onPressCategory(item)}>
                        <ListItem style={{ marginBottom: 5 }}>
                            <ListItem.Content>
                                <ListItem.Title>{item.description}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </Pressable>
                }
                keyExtractor={(cat) => cat.id}
            />
        </>
    );
}

export default Categories;