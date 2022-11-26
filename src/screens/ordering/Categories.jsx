import { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, SearchBar } from "@rneui/themed";
import { Alert, FlatList, Pressable, View, Text } from "react-native";
import { OrderingContext } from "../../context/OrderingState";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";

const Categories = () => {
    const { barcito, isOrdering, onClean } = useContext(OrderingContext);
    const { data: catList, isLoading } = useQuery(['categories'], async () => BarcitoAPI.getCategories(barcito.id));
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    
    useEffect( () => {
        navigation.addListener('beforeRemove', (e) => {
            if(!isOrdering){
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
    }, [navigation]);
    
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
        return <View><Text>Is Loading</Text></View>;
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
            />
            <Pressable onPress={() => onPressCategory({ id: 0, description: 'TODO'})}>
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