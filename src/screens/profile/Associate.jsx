import { useCallback, useState } from "react";
import { View, Text, Button } from "react-native";
import * as DocumentPicker from 'expo-document-picker';

const Associate = () => {

    const [selectedImage, setSelectedImage] = useState();

    
    const pickImage = async () => {
        const response = await DocumentPicker.getDocumentAsync();
        if(!response.type === 'cancel'){
            alert('No document selected');
        }else{
            setSelectedImage(response.uri);
        }
    }

    return (
        <View>
            <Text>Associate</Text>
            <Button
                title="Seleccionar archivo"
                onPress={pickImage}
            />
        </View>
    );
}

export default Associate;