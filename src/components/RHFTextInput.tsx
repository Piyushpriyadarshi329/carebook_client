import {useFormContext, Controller} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';
import {ValidationErrors} from '../asset/constants';
import {Input} from 'react-native-elements';
import {Text} from 'react-native';

export const RHFTextInput = (props: {
  name: string;
  placeHolder?: string;
  required?: boolean;
  styles?: any;
  multiline?: boolean;
  rules?: any;
}) => {
  const {control} = useFormContext();
  return (
    <Controller
      control={control}
      render={({field, formState: {errors}}) => (
        <Input
          errorMessage={errors[props.name]?.message?.toString()}
          {...field}
          onChangeText={t => field.onChange(t)}
          style={{...props.styles}}
          multiline={props.multiline}
          placeholder={props.placeHolder}
        />
      )}
      name={props.name}
      rules={{required: props.required ? ValidationErrors.Required : undefined}}
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
