import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Icon, Text, Button, ListItem, Image } from "@rneui/themed";
import { useContext, useState } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import { OrderingContext } from "../../context/OrderingContext";

const OrderConfirmation = () => {
    const { barcito, orderedProducts, onClean } = useContext(OrderingContext);
    const navigation = useNavigation();

    const doOrder = async () => {
        const user = await AsyncStorage.getItem('user-id');
        const order = {
            user: { id: user },
            products: orderedProducts.map( (product) => ({ productId: product.id, quantity: product.quantity }))
        }
        try {
            const response = await BarcitoAPI.createOrder(barcito.id, order);
            if(response){
                onClean();
                navigation.reset({ index: 0, routes: [ {name: 'Home' } ] }); // si pero no
                navigation.navigate('Main', { screen: 'OrderHistory', params: { screen: 'OrderDetail', params: { orderCode: response.code } } });
            }
        } catch (e) {
            CustomToast(e);
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <ImageBackground
                source={{ uri: barcito.imagePath }}
                imageStyle={{ opacity: 0.5 }}
                style={{ aspectRatio: 3, width: '100%' }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30 }}>{barcito.name}</Text>
                    <Text style={{ fontSize: 15 }}><Icon name="location-pin" />Facultad de Informática</Text>
                </View>
            </ImageBackground>
            
            <View style={{ margin: 20 }}>
                {orderedProducts.map( (product, i) => (
                    <ListItem key={i} bottomDivider>
                        <Image source={{ uri: product.imagePath }} style={{ width: 100, height: 100 }} />
                        <ListItem.Content>
                            <ListItem.Title>{ product.description }</ListItem.Title>
                            <ListItem.Subtitle>${ product.finalSellPrice } X{ product.quantity }</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content right>
                            <ListItem.Title> ${ product.finalSellPrice * product.quantity } </ListItem.Title>
                        </ListItem.Content>
                        <Icon name="close" />
                    </ListItem>
                ))}
            </View>

            <View style={{ margin: 10 }}>
                <Button title="Realizar Pedido" onPress={ () => doOrder() } />
            </View>
            <View style={{ margin: 10 }}>
                <Button title="Cancelar" onPress={ () => { onClean(); navigation.navigate('Home', { screen: 'Barcitos' }) } } />
            </View>

        </ScrollView>
    );
}

export default OrderConfirmation;