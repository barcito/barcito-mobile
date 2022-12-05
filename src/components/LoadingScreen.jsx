import { makeStyles } from "@rneui/themed";
import { ActivityIndicator, View } from "react-native";

const LoadingScreen = () => {

    const styles = useStyles();

    return(
        <View style={styles.container}>
            <ActivityIndicator size={100} color={styles.indicatorColor} />
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
    indicatorColor: theme.colors.primary
}));

export default LoadingScreen;