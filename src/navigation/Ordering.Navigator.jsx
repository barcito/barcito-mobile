import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Categories from '../screens/ordering/Categories';
import Products from "../screens/ordering/Products";
import OrderConfirmation from "../screens/ordering/OrderConfirmation";
import Barcitos from "../screens/ordering/Barcitos";
import { OrderingContext } from "../context/OrderingState";
import { Button, Text } from "@rneui/themed";
import { useContext } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useHeaderStyles from "../components/style/useHeaderStyle";

const Stack = createNativeStackNavigator();

const OrderingNavigator = () => {
    const navigation = useNavigation();
    const { orderedProducts } = useContext(OrderingContext);
    const styles = useHeaderStyles();
    
    return(
        <Stack.Navigator
        screenOptions={({route}) => ({
            headerRight: () => {
                return ( !(route.name === 'Barcitos') &&
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Button title={"Ver pedido (" + (orderedProducts.length.toString()) + ")"} onPress={ () => navigation.navigate('Home', { screen: 'OrderConfirmation' }) } />
                    </View>
                )
            },
            headerStyle: styles.header,
            headerTintColor: styles.headerTint,
            headerTitleStyle: styles.headerTitle
        })}>
            <Stack.Screen name="Barcitos" component={Barcitos} />
            <Stack.Screen name="Categories" component={Categories} options={{ gestureEnabled: false, title: 'Categorias' }} />
            <Stack.Screen name="Products" component={Products} options={{ title: 'Productos' }} />
            <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} options={{ title: 'Confirmar Pedido' }} />
        </Stack.Navigator>
    );
};

export default OrderingNavigator;