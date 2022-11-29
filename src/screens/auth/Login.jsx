import { View, Text, Button, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import * as yup from 'yup';
import CustomInput from "../../components/CustomInput";
import CustomToast from "../../components/CustomToast";
import { AuthAPI } from "../../api/AuthAPI";
import { Image } from "@rneui/themed";

const Login = () => {
    const navigation = useNavigation();

    const handleLogin = async (credentials) => {
        try {
            const response = await AuthAPI.signIn(credentials);
            if(response){
                navigation.navigate('Main', { screen: 'Home', params: { screen: 'Barcitos '} });
            }
        } catch (e) {
            CustomToast(e.message);
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
        <View>
            <View style={styles.imageContainer}>
                <Text style={{ fontSize: 50, fontStyle: 'italic', padding: 10 }}>Barcito</Text>
                <Image source={require('../../../assets/barcito-big.png')} style={{ width: 400, height: 200 }}/>
            </View>
            <View style={styles.loginContainer}>
                <Text>Iniciar sesión</Text>
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
    imageContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        alignSelf: 'center',
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 50,
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6'
    }
})

export default Login;