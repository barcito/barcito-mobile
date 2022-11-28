import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './src/navigation/Auth.Navigator';
import MainNavigator from './src/navigation/Main.Navigator';
import 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme } from '@rneui/themed';
import * as Notifications from 'expo-notifications';
import { useState, useRef, useEffect } from 'react';
import { registerForPushNotificationsAsync } from './src/utils/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
});

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8'
  },
  darkColors: {
    primary: '#000'
  },
  mode: 'ligth'
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RootSiblingParent>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator>
              <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </RootSiblingParent>
    </ThemeProvider>
  );
}