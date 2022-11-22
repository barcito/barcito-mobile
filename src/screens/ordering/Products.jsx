import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Card, SearchBar, Text, Button } from "@rneui/themed";
import mockProducts from '../../utils/mock-products';
import { FlatList } from "react-native";
import { OrderingContext } from "../../context/OrderingContext";

const PRODS = mockProducts;

const Products = () => {
    const { orderedProducts, onAdd, onUpdate, onRemove, onRemoveAll, isPresent } = useContext(OrderingContext);
    const { params } = useRoute();
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const updateSearch = (searchValue) =>{
        setSearch(searchValue);
    }

    const handleOnAdd = (productId) => {
        const product = { id: productId, quantity: 1 };
        onAdd(product);
        console.log(orderedProducts);
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
                renderItem={({item}) => {
                    const prodOnCart = isPresent(item.id);
                    return(item.categories.id === params.categoryId &&
                    <Card>
                        <Card.Title>{item.description}</Card.Title>
                        <Card.Image source={{ uri: item.imagePath }} />
                        <Text>Precio Final: ${ item.finalSellPrice }</Text>
                        <Text>Precio Socio: ${ item.associatedSellPrice }</Text>
                        {prodOnCart ? 
                            (
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Button onPress={
                                        () => prodOnCart.quantity > 1 ? handleOnRemove(item.id) : handleOnRemoveAll(item.id)
                                    }>-</Button>
                                    <Text>{prodOnCart.quantity}</Text>
                                    <Button onPress={() => handleOnUpdate(item.id)}>+</Button>
                                </View>
                            )
                            :
                            <Button onPress={() => handleOnAdd(item.id)}>Agregar al pedido</Button>
                        }
                    </Card>)}
                }
                keyExtractor={(prod) => prod.id}
            />
        </>
    );
}

export default Products;