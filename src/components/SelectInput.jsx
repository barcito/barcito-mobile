import { Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <Picker
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        selectedValue={value}
        onValueChange={(itemValue) => onChange(name)(itemValue)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      >
          <Picker.Item enabled={false} label="Unidad academica" value='' />
          <Picker.Item label="Facultad de Informática" value='1' />
          <Picker.Item label="Facultad de Ingenieria" value='2' />
      </Picker>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  }
});

export default SelectInput;