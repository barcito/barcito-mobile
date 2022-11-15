import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native"

export default Register = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>Register</Text>
            <Button title="Login" onPress={() => navigation.navigate('Auth', { screen: 'Login' }) } />
            <Button title="Register" onPress={() => navigation.navigate('Auth', { screen: 'Welcome' }) } />
        </View>
    );
}