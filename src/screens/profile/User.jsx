import { useCallback } from 'react';
import { Button, makeStyles, Text } from "@rneui/themed";
import { View } from "react-native";
import { Formik, Field } from "formik";
import * as yup from 'yup';
import { useQuery, useQueryClient } from "react-query";
import CustomToast from "../../components/CustomToast";
import CustomInput from "../../components/CustomInput";
import SelectInput from "../../components/SelectInput";
import { UserAPI } from "../../api/UserAPI";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import LoadingScreen from "../../components/LoadingScreen";

const User = () => {
    const client = useQueryClient();
    const navigation = useNavigation();
    const styles = useStyles();
    const { data, isLoading } = useQuery(['user'], async () => UserAPI.get());
    let status = 'No asociado';
    let statusStyle = styles.rejected;

    useFocusEffect(
        useCallback(() => {
            return () => client.invalidateQueries(['user']);
        }, [])
    );

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
        return <LoadingScreen />;
    }

    if(data.applicationDone){
        status = data.applicationDone.status;
        switch(status){
            case 'Pendiente':
                statusStyle = styles.pending;
                break;
            case 'Aceptado':
                statusStyle = styles.accepted;
                break;
            case 'Rechazado':
                statusStyle = styles.rejected;
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '25%'}}>
                <Text style={{...styles.text, marginBottom: 10}}>Estado de socio</Text>
                <Text style={{...styles.associatedText, ...statusStyle}}>{status}</Text>
                {!data.applicationDone && <Button title="Asociarme" onPress={() => navigation.navigate('Main', { screen: 'Profile', params: { screen: 'Associate' } } )} />}
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.text}>Editar datos de perfil</Text>
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

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
    associatedText: {
        fontSize: 25,
        marginBottom: 20
    },
    pending: {
        color: theme.colors.warning
    },
    accepted: {
        color: theme.colors.secondary
    },
    rejected: {
        color: theme.colors.error
    },
    formContainer: {
        alignSelf: 'center',
        width: '80%',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundVariant,
        padding: 25,
        elevation: 10,
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

export default User;