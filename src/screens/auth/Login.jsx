import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import * as yup from 'yup';
import CustomInput from "../../components/CustomInput";
import CustomToast from "../../components/CustomToast";
import { AuthAPI } from "../../api/AuthAPI";
import { Image, makeStyles, Text, Button } from "@rneui/themed";

const Login = () => {
    const navigation = useNavigation();
    const styles = useStyles();

    const handleLogin = async (credentials) => {
        try {
            const response = await AuthAPI.signIn(credentials);
            if(response){
                navigation.navigate('Main', { screen: 'Home', params: { screen: 'Barcitos '} });
            }
        } catch (e) {
            CustomToast(e);
        }
    }

    const loginValidationSchema = yup.object().shape({
        email: yup
          .string()
          .email('El email ingresado no es válido')
          .required('El email es requerido'),
        password: yup
          .string()
          .required('La contraseña es requerida'),
    })

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Text style={{ fontSize: 50, fontStyle: 'italic', padding: 10 }}>Barcito</Text>
                <Image source={require('../../../assets/barcito-big.png')} style={{ width: 400, height: 200 }}/>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.text}>Iniciar sesión</Text>
                <Formik
                    initialValues={{
                        email: 'uno@cliente.com',
                        password: '123456'
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={values => handleLogin(values)}
                >
                    {({ handleSubmit, isValid }) => (
                        <>
                            <Field
                                component={CustomInput}
                                name='email'
                                placeholder='Email'
                                keyboardType="email-address"
                            />
                            <Field
                                component={CustomInput}
                                name="password"
                                placeholder="Password"
                                secureTextEntry
                            />
                            <Button onPress={handleSubmit} title="Login" disabled={!isValid} />
                            <Pressable style={{ margin: 10 }} onPress={() => navigation.navigate('Auth', { screen: 'Register' })}>
                                <Text style={styles.link}>No tengo una cuenta</Text>
                            </Pressable>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        backgroundColor: theme.colors.background
    },
    imageContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        alignSelf: 'center',
        width: '80%',
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        backgroundColor: theme.colors.backgroundVariant,
        borderRadius: 10
    },
    text: {
        fontSize: 20
    },
    link: {
        color: theme.colors.primary,
        textDecorationLine: 'underline',
        fontSize: 15
    }
}));

export default Login;