import {useNavigation} from '@react-navigation/native';
import {FAB} from '@rneui/base';
import {Icon, Text} from '@rneui/themed';
import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import {ScrollView, Swipeable} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Color from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import ConformationModel from '../../../components/ConformationModel';
import Doctorcard from './Doctorcard';
import {useremoveDoctorMapping} from '../../../customhook/useremoveDoctorMapping';
import type {RootState} from '../../../redux/Store';
import {DoctorDto} from '../../../types';
import {getCloser} from '../../helper';
import {useGetDoctorsList} from '../../useDoctorQuery';
import {AppPages} from '../../../Routes/appPages';
import {useClinicsList} from '../Profile/useGetcliniclist';

const {diffClamp} = Animated;
const headerHeight = 80 * 2;
const target = headerHeight;

const DeleteDoctorButton = ({onClick}: {onClick: () => void}) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
      onPress={onClick}>
      <Icon
        name="delete"
        color={Color.red}
        style={{paddingHorizontal: 40}}
        size={30}
      />
    </TouchableOpacity>
  );
};

export default function DoctorList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteddoctor, setdeleteddoctor] = useState<DoctorDto | null>();
  const navigation = useNavigation<any>();
  const {mutate: removeDoctor} = useremoveDoctorMapping(() => {});
  const {userid, username} = useSelector((state: RootState) => state.Appdata);
  const {data: doctorlist} = useGetDoctorsList({clinic_id: userid ?? ''});
  const scrollY = useRef(new Animated.Value(0));
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  const ref = useRef<any>();
  const translateYNumber = useRef();
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -target],
  });

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  function onclick(doctor: DoctorDto) {
    setdeleteddoctor(doctor);
    setModalVisible(true);
  }

  function deleteHandler(doctor: DoctorDto) {
    removeDoctor({
      doctor_id: deleteddoctor?.id ?? '',
      clinic_id: deleteddoctor?.clinic_id,
    });
    setModalVisible(false);
  }

  const handleSnap = ({nativeEvent}: any) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(translateYNumber.current === 0 || translateYNumber.current === -target)
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current ?? 0, -target, 0) === -target
              ? offsetY + target
              : offsetY - target,
        });
      }
    }
  };

  const {data: profiles, isLoading} = useClinicsList({clinic_id: userid});
  const clinicDetails = profiles?.[0];
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.welcomeContainer}>
          <View style={{gap: 10}}>
            <Image
              source={require('../../../asset/image/logo.jpeg')}
              style={{
                width: 200,
                height: 80,
              }}
              resizeMode="cover"
            />
            <View>
              <Text style={{fontSize: 36}}>Welcome!</Text>
              <Text style={{fontSize: 18, fontFamily: 'Poppins-Regular'}}>
                {username}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              resizeMode="cover"
              source={
                clinicDetails?.profile_image
                  ? {uri: clinicDetails?.profile_image}
                  : require('../../../asset/image/hospital.png')
              }
            />
          </View>
        </View>
        <View style={styles.doctorListContainer}>
          <FlatList
            data={doctorlist}
            renderItem={({item}) => (
              <Swipeable
                renderRightActions={() => (
                  <DeleteDoctorButton onClick={() => onclick(item)} />
                )}>
                <Doctorcard doctor={item} />
              </Swipeable>
            )}
            ref={ref}
            ListEmptyComponent={
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>No Doctor FOund</Text>
              </View>
            }
            contentContainerStyle={{gap: 15}}
            ListFooterComponent={<View style={{height: 100}}></View>}
          />
        </View>
      </ScrollView>
      <FAB
        placement="right"
        onPress={() => {
          navigation.navigate(AppPages.AddDoctor);
        }}
        icon={{name: 'add', color: 'white'}}
        color={Color.primary}
        style={{zIndex: 100}}
      />
      <ConformationModel
        title="Doctor Delete?"
        subtitle="Do you want to delete Doctor?"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onsubmit={deleteHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    backgroundColor: Color.secondary,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 40,
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doctorListContainer: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: Color.tertiary,
    gap: 15,
    marginTop: -20,
    paddingTop: 20,
    zIndex: 50,
  },
});
