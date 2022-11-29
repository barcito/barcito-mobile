import { Button } from "@rneui/base";
import { Modal, View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const CustomModal = ({ isVisible, setIsVisible, barcito }) => {

    return(
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            {barcito && <View style={styles.modalContent}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>{barcito.name}</Text>
                    <Button title={'Cerrar'} onPress={() => setIsVisible(false)} />
                </View>
                <View style={{ flex: 1 }}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: +barcito.location.split(',')[0],
                            longitude: +barcito.location.split(',')[1],
                            latitudeDelta: 0.0068,
                            longitudeDelta: 0.0047,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: +barcito.location.split(',')[0],
                                longitude: +barcito.location.split(',')[1]
                            }}
                            title="Barcito FAI"
                            description="Barcito facultad de informática"
                        />
                    </MapView>
                </View>
            </View>}
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: '80%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    title: {
        height: '7%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    textTitle: {
        color: 'white',
        fontSize: 20
    },
    map: {
        width: '100%',
        height: '100%'
    }
})

export default CustomModal;