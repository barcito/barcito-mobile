import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "../screens/auth/Welcome";
import Login from '../screens/auth/Login';
import Register from "../screens/auth/Register";
import useHeaderStyles from "../components/style/useHeaderStyle";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

    const [firstLaunch, setFirstLaunch] = useState(null);
    const styles = useHeaderStyles();

    useEffect(() => {
      async function setData() {
        /* await AsyncStorage.removeItem("appLaunched"); */
        const appData = await AsyncStorage.getItem("appLaunched");
        if (appData === null) {
          setFirstLaunch(true);
          await AsyncStorage.setItem("appLaunched", "false");
        } else {
          setFirstLaunch(false);
        }
      }
      setData();
    }, []);
    
    return(
        firstLaunch != null && (
            <Stack.Navigator screenOptions={{
              headerStyle: styles.header,
              headerTintColor: styles.headerTint,
              headerTitleStyle: styles.headerTitle
            }}>
                {firstLaunch && (
                    <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={{ headerShown: false }}
                    />
                )}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        )
    );
}

export default AuthNavigator;