import {useFormContext, Controller} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';

export const RHFTextInput = (props: {
  name: string;
  placeHolder?: string;
  required?: boolean;
  styles?: any;
  multiline?: boolean;
}) => {
  const {control} = useFormContext();
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          style={{...styles.input, ...props.styles}}
          onBlur={onBlur}
          placeholder={props.placeHolder}
          onChangeText={value => onChange(value)}
          value={value}
          multiline={props.multiline}
          placeholderTextColor={'black'}
        />
      )}
      name={props.name}
      rules={{required: props.required}}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    width: '100%',
  },
});
