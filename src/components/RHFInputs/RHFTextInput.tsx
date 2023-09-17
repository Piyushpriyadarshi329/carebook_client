import {Input, InputProps} from '@rneui/base';
import {useFormContext, Controller} from 'react-hook-form';
import {ValidationErrors} from '../../asset/constants';

export const RHFTextInput = ({
  name,
  required,
  rules,
  ...props
}: Omit<InputProps, 'ref'> & {
  name: string;
  required?: boolean;
  rules?: any;
}) => {
  const {control} = useFormContext();
  return (
    <Controller
      control={control}
      render={({field, formState: {errors}}) => (
        <Input
          errorMessage={errors[name]?.message?.toString()}
          onChangeText={t => field.onChange(t)}
          {...field}
          {...props}
        />
      )}
      name={name}
      rules={{
        required: required ? ValidationErrors.Required : undefined,
        ...rules,
      }}
    />
  );
};
