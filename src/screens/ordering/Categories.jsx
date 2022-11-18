import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ListItem, SearchBar } from "@rneui/themed";
import { FlatList, Pressable } from "react-native";

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
    const { params } = useRoute();
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const cates = CATS.filter( (cat) => cat.barcitoId === params.barcitoId);

    const updateSearch = (searchValue) =>{
        setSearch(searchValue);
    }

    const onPressCategory = (categoryId) => {
        navigation.navigate('Home', {
            screen: 'Products',
            params: { categoryId }
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
                    <Pressable onPress={() => onPressCategory(item.id)}>
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