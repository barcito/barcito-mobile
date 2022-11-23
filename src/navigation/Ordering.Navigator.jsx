import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Categories from '../screens/ordering/Categories';
import Products from "../screens/ordering/Products";
import OrderConfirmation from "../screens/ordering/OrderConfirmation";
import Barcitos from "../screens/ordering/Barcitos";
import { OrderingContext, OrderingContextProvider } from "../context/OrderingContext";
import { Button, Text } from "@rneui/themed";
import { useContext } from "react";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const OrderingNavigator = () => {

    const { orderedProducts } = useContext(OrderingContext);
    
    return(
        <Stack.Navigator
        screenOptions={{
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{ marginRight: 5 }}>Ver pedido</Text>
                    <Button title={orderedProducts.length.toString()} />
                </View>
            )
        }}>
            <Stack.Screen name="Barcitos" component={Barcitos} />
            <Stack.Screen name="Categories" component={Categories} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
        </Stack.Navigator>
    );
}

export default OrderingNavigator;