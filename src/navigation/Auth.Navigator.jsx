import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from '../screens/auth/Login';
import Register from "../screens/auth/Register";
import Welcome from "../screens/auth/Welcome";

const Stack = createNativeStackNavigator();

export default AuthNavigator = () => {
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
    );
}