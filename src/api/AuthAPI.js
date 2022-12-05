import { api } from "./config/axiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SseAPI } from "./SseAPI";

export const AuthAPI = {
    signUp: async function(userData){
        const response = await api.request({
            url: `auth/signup`,
            method: 'POST',
            data: userData
        });
        if(response.status === 201){
            await AsyncStorage.setItem('user-id', `${response.data.id}`);
            await AsyncStorage.setItem('email', response.data.email);
            await AsyncStorage.setItem("academic-unit", `${response.data.academicUnit}`);
            SseAPI.subscribe(response.data.id);
        }
        return response.data;
    },

    signIn: async function(credentials){
        const response = await api.request({
            url: `auth/signin`,
            method: 'POST',
            data: credentials
        });

        if(response.status === 201){
            await AsyncStorage.setItem('user-id', `${response.data.id}`);
            await AsyncStorage.setItem("email", response.data.email);
            await AsyncStorage.setItem("academic-unit", `${response.data.academicUnit}`);
            SseAPI.subscribe(response.data.id);
            if(response.data.application){
                if(response.data.application.status === 'Aceptado'){
                    await AsyncStorage.setItem("associated", "valid");
                }else{
                    await AsyncStorage.setItem("associated", "invalid");
                }
            }
        }

        return response.data;
    },

    signOut: async function () {
        const userId = await AsyncStorage.getItem('user-id');
        await AsyncStorage.clear()
        await SseAPI.unsubscribe(userId);
        await api.request({
          url: "auth/logout",
          method: "GET"
        });
    },

    refresh: async function () {
        await api.request({
            url: "auth/refresh",
            method: "GET"
        })
    }
}