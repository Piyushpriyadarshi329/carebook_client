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
import Color from '../../asset/Color';
import {FormProvider, useForm} from 'react-hook-form';
import {RHFTextInput} from '../RHFTextInput';
import {AddressStyles} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Btn from '../Btn';
import {AddressDto} from '../../types';

export const AddressModal = ({
  modalVisible,
  setModalVisible,
  onSubmit,
  defaultValues,
}: {
  modalVisible: boolean;
  setModalVisible: any;
  onSubmit: (p: AddressDto) => void;
  defaultValues: AddressDto | undefined;
}) => {
  const formMethods = useForm<AddressDto>({
    defaultValues: defaultValues,
  });
  console.log('defaultValues: ', defaultValues);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
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
                Address
              </Text>
            </View>
            <View style={{position: 'absolute', right: 30}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
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
                name="address_line1"
                placeHolder={'Address line1'}
                styles={AddressStyles.textInput}
              />
              <RHFTextInput
                name="address_line2"
                placeHolder={'Address line2'}
                styles={AddressStyles.textInput}
              />
              <RHFTextInput
                name="city"
                placeHolder={'City'}
                styles={AddressStyles.textInput}
              />
              <RHFTextInput
                name="state"
                placeHolder={'State'}
                styles={AddressStyles.textInput}
              />
              <RHFTextInput
                name="pincode"
                placeHolder={'Pincode'}
                styles={AddressStyles.textInput}
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
