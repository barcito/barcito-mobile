import { View, ImageBackground } from "react-native";
import { Text, Icon } from "@rneui/themed";

const BarcitoImageBackground = ({ barcito }) => {
    return(
        <ImageBackground
            source={{ uri: barcito.imagePath }}
            imageStyle={{ opacity: 0.5 }}
            style={{ aspectRatio: 3, width: '100%' }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>{barcito.name}</Text>
                <Text style={{ fontSize: 15 }}><Icon name="location-pin" />Facultad de Informática</Text>
            </View>
        </ImageBackground>
    );
}

export default BarcitoImageBackground;