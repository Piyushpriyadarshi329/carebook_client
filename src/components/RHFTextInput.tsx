import {useFormContext, Controller} from 'react-hook-form';
import {StyleSheet, KeyboardTypeOptions} from 'react-native';
import {ValidationErrors} from '../asset/constants';
import {Input} from 'react-native-elements';
import {Text} from 'react-native';

export const RHFTextInput = (props: {
  name: string;
  placeholder?: string;
  required?: boolean;
  style?: any;
  multiline?: boolean;
  rules?: any;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
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
          style={{...props.style}}
          multiline={props.multiline}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          keyboardType={props.keyboardType}
        />
      )}
      name={props.name}
      rules={{
        required: props.required ? ValidationErrors.Required : undefined,
        ...props.rules,
      }}
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
