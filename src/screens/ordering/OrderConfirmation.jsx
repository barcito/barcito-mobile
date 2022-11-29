import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Icon, Text, Button, ListItem, Image } from "@rneui/themed";
import { useContext, useState } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import { SseAPI } from "../../api/SseAPI";
import { OrderingContext, useOrdering, useOrderingDispatch } from "../../context/OrderingState";
import CustomToast from "../../components/CustomToast";

const OrderConfirmation = () => {
    const { barcito, orderedProducts } = useOrdering();
    const { onClean } = useOrderingDispatch();
    const navigation = useNavigation();

    let totalAmount = 0;

    const doOrder = async () => {
        const user = await AsyncStorage.getItem('user-id');
        const order = {
            user: { id: user },
            products: orderedProducts.map( (product) => ({ productId: product.id, quantity: product.quantity }))
        }
        try {
            const response = await BarcitoAPI.createOrder(barcito.id, order);
            if(response){
                await SseAPI.newOrder(barcito.id, {title: `Pedido #${response.code}`, message: 'Se ha generado un nuevo pedido', type: 'message' });
                onClean();
                navigation.navigate('Main', { screen: 'Home', params: { screen: 'Barcitos' } });
                navigation.navigate('Main', { screen: 'OrderHistory', params: { screen: 'OrderList', params: { orderCode: response.code } } });
            }
        } catch (e) {
            console.error(e);
            CustomToast(e.message);
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
                {orderedProducts.map( (product, i) => {
                    totalAmount += (product.finalSellPrice * product.quantity);
                    return (
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
                    )}
                )}
            </View>

            <View style={{ margin: 10 }}>
                <Text style={{ textAlign: "center", fontSize: 30}}>Total: ${totalAmount}</Text>
                <Button title="Realizar Pedido" onPress={ () => doOrder() } />
            </View>
            <View style={{ margin: 10 }}>
                <Button title="Cancelar" onPress={ () => { onClean(); navigation.navigate('Home', { screen: 'Barcitos' }) } } />
            </View>

        </ScrollView>
    );
}

export default OrderConfirmation;