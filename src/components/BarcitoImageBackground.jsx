import { useState } from 'react';
import { View, ImageBackground } from "react-native";
import { Text, Icon, makeStyles } from "@rneui/themed";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";

const BarcitoImageBackground = ({ barcito }) => {

    const [showMap, setShowMap] = useState(false);
    const styles = useStyles();

    return(
        <ImageBackground
            source={{ uri: barcito.imagePath }}
            imageStyle={styles.image}
            style={styles.imageBackground}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{barcito.name}</Text>
                <Text style={styles.subtitle}>Facultad de Informática</Text>
                <CustomButton
                    title='Ver en mapa'
                    onPress={() => setShowMap(true)}
                />
            </View>
            <CustomModal isVisible={showMap} setIsVisible={setShowMap} barcito={barcito} />
        </ImageBackground>
    );
};

const useStyles = makeStyles((theme) => ({
    image: {
        opacity: 0.3
    },
    imageBackground: {
        aspectRatio: 3,
        width: '100%'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color: theme.colors.white
    },
    subtitle: {
        fontSize: 15,
        color: theme.colors.white
    }
}));

export default BarcitoImageBackground;