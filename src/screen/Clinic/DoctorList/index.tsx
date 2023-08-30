import {useNavigation} from '@react-navigation/native';
import {FAB, Image} from '@rneui/base';
import {Icon, Text} from '@rneui/themed';
import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
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

export default function Doctorlist() {
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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Animated.View
        style={[styles.welcomeContainer, {transform: [{translateY}]}]}>
        <View style={[commonStyles.flexRowAlignCenter, {gap: 10}]}>
          <Image
            source={require('../../../asset/image/logoImg_rmbg.png')}
            style={{
              width: 80,
              height: 80,
            }}
            resizeMode="contain"
          />
          <View>
            <Text style={[commonStyles.font24, commonStyles.weight700]}>
              Welcome!
            </Text>
            <Text style={[commonStyles.font20, commonStyles.weight400]}>
              {username}
            </Text>
          </View>
        </View>
      </Animated.View>
      <Animated.FlatList
        data={doctorlist}
        renderItem={({item}) => (
          <Swipeable
            renderRightActions={() => (
              <DeleteDoctorButton onClick={() => onclick(item)} />
            )}>
            <Doctorcard doctor={item} />
          </Swipeable>
        )}
        onScroll={handleScroll}
        ref={ref}
        onMomentumScrollEnd={handleSnap}
        ListEmptyComponent={
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>No Doctor FOund</Text>
          </View>
        }
        contentContainerStyle={styles.doctorListContainer}
      />
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
    paddingBottom: 80,
    height: headerHeight,
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  doctorListContainer: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: Color.greybgc,
    gap: 15,
    zIndex: 2,
    paddingTop: headerHeight,
  },
});
