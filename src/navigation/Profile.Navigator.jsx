import { createNativeStackNavigator } from "@react-navigation/native-stack"
import User from '../screens/profile/User';
import Associate from '../screens/profile/Associate';
import useHeaderStyles from "../components/style/useHeaderStyle";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {

    const styles = useHeaderStyles();
    
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: styles.header,
            headerTintColor: styles.headerTint,
            headerTitleStyle: styles.headerTitle
        }}>
            <Stack.Screen name="User" component={User} options={{ title: 'Perfil de usuario' }} />
            <Stack.Screen name="Associate" component={Associate} options={{ title: 'Asociarse' }} />
        </Stack.Navigator>
    );
}

export default ProfileNavigator;