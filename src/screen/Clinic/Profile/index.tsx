import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../../../asset/Color';
import {useSelector, useDispatch} from 'react-redux';
import {updateappstate} from '../../../redux/reducer/Authreducer';
import {useGetaddress} from '../../../customhook/useGetaddress';
import {RootState} from '../../../redux/Store';
import {useClinicsList} from './useGetcliniclist';
import {useNavigation} from '@react-navigation/native';
import {useAddaddressMutation} from './useAddaddress';
import {AddressModal} from '../../../components/Address/AddressModal';
import {AddressDto} from '../../../types';
import {useUpdateClinic} from './useClinicQuery';
import {useQueryClient} from '@tanstack/react-query';
import EditButton from '../../../components/EditButton';

export default function Clinicprofile() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [modalVisible, setModalVisible] = useState(false);

  const {data: profiles, isLoading} = useClinicsList({clinic_id: userId});
  const profile = profiles?.[0];
  const qc = useQueryClient();
  const {mutate: mutateAddress} = useAddaddressMutation({
    onSuccess: data => {
      console.log('updated.', data.data);
      setModalVisible(false);
      qc.invalidateQueries(['CLINICS', {clinic_id: userId}]);
    },
  });
  if (isLoading) {
    console.log('loading profile');
  }
  function submithandler(formValues: AddressDto) {
    mutateAddress({
      id: profile?.address.id,
      user_id: userId,
      address_line1: formValues.address_line1,
      address_line2: formValues.address_line2,
      city: formValues.city,
      state: formValues.state,
      pincode: Number(formValues.pincode),
      lat: Number(formValues.lat),
      lan: Number(formValues.lan),
      type: 'Clinic',
    });
  }

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 2, marginTop: 30}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              {profile?.name}
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'column',
                width: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'black'}}>Address: </Text>
                <EditButton
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
              </View>
              <View style={{width: '100%'}}>
                {profile?.address ? (
                  <>
                    <View style={{width: '100%'}}>
                      <Text
                        style={{color: 'black', marginTop: 5, width: '100%'}}>
                        {profile?.address?.address_line1}
                        {profile?.address?.address_line2}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <Text style={{color: 'black'}}>
                        {profile?.address?.city} {profile?.address?.state}
                        {profile?.address?.pincode}
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginTop: 10,
            }}
            source={require('../../../asset/image/Clinic.jpeg')}
          />
        </View>
      </View>

      <View style={{flexDirection: 'column', flex: 4}}>
        <View style={{flex: textShown ? 2.5 : 1.5, marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              About
            </Text>
            <EditButton onPress={() => {}} />
          </View>
          <View>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 2}
              style={{lineHeight: 21, color: 'black'}}>
              {profile?.about || '- -'}
            </Text>

            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 21,
                  marginTop: 4,
                  color: 'black',
                  fontWeight: '700',
                }}>
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            title={'Logout'}
            onPress={() =>
              dispatch(
                updateappstate({
                  islogin: false,
                  isdoctor: false,
                }),
              )
            }
            color={Color.red}
          />
        </View>
      </View>
      <AddressModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSubmit={submithandler}
        defaultValues={profile?.address}
      />
    </View>
  );
}
