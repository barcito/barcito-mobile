import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native"

const OrderConfirmation = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>OrderConfirmation</Text>
            <Button title="OrderConfirmation" onPress={() => navigation.navigate('Main', { screen: 'OrderHistory', params: { screen: 'OrderDetail' } }) } />
        </View>
    );
}

export default OrderConfirmation;