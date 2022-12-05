import Toast from "react-native-root-toast";

const CustomToast = (message) => {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        textColor: 'white'
    });
}

export default CustomToast;