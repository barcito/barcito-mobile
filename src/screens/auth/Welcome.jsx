import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, Button } from "react-native"

const Welcome = () => {

    const [email, setEmail] = useState('none');

    const navigation = useNavigation();
    
    const handlePress = async () => {
        const res = await AsyncStorage.getItem('email');
        setEmail(res);
    }

    return (
        <View>
            <Text>Welcome</Text>
            <Text>{email}</Text>
            <Button title="get email" onPress={() => handlePress() } />
            <Button title="Explore" onPress={() => navigation.navigate('Main', { screen: 'Home', params: { screen: 'Barcitos' } }) } />
        </View>
    );
}

export default Welcome;