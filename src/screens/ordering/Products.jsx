import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Card, SearchBar, Text, Button } from "@rneui/themed";
import mockProducts from '../../utils/mock-products';
import { FlatList, View } from "react-native";
import { OrderingContext } from "../../context/OrderingContext";
import { useQuery } from "react-query";
import { BarcitoAPI } from "../../api/BarcitoAPI";

const Products = () => {
    const { barcito, onAdd, onUpdate, onRemove, onRemoveAll, isPresent } = useContext(OrderingContext);
    const { params } = useRoute();
    const { data: prodList, isLoading } = useQuery(['products'], async () => BarcitoAPI.getProductsByCategory(barcito.id, params.categoryId) );
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const updateSearch = (searchValue) => {
        setSearch(searchValue);
    }

    const handleOnAdd = (product) => {
        onAdd({ ...product, quantity: 1 });
    }

    const handleOnUpdate = (productId) => {
        onUpdate(productId);
    }

    const handleOnRemove = (productId) => {
        onRemove(productId);
    }

    const handleOnRemoveAll = (productId) => {
        onRemoveAll(productId);
    }

    if(isLoading){
        return <View><Text>Is Loading</Text></View>;
    }

    const productList = search === '' ? prodList : prodList.filter((prod) => prod.description.toLowerCase().includes(search.toLowerCase()));

    console.log(productList);

    return (
        <>
            <SearchBar
                placeholder="Buscar producto"
                onChangeText={updateSearch}
                value={search}
                round={true}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text>{params.categoryId === 0 ? 'Esta viendo TODOS los productos' : `Está viendo los productos de la categoria ${params.categoryName}`}</Text>
                <Button onPress={() => navigation.navigate('Home', { screen: 'Categories' })}>Cambiar</Button>
            </View>
            <FlatList
                data={productList}
                renderItem={({ item }) => {
                    const prodOnCart = isPresent(item.id);
                    return(
                        <Card>
                            <Card.Title>{item.description}</Card.Title>
                            <Card.Image source={{ uri: item.imagePath }} />
                            <Text>Precio Final: ${item.finalSellPrice}</Text>
                            <Text>Precio Socio: ${item.associatedSellPrice}</Text>
                            {prodOnCart ?
                                (
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Button onPress={
                                            () => prodOnCart.quantity > 1 ? handleOnRemove(item.id) : handleOnRemoveAll(item.id)
                                        }>-</Button>
                                        <Text>{prodOnCart.quantity}</Text>
                                        <Button onPress={() => handleOnUpdate(item.id)}>+</Button>
                                    </View>
                                )
                                :
                                <Button onPress={() => handleOnAdd(item)}>Agregar al pedido</Button>
                            }
                        </Card>
                    );
                }}
                keyExtractor={(prod) => prod.id}
            />
        </>
    );
}

export default Products;