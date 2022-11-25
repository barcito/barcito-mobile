import { View, Text, FlatList, Pressable } from "react-native"
import { ListItem } from "@rneui/themed";
import { useQuery } from "react-query";
import { UserAPI } from "../../api/UserAPI";
import { useNavigation } from "@react-navigation/native";

const OrderHistory = () => {
    const navigation = useNavigation();
    const { data, isLoading } = useQuery(['userOrders'], async () => UserAPI.getAllOrders());

    if(isLoading){
        return <View><Text>Is loading</Text></View>;
    }

    return (
        <>
            <FlatList
                data={data}
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