import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native"

const Categories = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>Categories</Text>
            <Button title="Products" onPress={() => navigation.navigate('Home', { screen: 'Products' }) } />
        </View>
    );
}

export default Categories;