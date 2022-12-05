import { View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import * as yup from 'yup';
import CustomInput from "../../components/CustomInput";
import SelectInput from "../../components/SelectInput";
import CustomToast from "../../components/CustomToast";
import { AuthAPI } from "../../api/AuthAPI";
import { Image, Button, Text, makeStyles } from "@rneui/themed";

const Register = () => {
    const navigation = useNavigation();
    const styles = useStyles();

    const handleSignUp = async (userData) => {
        try {
            console.log(userData);
            const response = await AuthAPI.signUp(userData);
            if (response) {
                navigation.navigate('Main', { screen: 'Home', params: { screen: 'Barcitos' } });
            }
        } catch (e) {
            CustomToast(e);
        }
    }

    const signUpValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required('El nombre es requerido'),
        surname: yup
            .string()
            .required('El apellido es requerido'),
        phone: yup
            .number()
            .required('El teléfono es requerido'),
        dni: yup
            .number()
            .required('El dni es requerido'),
        academicUnitId: yup
            .number()
            .required('La unidad academica es requerida'),
        email: yup
            .string()
            .email('El email ingresado no es válido')
            .required('El email es requerido'),
        password: yup
            .string()
            .matches(/\w*[a-z]\w*/,  'La contraseña debe tener al menos una letra minúscula')
            .matches(/\w*[A-Z]\w*/,  'La contraseña debe tener al menos una letra mayúscula')
            .matches(/\d/, 'La contraseña debe tener al menos un número')
            .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'La contraseña debe tener un caracter especial')
            .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
            .required('La contraseña es requerida')
    })

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Text style={{ fontSize: 50, fontStyle: 'italic', padding: 10 }}>Barcito</Text>
                <Image source={require('../../../assets/barcito-big.png')} style={{ width: 400, height: 200 }}/>
            </View>
            <View style={styles.signUpContainer}>
                <Text style={styles.text}>Registrarse</Text>
                <Formik 
                    initialValues={{
                        name: '',
                        surname: '',
                        phone: '',
                        dni: '',
                        academicUnitId: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={signUpValidationSchema}
                    onSubmit={values => handleSignUp(values)}
                >
                    {({ handleSubmit, isValid }) => (
                        <>
                            <Field
                                component={CustomInput}
                                name='name'
                                placeholder='Nombre'
                            />
                            <Field
                                component={CustomInput}
                                name='surname'
                                placeholder='Apellido'
                            />
                            <Field
                                component={CustomInput}
                                name='phone'
                                placeholder='Telefono'
                                keyboardType='numeric'
                            />
                            <Field
                                component={CustomInput}
                                name='dni'
                                placeholder='DNI'
                                keyboardType='numeric'
                            />
                            <Field
                                component={SelectInput}
                                name='academicUnitId'
                            />
                            <Field
                                component={CustomInput}
                                name='email'
                                placeholder='Email'
                                keyboardType='email-address'
                            />
                            <Field
                                component={CustomInput}
                                name='password'
                                placeholder='Contraseña'
                                secureTextEntry
                            />
                            <Button onPress={handleSubmit} title='Registrarme' disabled={!isValid} />
                            <Pressable style={{ margin: 10 }} onPress={() => navigation.navigate('Auth', { screen: 'Login' })} >
                                <Text style={styles.link}>Ya tengo una cuenta</Text>
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
        backgroundColor: theme.colors.background,
        height: '100%'
    },
    imageContainer: {
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpContainer: {
        alignSelf: 'center',
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'white',
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
}))

export default Register;