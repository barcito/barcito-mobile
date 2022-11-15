import { View, Text } from "react-native-ui-lib"

export default OrderConfirmation = () => {

    return (
        <View>
            <Text>OrderConfirmation</Text>
            <Button title="OrderConfirmation" onPress={() => navigation.navigate('Main', { screen: 'OrderHistory', params: { screen: 'OrderDetail' } }) } />
        </View>
    );
}