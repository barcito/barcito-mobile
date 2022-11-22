import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Categories from '../screens/ordering/Categories';
import Products from "../screens/ordering/Products";
import OrderConfirmation from "../screens/ordering/OrderConfirmation";
import Barcitos from "../screens/ordering/Barcitos";
import { OrderingContextProvider } from "../context/OrderingContext";

const Stack = createNativeStackNavigator();

const OrderingNavigator = () => {
    
    return(
        <OrderingContextProvider>
            <Stack.Navigator>
                <Stack.Screen name="Barcitos" component={Barcitos} />
                <Stack.Screen name="Categories" component={Categories} />
                <Stack.Screen name="Products" component={Products} />
                <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
            </Stack.Navigator>
        </OrderingContextProvider>
    );
}

export default OrderingNavigator;