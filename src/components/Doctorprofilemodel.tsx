import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Color from './../asset/Color';
import {FormProvider, useForm} from 'react-hook-form';
import {RHFTextInput} from './RHFTextInput';
import Icon from 'react-native-vector-icons/AntDesign';
import Btn from './Btn';
import {AddressDto} from './../types';
import {AddressStyles} from './Address/styles';

export const Doctorprofilemodel = ({
  editMode,
  setEditMode,
  onSubmit,
  defaultValues,
}: {
  editMode: boolean;
  setEditMode: any;
  onSubmit?: (p: AddressDto) => void;
  defaultValues?: AddressDto | undefined;
}) => {
  const formMethods = useForm<AddressDto>({
    defaultValues: defaultValues,
  });
  console.log('defaultValues: ', defaultValues);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editMode}
      onRequestClose={() => setEditMode(false)}>
      <FormProvider {...formMethods}>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.tertiary,
            marginTop: 200,
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
          }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
                Doctor Profile
              </Text>
            </View>
            <View style={{position: 'absolute', right: 30}}>
              <TouchableOpacity
                onPress={() => {
                  setEditMode(false);
                }}>
                <Icon
                  name="close"
                  style={{fontWeight: 'bold', fontSize: 25}}
                  color={Color.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                flex: 3,
                marginVertical: 20,
                marginHorizontal: 30,
                gap: 20,
              }}>
              <RHFTextInput
                name="name"
                placeHolder={'Name'}
                styles={AddressStyles.textInput}
              />
              <RHFTextInput
                name="borderRadius"
                placeHolder={'Consultation Time'}
                styles={AddressStyles.textInput}
              />
              <RHFTextInput
                name="fees"
                placeHolder={'Consultation Fees'}
                styles={AddressStyles.textInput}
              />
              <RHFTextInput
                name="about"
                placeHolder={'About'}
                styles={{
                  ...AddressStyles.textInput,
                  height: 100,
                  borderRadius: 10,
                }}
                multiline={true}
              />
            </View>
          </ScrollView>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Btn
              title={'Submit'}
              onPress={formMethods.handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </FormProvider>
    </Modal>
  );
};
