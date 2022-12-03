import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "@rneui/themed";

const ProductCard = ({ prodOnCart, product, handleOnAdd, handleOnRemove, handleOnRemoveAll, handleOnUpdate }) => {
    return(
        <Card containerStyle={styles.card}>
            <Card.Title style={styles.title}>{product.description}</Card.Title>
            <Card.Image style={styles.image} source={{ uri: product.imagePath }} />
            <Text style={styles.price}>Precio Final: ${product.finalSellPrice}</Text>
            <Text style={styles.price}>Precio Socio: ${product.associatedSellPrice}</Text>
            {prodOnCart ?
                (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button onPress={
                            () => prodOnCart.quantity > 1 ? handleOnRemove(product.id) : handleOnRemoveAll(product.id)
                        }>-</Button>
                        <Text>{prodOnCart.quantity}</Text>
                        <Button onPress={() => handleOnUpdate(product.id)}>+</Button>
                    </View>
                )
                :
                <Button onPress={() => handleOnAdd(product)}>Agregar al pedido</Button>
            }
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '45%'
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    image: {
        resizeMode: 'center'
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    }
})

export default ProductCard;