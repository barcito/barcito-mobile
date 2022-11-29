import { useCallback, useState } from "react";
import { View, Text, Button } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { UserAPI } from "../../api/UserAPI";
import CustomToast from "../../components/CustomToast";

const Associate = () => {

    const [selectedDoc, setSelectedDoc] = useState({ type: 'none' });
    
    const pickDoc = async () => {
        const response = await DocumentPicker.getDocumentAsync();
        if(response.type === 'cancel'){
            alert('No document selected');
        }else{
            setSelectedDoc(response);
        }
    }

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("application_doc", {
                name: selectedDoc.name,
                type: selectedDoc.mimeType,
                uri: selectedDoc.uri
            });
            const response = await UserAPI.uploadDocument(formData);
            if(response){
                CustomToast('Guardado exitoso!');
                setSelectedDoc({ type: 'none' });
            }
        } catch (e) {
            CustomToast(e);
        }
    }

    return (
        <View>
            <Text>Associate</Text>
            <Button
                title="Seleccionar archivo"
                onPress={pickDoc}
            />
            <Button title="guardar" disabled={selectedDoc.type === 'none' || selectedDoc.type === 'cancel' } onPress={ () => handleSave() } />
        </View>
    );
}

export default Associate;