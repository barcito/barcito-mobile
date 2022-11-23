import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./config/axiosConfig";

export const UserAPI = {
    get: async function(){
        const userId = await AsyncStorage.getItem('user-id');
        const response = await api.request({
            url: `/users/${userId}`,
            method: 'GET'
        });

        return response.data;
    },

    update: async function(userData){
        const userId = await AsyncStorage.getItem('user-id');
        const response = await api.request({
            url: `/users/${userId}`,
            method: 'PATCH',
            data: userData
        });

        return response.data;
    }
}