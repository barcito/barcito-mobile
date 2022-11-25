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

    getProductsByCategory: async function(barcitoId, categoryId){
        console.log(barcitoId);
        console.log(categoryId)
        const url = categoryId === 0 ? `products/${barcitoId}` : `categories/${barcitoId}/products/${categoryId}`;
        const response = await api.request({
            url: url,
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