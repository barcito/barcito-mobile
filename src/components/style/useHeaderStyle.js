import { makeStyles } from "@rneui/themed";

const useHeaderStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.colors.backgroundVariant
    },
    headerTint: theme.colors.onBackground,
    headerTitle: {
        fontWeight: 'bold',
    }
}));

export default useHeaderStyles;