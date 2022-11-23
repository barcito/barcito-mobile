import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import OrderingNavigator from './Ordering.Navigator';
import ProfileNavigator from './Profile.Navigator';
import HistoryNavigator from './History.Navigator';
import { OrderingContextProvider } from "../context/OrderingContext";

const Tabs = createBottomTabNavigator();

const MainNavigator = () =>{

    return(
        <OrderingContextProvider>
            <Tabs.Navigator>
                <Tabs.Screen name="Home" component={OrderingNavigator} options={{ headerShown: false }} />
                <Tabs.Screen name="Profile" component={ProfileNavigator} />
                <Tabs.Screen name="OrderHistory" component={HistoryNavigator} />
            </Tabs.Navigator>
        </OrderingContextProvider>
    )
}

export default MainNavigator;