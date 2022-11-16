import { api } from "./config/axiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthAPI = {
    signUp: async function(userData){
        const response = await api.request({
            url: `/auth/signup`,
            method: 'POST',
            data: userData
        });
        if(response.status === 201){
            await AsyncStorage.setItem('email', response.data.email);
            await AsyncStorage.setItem("academic-unit", `${response.data.academicUnit}`);
        }
        return response.data;
    },

    signIn: async function(credentials){
        const response = await api.request({
            url: `/auth/signin`,
            method: 'POST',
            data: credentials
        });

        if(response.status === 201){
            await AsyncStorage.setItem("email", response.data.email);
            await AsyncStorage.setItem("academic-unit", `${response.data.academicUnit}`);
        }

        return response.data;
    },

    signOut: async function () {
        await AsyncStorage.clear()
        const response = await api.request({
          url: "/auth/logout",
          method: "GET"
        });
    },

    refresh: async function () {
        await api.request({
            url: "/auth/refresh",
            method: "GET"
        })
    }
}