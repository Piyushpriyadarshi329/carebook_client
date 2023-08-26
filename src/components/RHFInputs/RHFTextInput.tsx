import {useFormContext, Controller} from 'react-hook-form';
import {StyleSheet, KeyboardTypeOptions} from 'react-native';
import {ValidationErrors} from '../../asset/constants';
import {Input} from '@rneui/base';

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
          style={props.style}
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
