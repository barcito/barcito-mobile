import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native"

export default Welcome = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>Welcome</Text>
            <Button title="Explore" onPress={() => navigation.navigate('Main', { screen: 'Home', params: { screen: 'Barcitos' } }) } />
        </View>
    );
}