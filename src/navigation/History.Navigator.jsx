import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OrderHistory from '../screens/history/OrderHistory';
import OrderDetail from '../screens/history/OrderDetail';

const Stack = createNativeStackNavigator();

export default HistoryNavigator = () => {
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
        </Stack.Navigator>
    );
}