import { useState } from "react";
import { View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { UserAPI } from "../../api/UserAPI";
import CustomToast from "../../components/CustomToast";
import { Button, Text, makeStyles } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const Associate = () => {
    const navigation = useNavigation();
    const styles = useStyles();
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
                CustomToast('Certificado Enviado!');
                setSelectedDoc({ type: 'none' });
                setTimeout(() => {
                    navigation.goBack();
                }, 3000)
            }
        } catch (e) {
            CustomToast(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Asociate al barcito de tu unidad academica para aprovechar de precios rebajados e importantes beneficios!</Text>
            <Text style={styles.text}>Solo debes esperar a que te validen subiendo tu certificado de alumno regular (en formato PDF):</Text>
            <Button
                containerStyle={styles.pickerButton}
                title="Seleccionar archivo"
                onPress={pickDoc}
            />
            <Button title="Enviar" disabled={selectedDoc.type === 'none' || selectedDoc.type === 'cancel' } onPress={ () => handleSave() } />
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        backgroundColor: theme.colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    pickerButton: {
        marginBottom: 15
    }
}));

export default Associate;