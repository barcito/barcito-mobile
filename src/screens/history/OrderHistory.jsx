import { View, Text, FlatList, Pressable } from "react-native"
import { ListItem } from "@rneui/themed";
import { useQuery } from "react-query";
import { UserAPI } from "../../api/UserAPI";

const OrderHistory = () => {

    /* const { data, isLoading } = useQuery(['userOrders'], async () => UserAPI.getAllOrders());

    if(isLoading){
        return <View><Text>Is loading</Text></View>;
    } */

    const data = [
        { id: 1, code: '65216165', status: 'Pendiente', amount: '192.50' }
    ]

    return (
        <>
            <FlatList
                data={data}
                renderItem={({item}) => 
                    <Pressable>
                        <ListItem style={{ marginBottom: 5 }}>
                            <ListItem.Content>
                                <ListItem.Title>{item.code}</ListItem.Title>
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