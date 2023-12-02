import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, CheckBox} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import Color from '../../asset/Color';
import {AddressDto} from '../../types';
import Btn from '../Btn';
import {RHFTextInput} from '../RHFInputs/RHFTextInput';
import {AddressStyles} from './styles';
import GetLocation, {Location} from 'react-native-get-location';
import {useGetLocation} from '../../screen/Clinic/Profile/useLocationQuery';
import {RHFDropdown} from '../RHFInputs/RHFDropdown';
// import CheckBox from 'react-native-check-box';
import {commonStyles} from '../../asset/styles';

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
    mode: 'onSubmit',
  });

  const [geolocation, setGeolocation] = useState<Location>();
  const [updateLocation, setUpdateLocation] = useState(true);

  // {"accuracy": 20, "altitude": 537.2000122070312, "bearing": 0, "latitude": 18.4742972, "longitude": 73.797143, "provider": "fused", "speed": 0, "time": 1694377557659}

  const {data: locations} = useGetLocation();

  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [defaultValues, locations]);

  useEffect(() => {
    if (!modalVisible) {
      formMethods.reset(defaultValues);
    }
  }, [modalVisible]);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setGeolocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <FormProvider {...formMethods}>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: Color.tertiary,
              marginTop: 200,
              borderTopEndRadius: 30,
              borderTopStartRadius: 30,
            },
          ]}>
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
                placeholder={'Address line1'}
                label={'Address line1'}
                style={AddressStyles.textInput}
                required={true}
              />
              <RHFTextInput
                name="address_line2"
                placeholder={'Address line2'}
                label={'Address line2'}
                style={AddressStyles.textInput}
              />
              <RHFDropdown
                name="city"
                options={
                  locations?.map(l => ({
                    label: l.name,
                    value: l.name,
                  })) ?? []
                }
                placeholder={'City'}
                label={'City'}
                style={AddressStyles.cityTextInput}
                required={true}
              />
              <RHFTextInput
                name="state"
                placeholder={'State'}
                label={'State'}
                style={AddressStyles.textInput}
                required={true}
              />
              <RHFTextInput
                name="pincode"
                placeholder={'Pincode'}
                label={'Pincode'}
                style={AddressStyles.textInput}
                required={true}
                keyboardType={'number-pad'}
              />

              {geolocation && (
                <CheckBox
                  onPress={() => {
                    setUpdateLocation(p => {
                      if (p) {
                        formMethods.resetField('lan');
                        formMethods.resetField('lat');
                      } else {
                        formMethods.setValue('lan', geolocation?.longitude);
                        formMethods.setValue('lat', geolocation?.latitude);
                      }

                      return !p;
                    });
                  }}
                  checked={updateLocation}
                  title="Set current location as clinic location"
                  containerStyle={{backgroundColor: Color.tertiary}}
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Btn
                title={'Submit'}
                onPress={formMethods.handleSubmit(onSubmit)}
              />
            </View>
          </ScrollView>
        </View>
      </FormProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  avoidSoftInputView: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});
