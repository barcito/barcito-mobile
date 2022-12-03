import { makeStyles } from "@rneui/themed";

const useHeaderStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.mode === 'light' ? theme.colors.primary : theme.colors.background
    },
    headerTint: theme.mode === 'light' ? theme.colors.onPrimary : theme.colors.onBackgroud,
    headerTitle: {
        fontWeight: 'bold',
    }
}));

export default useHeaderStyles;