import { Chip } from "@rneui/themed";
import { View, Text, Button, StyleSheet } from "react-native";
import { Formik, Field } from "formik";
import * as yup from 'yup';
import { useQuery } from "react-query";
import CustomToast from "../../components/CustomToast";
import CustomInput from "../../components/CustomInput";
import SelectInput from "../../components/SelectInput";
import { UserAPI } from "../../api/UserAPI";
import { useNavigation } from "@react-navigation/core";

const User = () => {

    const navigation = useNavigation();

    const { data, isLoading } = useQuery(['user'], async () => UserAPI.get());

    const userValidationSchema = yup.object().shape({
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
            .required('El email es requerido')
    })

    const handleSave = async (data) => {
        try {
            const response = await UserAPI.update(data);
            if(response){
                CustomToast('Guardado exitoso!');
            }
        } catch (e) {
            CustomToast(e);
        }
    }

    if(isLoading){
        return <View><Text>Is Loading</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Chip title="No asociado" />
            <Button title="Asociarme" onPress={() => navigation.navigate('Main', { screen: 'Profile', params: { screen: 'Associate' } } )} />
            <View style={styles.formContainer}>
                <Text>Editar datos de perfil</Text>
                <Formik 
                    initialValues={{
                        name: data.name,
                        surname: data.surname,
                        phone: data.phone,
                        dni: data.dni,
                        academicUnitId: `${data.academicUnitId}`,
                        email: data.email
                    }}
                    validationSchema={userValidationSchema}
                    onSubmit={values => handleSave(values)}
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
                            <Button onPress={handleSubmit} title='Guardar' disabled={!isValid} />
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
    formContainer: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6'
    }
})

export default User;