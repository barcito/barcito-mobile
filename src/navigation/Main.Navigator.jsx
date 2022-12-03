import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import OrderingNavigator from './Ordering.Navigator';
import ProfileNavigator from './Profile.Navigator';
import HistoryNavigator from './History.Navigator';
import { OrderingProvider } from "../context/OrderingState";
import { Icon, makeStyles } from "@rneui/themed";

const Tabs = createBottomTabNavigator();

const MainNavigator = () =>{

    const styles = useStyles();

    return(
        <OrderingProvider>
            <Tabs.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if(route.name === 'Home') {
                        iconName = focused
                            ? 'storefront'
                            : 'storefront-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused
                            ? 'account-circle'
                            : 'account-circle-outline';
                    } else if (route.name === 'OrderHistory') {
                        iconName = 'receipt'
                    }

                    return <Icon name={iconName} type="material-community" color={color} size={size} />
                },
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: styles.tabBarTint
            })}>
                <Tabs.Screen name="Profile" component={ProfileNavigator} options={{ title: 'Perfil' }} />
                <Tabs.Screen name="Home" component={OrderingNavigator} />
                <Tabs.Screen name="OrderHistory" component={HistoryNavigator} options={{ title: 'Pedidos' }} />
            </Tabs.Navigator>
        </OrderingProvider>
    )
};

const useStyles = makeStyles((theme) => ({
    tabBar: {
        backgroundColor: theme.colors.primary
    },
    tabBarTint: theme.colors.white
}));

export default MainNavigator;