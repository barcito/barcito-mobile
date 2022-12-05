import { useRoute } from "@react-navigation/native";
import { ScrollView, View, ImageBackground } from "react-native"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserAPI } from "../../api/UserAPI";
import { Icon, Text, Button, ListItem, Image, makeStyles } from "@rneui/themed";
import BarcitoImageBackground from "../../components/BarcitoImageBackground";
import LoadingScreen from "../../components/LoadingScreen";

const OrderDetail = () => {
    const client = useQueryClient();
    const { params } = useRoute();
    const { data, isLoading } = useQuery(['order'], async () => UserAPI.getOrder(params.orderCode));
    const styles = useStyles();

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
        return <LoadingScreen />;
    }

    return (
        <>
            <BarcitoImageBackground barcito={data.barcito} />
            <View style={styles.container}>
                <View style={styles.dateStatusContainer}>
                    <Text style={styles.dateStatus}>{new Date(data.createdAt).toLocaleString()}</Text>
                    <Text style={styles.dateStatus}>Estado: {data.status}</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        {data.products.map( (item, i) => (
                            <ListItem key={i} containerStyle={styles.item}>
                                <Image source={{ uri: item.product.imagePath }} style={{ width: 100, height: 100 }} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.title}>{ item.product.description } X { item.quantity }</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Content right>
                                    <ListItem.Title style={styles.price}> ${ item.lockedPrice * item.quantity } </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </View>
                    <Text style={styles.total}>Total: ${data.amount}</Text>

                    { data.status === 'Pendiente' &&
                        <Button
                            titleStyle={styles.buttonTitle}
                            containerStyle={styles.actionButtons}
                            title="Cancelar Pedido"
                            onPress={ () => onCancelOrder.mutate(data.id) }
                        />
                    }

                </ScrollView>
            </View>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        backgroundColor: theme.colors.background,
    },
    dateStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    },
    dateStatus: {
        fontWeight: 'bold',
        fontSize: 22
    },
    item: {
        marginHorizontal: 20,
        marginTop: 15,
        backgroundColor: theme.colors.backgroundVariant,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        marginBottom: 10
    },
    price: {
        fontSize: 30
    },
    total: {
        marginVertical: 20,
        textAlign: "center",
        fontSize: 35
    },
    actionButtons: {
        width: '65%',
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 20
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
}))

export default OrderDetail;