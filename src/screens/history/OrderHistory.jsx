import { View, Text, FlatList, Pressable } from "react-native"
import { ListItem } from "@rneui/themed";
import { useQuery, useQueryClient } from "react-query";
import { UserAPI } from "../../api/UserAPI";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

const OrderHistory = () => {
    const client = useQueryClient();
    const navigation = useNavigation();
    const [orderList, setOrderList] = useState();
    const { isLoading } = useQuery(['userOrders'], () => (UserAPI.getAllOrders()), { onSuccess: (data) => setOrderList(data)});

    useFocusEffect(
        useCallback(() => {
            return () => client.invalidateQueries(['userOrders']);
        }, [])
    );

    if(isLoading){
        return <View><Text>Is loading</Text></View>;
    }

    return (
        <>
            <FlatList
                data={orderList}
                renderItem={({item}) => 
                    <Pressable onPress={() => navigation.navigate('Main', { screen: 'OrderHistory', params: { screen: 'OrderDetail', params: { orderCode: item.code } } })}>
                        <ListItem style={{ marginBottom: 5 }}>
                            <ListItem.Content>
                                <ListItem.Title>{item.code}</ListItem.Title>
                                <ListItem.Subtitle>{new Date(item.createdAt).toLocaleString()}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>{item.status}</ListItem.Title>
                                <ListItem.Subtitle>${item.amount}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </Pressable>
                }
                keyExtractor={(cat) => cat.id}
            />
        </>
    );
}

export default OrderHistory;