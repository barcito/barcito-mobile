import { View, Text, Button } from "react-native"

export default Categories = () => {

    return (
        <View>
            <Text>Categories</Text>
            <Button title="Products" onPress={() => navigation.navigate('Home', { screen: 'Products' }) } />
        </View>
    );
}