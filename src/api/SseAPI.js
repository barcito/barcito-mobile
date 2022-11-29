import { api } from "./config/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventSource from "react-native-sse";

export const SseAPI = {
    newOrder: async function(barcitoId, message){
        const response = await api.request({
            url: `sse/newOrder/${barcitoId}`,
            method: "POST",
            data: message
        });
        return response;
    },

    subscribe: function (userId) {
        const subscription = new EventSource(`http://192.168.0.6:3000/api/sse/orderStatus/${userId}`);

        subscription.addEventListener("open", (event) => {
            console.log("SSE connection opened");
        })

        subscription.addEventListener("message", async (event) => {
            const data = JSON.parse(event.data)
            if(data.type === "close"){
                subscription.close();
            }
            const token = await AsyncStorage.getItem('push-token');
            const message = {
                to: token,
                sound: 'default',
                title: data.title,
                body: data.message
            }

            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        })

        subscription.addEventListener("error", (event) => {
            if (event.type === "error") {
                console.error("Connection error:", event.message);
            } else if (event.type === "exception") {
                console.error("Error:", event.message, event.error);
            }
        });

        subscription.addEventListener("close", (event) => {
            console.log("Close SSE connection.");
        });
    }
}