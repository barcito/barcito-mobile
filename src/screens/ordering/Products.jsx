import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native"

const Products = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>Products</Text>
            <Button title="OrderConfirmation" onPress={() => navigation.navigate('Home', { screen: 'OrderConfirmation' }) } />
        </View>
    );
}

export default Products;