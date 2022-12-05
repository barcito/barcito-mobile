import { View } from "react-native";
import { Card, Text, Button, makeStyles, Icon } from "@rneui/themed";
import QuantityCounter from "./QuantityCounter";

const ProductCard = ({ prodOnCart, product, handleOnAdd, handleOnRemove, handleOnRemoveAll, handleOnUpdate }) => {

    const styles = useStyles();

    return(
        <Card containerStyle={styles.card}>
            <Card.Title style={styles.title}>{product.description}</Card.Title>
            <Card.Image style={styles.image} source={{ uri: product.imagePath }} />
            <Text style={styles.price}>Precio Regular: ${product.finalSellPrice}</Text>
            <Text style={styles.price}>Precio Socio: ${product.associatedSellPrice}</Text>
            {prodOnCart ?
                <QuantityCounter
                    prodOnCart={prodOnCart}
                    handleOnRemove={handleOnRemove}
                    handleOnRemoveAll={handleOnRemoveAll}
                    handleOnUpdate={handleOnUpdate}
                />
                :
                <Button containerStyle={{ marginTop: 10 }} onPress={() => handleOnAdd(product)}>Agregar al pedido</Button>
            }
        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    card: {
        width: '45%',
        backgroundColor: theme.colors.backgroundVariant,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.onBackground
    },
    image: {
        resizeMode: 'contain',
        marginBottom: 10
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    }
}));

export default ProductCard;