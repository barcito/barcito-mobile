import { Button, makeStyles } from "@rneui/themed"

const CustomButton = (props, {style, titleStyle, buttonStyle, containerStyle}) => {

    const styles = useStyles();

    return (
        <Button
            style={style}
            titleStyle={[styles.text, titleStyle]}
            buttonStyle={[styles.background, buttonStyle]}
            containerStyle={[containerStyle]}
            {...props}
        />
    )
}

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.colors.onSecondary
    },
    background: {
        backgroundColor: theme.colors.secondary
    }
}));

export default CustomButton;