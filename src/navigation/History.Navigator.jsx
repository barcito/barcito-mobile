import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OrderHistory from '../screens/history/OrderHistory';
import OrderDetail from '../screens/history/OrderDetail';
import useHeaderStyles from "../components/style/useHeaderStyle";

const Stack = createNativeStackNavigator();

const HistoryNavigator = () => {

    const styles = useHeaderStyles();
    
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: styles.header,
            headerTintColor: styles.headerTint,
            headerTitleStyle: styles.headerTitle
        }}>
            <Stack.Screen name="OrderList" component={OrderHistory} options={{ title: 'Historial de Pedidos' }} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} options={({route}) => ({
                title: `Pedido #${route.params.orderCode}`
            })} />
        </Stack.Navigator>
    );
}

export default HistoryNavigator;