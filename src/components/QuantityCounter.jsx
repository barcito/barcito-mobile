import { View } from 'react-native';
import { Button, Icon, Text, makeStyles } from '@rneui/themed';

const QuantityCounter = ({ prodOnCart, handleOnRemove, handleOnRemoveAll, handleOnUpdate }) => {

    const styles = useStyles();

    return(
        <View style={styles.container}>
            <Button onPress={ () => prodOnCart.quantity > 1 ? handleOnRemove(prodOnCart.id) : handleOnRemoveAll(prodOnCart.id) }>
                <Icon name="minus-thick" type="material-community" />
            </Button>
            <Text style={styles.quantity}>{prodOnCart.quantity}</Text>
            <Button onPress={() => handleOnUpdate(prodOnCart.id)}>
                <Icon name="plus-thick" type="material-community" />
            </Button>
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    quantity: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 25,
        textAlignVertical: 'center'
    }
}))

export default QuantityCounter;