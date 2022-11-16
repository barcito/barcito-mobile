import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

const Barcitos = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>Barcitos</Text>
            <Button title="Categories" onPress={() => navigation.navigate('Home', { screen: 'Categories' }) } />
        </View>
    );
}

export default Barcitos;