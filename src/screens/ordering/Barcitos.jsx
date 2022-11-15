import { View, Text, Button } from "react-native";

export default Barcitos = () => {

    return (
        <View>
            <Text>Barcitos</Text>
            <Button title="Categories" onPress={() => navigation.navigate('Home', { screen: 'Categories' }) } />
        </View>
    );
}