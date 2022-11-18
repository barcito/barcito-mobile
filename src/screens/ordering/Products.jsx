import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { Card, SearchBar, Text, Button } from "@rneui/themed";

import mockProducts from '../../utils/mock-products';
import { FlatList } from "react-native";

const PRODS = mockProducts;

const Products = () => {
    const { params } = useRoute();
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const updateSearch = (searchValue) =>{
        setSearch(searchValue);
    }

    const productList = search === '' ? PRODS : PRODS.filter((prod) => prod.description.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <SearchBar
                placeholder="Buscar producto"
                onChangeText={updateSearch}
                value={search}
                round={true}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Text>Esta viendo TODOS los productos</Text>
                <Button>Cambiar</Button>
            </View>
            <FlatList
                data={productList}
                renderItem={({item}) => (
                    item.categories.id === params.categoryId &&
                    <Card>
                        <Card.Title>{item.description}</Card.Title>
                        <Card.Image source={{ uri: item.imagePath }} />
                        <Text>Precio Final: ${ item.finalSellPrice }</Text>
                        <Text>Precio Socio: ${ item.associatedSellPrice }</Text>
                        <Button>Agregar al pedido</Button>
                    </Card>)
                }
                keyExtractor={(prod) => prod.id}
            />
        </>
    );
}

export default Products;