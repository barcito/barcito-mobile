import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import OrderingNavigator from './Ordering.Navigator';
import ProfileNavigator from './Profile.Navigator';
import HistoryNavigator from './History.Navigator';
import { OrderingProvider } from "../context/OrderingState";

const Tabs = createBottomTabNavigator();

const MainNavigator = () =>{

    return(
        <OrderingProvider>
            <Tabs.Navigator>
                <Tabs.Screen name="Home" component={OrderingNavigator} options={{ headerShown: false }} />
                <Tabs.Screen name="Profile" component={ProfileNavigator} />
                <Tabs.Screen name="OrderHistory" component={HistoryNavigator} />
            </Tabs.Navigator>
        </OrderingProvider>
    )
}

export default MainNavigator;