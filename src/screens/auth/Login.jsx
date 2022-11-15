import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native"

export default Login = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>Login</Text>
            <Button title="Register" onPress={() => navigation.navigate('Auth', { screen: 'Register' }) } />
            <Button title="Login" onPress={() => navigation.navigate('Auth', { screen: 'Welcome' }) } />
        </View>
    );
}