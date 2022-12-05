import { makeStyles } from '@rneui/themed';
import { Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const styles = useStyles();

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 15,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  }
}));

export default CustomInput;