import { useCallback, useState } from "react";
import { View, Text, Button } from "react-native";
import DocumentPicker from 'react-native-document-picker';

const Associate = () => {

    const [result, setResult] = useState();

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'documentDirectory'
            });
            setResult(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <View>
            <Text>Associate</Text>
            <Button
                title="Seleccionar archivo"
                onPress={handleDocumentSelection}
            />
        </View>
    );
}

export default Associate;