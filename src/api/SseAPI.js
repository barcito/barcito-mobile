import EventSource from "react-native-sse";

export function subscribe(userId) {
    console.log('subscribing');
    const subscription = new EventSource(`http://192.168.0.6:3000/api/sse/orderStatus/${userId}`);

    subscription.addEventListener("open", (event) => {
        console.log("SSE connection opened");
    })

    subscription.addEventListener("message", (event) => {
        console.log("Message: " + event.data);
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