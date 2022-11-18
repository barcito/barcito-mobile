import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import OrderingNavigator from './Ordering.Navigator';
import ProfileNavigator from './Profile.Navigator';
import HistoryNavigator from './History.Navigator';

const Tabs = createBottomTabNavigator();

const MainNavigator = () =>{

    return(
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={OrderingNavigator} options={{ headerShown: false }} />
            <Tabs.Screen name="Profile" component={ProfileNavigator} />
            <Tabs.Screen name="Order History" component={HistoryNavigator} />
        </Tabs.Navigator>
    )
}

export default MainNavigator;