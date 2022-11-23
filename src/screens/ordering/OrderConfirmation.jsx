import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { View, Text, Button } from "react-native"
import { OrderingContext } from "../../context/OrderingContext";

const OrderConfirmation = () => {
    const { orderedProducts } = useContext(OrderingContext);
    const navigation = useNavigation();

    return (
        <View>
            <Text>OrderConfirmation</Text>
            <Button title="OrderConfirmation" onPress={() => navigation.navigate('Main', { screen: 'OrderHistory', params: { screen: 'OrderDetail' } }) } />
        </View>
    );
}

export default OrderConfirmation;