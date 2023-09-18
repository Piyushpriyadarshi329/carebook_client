import {useFormContext, Controller} from 'react-hook-form';
import {StyleSheet, KeyboardTypeOptions, View} from 'react-native';
import {ValidationErrors} from '../../asset/constants';
import {Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';
import {commonStyles} from '../../asset/styles';

export const RHFDropdown = (props: {
  name: string;
  placeholder?: string;
  required?: boolean;
  style?: any;
  rules?: any;
  options: {label: string; value: string}[];
  label?: string;
  zIndex?: number;
  componentProps?: any;
  value?: 'value' | 'label' | 'object';
  mode?: 'FlatList' | 'ScrollView' | 'Modal';
}) => {
  const {control, getValues} = useFormContext();
  const [open, setOpen] = useState(false);
  return (
    <Controller
      control={control}
      render={({field, formState: {errors}}) => (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            paddingHorizontal: 5,
            gap: 10,
            zIndex: props.zIndex,
          }}>
          {props.label && (
            <Text
              style={[
                commonStyles.caption,
                {fontWeight: '700', color: '#8795a0'},
              ]}>
              {props.label}
            </Text>
          )}
          <DropDownPicker
            value={field.value}
            open={open}
            setOpen={setOpen}
            modalContentContainerStyle={{
              padding: 20,
              margin: 20,
            }}
            modalTitle={`Select ${props.label || props.placeholder || ''}`}
            modalProps={{
              statusBarTranslucent: true,
            }}
            modalAnimationType="slide"
            listMode={props.mode == 'FlatList' ? 'MODAL' : undefined}
            setValue={() => {}}
            onSelectItem={item => {
              field.onChange(item.value);
            }}
            style={[
              props.style,
              {
                borderWidth: 0,
                borderBottomWidth: 1,
                marginVertical: 10,
              },
            ]}
            items={props.options}
            placeholder={props.placeholder}
            {...props.componentProps}
          />
          {errors[props.name]?.message?.toString() && (
            <Text style={{color: 'red', marginLeft: 5, marginTop: 5}}>
              {errors[props.name]?.message?.toString()}
            </Text>
          )}
        </View>
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
