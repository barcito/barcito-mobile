import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OrderHistory from '../screens/history/OrderHistory';
import OrderDetail from '../screens/history/OrderDetail';

const Stack = createNativeStackNavigator();

const HistoryNavigator = () => {
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="OrderList" component={OrderHistory} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
        </Stack.Navigator>
    );
}

export default HistoryNavigator;