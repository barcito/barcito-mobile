import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Icon, Text, Button, ListItem, Image, makeStyles } from "@rneui/themed";
import { View, ScrollView } from "react-native";
import { BarcitoAPI } from "../../api/BarcitoAPI";
import { SseAPI } from "../../api/SseAPI";
import { useOrdering, useOrderingDispatch } from "../../context/OrderingState";
import CustomToast from "../../components/CustomToast";
import BarcitoImageBackground from "../../components/BarcitoImageBackground";
import QuantityCounter from "../../components/QuantityCounter";

const OrderConfirmation = () => {
    const { barcito, orderedProducts } = useOrdering();
    const { onAdd, onUpdate, onRemove, onRemoveAll, isPresent, onClean } = useOrderingDispatch();
    const [associated, setAssociated] = useState(false);
    const navigation = useNavigation();
    const styles = useStyles();

    let totalAmount = 0;

    useEffect(() => {
        const getStatus = async () => {
            const status = await AsyncStorage.getItem('associated');
            const userAU = await AsyncStorage.getItem('academic-unit');
            if(status === 'valid' && userAU == barcito.academicUnit.id ){
                setAssociated(true);
            }
        }
        getStatus();
    }, []);

    const doOrder = async () => {
        const user = await AsyncStorage.getItem('user-id');
        const order = {
            user: { id: user },
            products: orderedProducts.map( (product) => ({ productId: product.id, quantity: product.quantity }))
        }
        try {
            const response = await BarcitoAPI.createOrder(barcito.id, order);
            if(response){
                await SseAPI.newOrder(barcito.id, {title: `Pedido #${response.code}`, message: 'Se ha generado un nuevo pedido', type: 'message' });
                onClean();
                navigation.navigate('Main', { screen: 'Home', params: { screen: 'Barcitos' } });
                navigation.navigate('Main', { screen: 'OrderHistory', params: { screen: 'OrderDetail', params: { orderCode: response.code } } });
            }
        } catch (e) {
            console.error(e);
            CustomToast(e.message);
        }
    }

    return (
        <>
            <BarcitoImageBackground barcito={barcito} />
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    {associated && <Text style={styles.associatedText}>Se aplican descuentos de socio</Text>}
                        <View>
                            {orderedProducts.map( (product, i) => {
                                const prodOnCart = isPresent(product.id);
                                totalAmount += associated
                                    ? (product.associatedSellPrice * product.quantity)
                                    : (product.finalSellPrice * product.quantity);
                                return (
                                    <ListItem key={i} containerStyle={styles.item}>
                                        <Image source={{ uri: product.imagePath }} style={{ width: 100, height: 100 }} />
                                        <ListItem.Content>
                                            <ListItem.Title style={styles.title}>{product.description}</ListItem.Title>
                                            <ListItem.Subtitle>
                                                <QuantityCounter
                                                    prodOnCart={prodOnCart}
                                                    handleOnAdd={onAdd}
                                                    handleOnRemove={onRemove}
                                                    handleOnRemoveAll={onRemoveAll}
                                                    handleOnUpdate={onUpdate}
                                                />
                                            </ListItem.Subtitle>
                                        </ListItem.Content>
                                        <ListItem.Content right>
                                            <ListItem.Title style={styles.price}>
                                                ${ associated
                                                    ? (product.associatedSellPrice * product.quantity)
                                                    : (product.finalSellPrice * product.quantity) }
                                            </ListItem.Title>
                                        </ListItem.Content>
                                        <Icon name="close" onPress={() => onRemoveAll(product.id)} />
                                    </ListItem>
                                )}
                            )}
                        </View>
                        <Text style={styles.total}>Total: ${totalAmount}</Text>
                        <Button
                            titleStyle={styles.buttonTitle}
                            containerStyle={styles.actionButtons}
                            disabled={!(orderedProducts.length > 0)}
                            title="Realizar Pedido"
                            onPress={ () => doOrder() }
                        />
                        <Button
                            titleStyle={styles.buttonTitle}
                            containerStyle={styles.actionButtons}
                            title="Cancelar"
                            onPress={ () => { onClean(); navigation.navigate('Home', { screen: 'Barcitos' }) } }
                        />
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
    associatedText: {
        textAlign: 'center',
        fontSize: 25,
        color: theme.colors.secondary,
        marginVertical: 5
    },
    item: {
        marginHorizontal: 20,
        marginTop: 15,
        backgroundColor: theme.colors.backgroundVariant,
        borderRadius: 10
    },
    title: {
        fontSize: 22,
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

export default OrderConfirmation;