import { DeviceEventEmitter } from "react-native";

const eventBus = {
    on(event, callback) {
        DeviceEventEmitter.addListener(event, (data) => callback(data));
    },
    dispatch(event, data) {
        DeviceEventEmitter.emit(event, data);
    },
    remove(event){ 
        DeviceEventEmitter.removeAllListeners(event);
    }
}

export default eventBus;