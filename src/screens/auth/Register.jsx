import { View, Text, Button, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import CustomInput from "../../components/atoms/CustomInput";
import { AuthAPI } from "../../api/AuthAPI";

const Register = () => {
    const navigation = useNavigation();

    const handleSignUp = async (userData) => {
        try {
            const response = await AuthAPI.signUp(userData);
            if (response) {
                navigation.navigate('Auth', { screen: 'Welcome' });
            }
        } catch (e) {
            console.log(e);
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
        academicUnit: yup
            .string()
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
            <View style={styles.signUpContainer}>
                <Text>Registrarse</Text>
                <Formik 
                    initialValues={{
                        name: '',
                        surname: '',
                        phone: '',
                        dni: '',
                        academicUnit: '',
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
                            <Pressable>
                            <Picker
                                style={{ width: 250 }} // ???????????????
                                selectedValue={'FAIN'}
                                onValueChange={(itemValue, itemIndex) =>
                                    console.log(itemValue)
                                }>
                                <Picker.Item label="Facultad de Informática" value="FAI" />
                                <Picker.Item label="Facultad de Ingenieria" value="FAIN" />
                            </Picker>
                            </Pressable>
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
                                <Text>Ya tengo una cuenta</Text>
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
        alignItems: 'center'
    },
    signUpContainer: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6'
    }
})

export default Register;