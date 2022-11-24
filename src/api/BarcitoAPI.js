import { api } from "./config/axiosConfig";

export const BarcitoAPI = {
    getAllBarcitos: async function () {
        const response = await api.request({
          url: "barcitos/",
          method: "GET"
        });
    
        return response.data;
    },

    getBarcito: async function (id) {
        const response = await api.request({
        url: `barcitos/${id}`,
        method: "GET"
        });

        return response.data;
    },

    getCategories: async function(barcitoId) {
        const response = await api.request({
            url: `categories/${barcitoId}/products`,
            method: 'GET',
        });

        return response.data;
    },

    getProducts: async function(barcitoId) {
        const response = await api.request({
            url: `products/${barcitoId}`,
            method: 'GET'
        });

        return response.data;
    },

    createOrder: async function(barcitoId, order) {
        const response = await api.request({
            url: `orders/${barcitoId}`,
            method: "POST",
            data: order
        });

        return response.data;
    }
}