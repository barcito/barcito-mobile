import { View, Text, TextInput, Button, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import * as yup from 'yup';
import CustomInput from "../../components/atoms/CustomInput";
import { AuthAPI } from "../../api/AuthAPI";

const Login = () => {
    const navigation = useNavigation();

    const handleLogin = async (credentials) => {
        try {
            const response = await AuthAPI.signIn(credentials);
            if(response){
                navigation.navigate('Auth', { screen: 'Welcome' });
            }
        } catch (e) {
            console.log(e);
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
            <View style={styles.loginContainer}>
                <Text>Iniciar sesión</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
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
                                <Text>No tengo una cuenta</Text>
                            </Pressable>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6'
    }
})

export default Login;