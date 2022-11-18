import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './src/navigation/Auth.Navigator';
import MainNavigator from './src/navigation/Main.Navigator';
import 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme } from '@rneui/themed';

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