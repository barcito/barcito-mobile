import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import OrderingNavigator from './Ordering.Navigator';
import ProfileNavigator from './Profile.Navigator';
import HistoryNavigator from './History.Navigator';

const Tabs = createBottomTabNavigator();

export default MainNavigator = () =>{

    return(
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={OrderingNavigator} />
            <Tabs.Screen name="Profile" component={ProfileNavigator} />
            <Tabs.Screen name="Order History" component={HistoryNavigator} />
        </Tabs.Navigator>
    )
}