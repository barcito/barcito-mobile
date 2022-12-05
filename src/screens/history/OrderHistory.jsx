import { View, Text, FlatList, Pressable } from "react-native"
import { ListItem, makeStyles } from "@rneui/themed";
import { useQuery, useQueryClient } from "react-query";
import { UserAPI } from "../../api/UserAPI";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";

const OrderHistory = () => {
    const client = useQueryClient();
    const navigation = useNavigation();
    const [orderList, setOrderList] = useState();
    const { isLoading } = useQuery(['userOrders'], () => (UserAPI.getAllOrders()), { onSuccess: (data) => setOrderList(data)});
    const styles = useStyles();
    
    useFocusEffect(
        useCallback(() => {
            return () => client.invalidateQueries(['userOrders']);
        }, [])
    );

    if(isLoading){
        return <LoadingScreen />;
    }

    return (
        <FlatList
            style={styles.container}
            data={orderList}
            renderItem={({item}) => 
                <Pressable onPress={() => navigation.navigate('Main', { screen: 'OrderHistory', params: { screen: 'OrderDetail', params: { orderCode: item.code } } })}>
                    <ListItem bottomDivider containerStyle={styles.item}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.text}>#{item.code}</ListItem.Title>
                            <ListItem.Subtitle style={styles.text}>{new Date(item.createdAt).toLocaleString('es-ar')}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content>
                            <ListItem.Title style={styles.text}>{item.status}</ListItem.Title>
                            <ListItem.Subtitle style={styles.text}>${item.amount}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Pressable>
            }
            keyExtractor={(cat) => cat.id}
        />
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.colors.background
    },
    item: {
        backgroundColor: theme.colors.backgroundVariant
    },
    text: {
        color: theme.colors.onBackground,
        fontWeight: 'bold',
        fontSize: 17
    }
}))

export default OrderHistory;