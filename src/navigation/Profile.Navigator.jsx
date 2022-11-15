import { createNativeStackNavigator } from "@react-navigation/native-stack"
import User from '../screens/profile/User';
import Associate from '../screens/profile/Associate';

const Stack = createNativeStackNavigator();

export default ProfileNavigator = () => {
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Associate" component={Associate} />
        </Stack.Navigator>
    );
}