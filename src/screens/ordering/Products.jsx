import { View, Text, Button } from "react-native"

export default Products = () => {

    return (
        <View>
            <Text>Products</Text>
            <Button title="OrderConfirmation" onPress={() => navigation.navigate('Home', { screen: 'OrderConfirmation' }) } />
        </View>
    );
}