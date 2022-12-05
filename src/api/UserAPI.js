import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./config/axiosConfig";

export const UserAPI = {
    get: async function(){
        const userId = await AsyncStorage.getItem('user-id');
        const response = await api.request({
            url: `users/${userId}`,
            method: 'GET'
        });

        return response.data;
    },

    update: async function(userData){
        const userId = await AsyncStorage.getItem('user-id');
        const response = await api.request({
            url: `users/${userId}`,
            method: 'PATCH',
            data: userData
        });

        return response.data;
    },

    uploadDocument: async function(userDoc){
        const response = await api.request({
            url: "applications",
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            data: userDoc
          });
      
          if(response.status === 201){
            return response.data;
          }
      
          return false;
    },

    getAllOrders: async function(){
        const userId = await AsyncStorage.getItem('user-id');
        const response = await api.request({
            url: `users/orders/${userId}`,
            method: 'GET',
        });

        return response.data;
    },

    getOrder: async function(orderCode){
        const response = await api.request({
            url: `orders/0/code/${orderCode}`,
            method: 'GET',
        });

        return response.data;
    },

    cancelOrder: async function(orderId){
        const response = await api.request({
            url: `orders/0/${orderId}`,
            method: 'PATCH',
            data: { status: 'Cancelado' }
        });

        return response.data;
    }
}