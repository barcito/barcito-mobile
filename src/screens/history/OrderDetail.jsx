import { useRoute } from "@react-navigation/native";
import { ScrollView, View, ImageBackground } from "react-native"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserAPI } from "../../api/UserAPI";
import { Icon, Text, Button, ListItem, Image } from "@rneui/themed";

const OrderDetail = () => {
    const client = useQueryClient();
    const { params } = useRoute();
    const { data, isLoading } = useQuery(['order'], async () => UserAPI.getOrder(params.orderCode));

    const onCancelOrder = useMutation(
        (orderId) => {
            return UserAPI.cancelOrder(orderId);
        },
        {
            onSuccess: () => {
                client.invalidateQueries(['order']);
            }
        }
    );

    if(isLoading){
        return <View><Text>Is loading</Text></View>;
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <ImageBackground
                source={{ uri: data.barcito.imagePath }}
                imageStyle={{ opacity: 0.5 }}
                style={{ aspectRatio: 3, width: '100%' }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30 }}>{data.barcito.name}</Text>
                    <Text style={{ fontSize: 15 }}><Icon name="location-pin" />Facultad de Informática</Text>
                </View>
            </ImageBackground>
            
            <View style={{ margin: 20 }}>
                {data.products.map( (item, i) => (
                    <ListItem key={i} bottomDivider>
                        <Image source={{ uri: item.product.imagePath }} style={{ width: 100, height: 100 }} />
                        <ListItem.Content>
                            <ListItem.Title>{ item.product.description }</ListItem.Title>
                            <ListItem.Subtitle>${ item.lockedPrice } X{ item.quantity }</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content right>
                            <ListItem.Title> ${ item.lockedPrice * item.quantity } </ListItem.Title>
                        </ListItem.Content>
                        <Icon name="close" />
                    </ListItem>
                ))}
            </View>

            <View style={{ margin: 10 }}>
                <Text style={{ textAlign: "center", fontSize: 30}}>Total: {data.amount}</Text>
                <Text style={{ textAlign: "center", fontSize: 30}}>Estado: {data.status}</Text>
            </View>
            { data.status === 'Pendiente' && <View style={{ margin: 10 }}>
                <Button title="Cancelar" onPress={ () => { onCancelOrder.mutate(data.id) } } />
            </View>}

        </ScrollView>
    );
}

export default OrderDetail;