import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './src/navigation/Auth.Navigator';
import MainNavigator from './src/navigation/Main.Navigator';
import 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider ,createTheme } from '@rneui/themed';
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
    primary: '#6200EE',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    secondaryVariant: '#018786',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackgroud: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF'
  },
  darkColors: {
    primary: '#BB86FC',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    secondaryVariant: '#03DAC6',
    background: '#121212',
    surface: '#FFFFFF',
    error: '#CF6679',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackgroud: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#000000'
  },
  mode: 'light'
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
            <StatusBar style="light" />
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