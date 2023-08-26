import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import ConformationModel from '../components/ConformationModel';
import Doctorcard from '../components/Doctorcard';
import SwipeDeleteButton from '../components/SwipeDeleteButton';
import {useremoveDoctorMapping} from '../customhook/useremoveDoctorMapping';
import type {RootState} from '../redux/Store';
import {DoctorDto} from '../types';
import {useGetDoctorsList} from './useDoctorQuery';
import {commonStyles} from '../asset/styles';
import {FAB} from '@rneui/base';

export default function Doctorlist() {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteddoctor, setdeleteddoctor] = useState<DoctorDto | null>();

  const navigation = useNavigation<any>();
  const {userid: userId, username} = useSelector(
    (state: RootState) => state.Appdata,
  );

  const {mutate: removeDoctor} = useremoveDoctorMapping(() => {});
  const {data: doctorlist} = useGetDoctorsList({
    clinic_id: userId ?? '',
  });

  async function onclick(doctor: DoctorDto) {
    setdeleteddoctor(doctor);
    setModalVisible(true);
  }

  async function deletehandler(doctor: DoctorDto) {
    try {
      let payload = {
        doctor_id: deleteddoctor?.id,
        clinic_id: deleteddoctor?.clinic_id,
      };

      console.log('payload', payload);

      let res = await removeDoctor(payload);
      setModalVisible(false);
    } catch (error) {
      setModalVisible(false);

      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.welcomeContainer}>
        <Text style={[commonStyles.font24, commonStyles.weight700]}>
          Welcome!
        </Text>
        <Text style={[commonStyles.font20, commonStyles.weight400]}>
          {username}
        </Text>
      </View>
      <View style={styles.doctorListContainer}>
        {doctorlist?.length == 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>No Doctor FOund</Text>
          </View>
        ) : (
          <SwipeListView
            data={doctorlist}
            renderItem={(data, rowMap) => <Doctorcard doctor={data.item} />}
            renderHiddenItem={(data, rowMap) => (
              <SwipeDeleteButton onPress={onclick} item={data.item} />
            )}
            rightOpenValue={-75}
          />
        )}
        <FAB
          placement="right"
          onPress={() => navigation.navigate('Adddoctor')}
          icon={{name: 'add', color: 'white'}}
          color={Color.primary}
        />
      </View>
      <ConformationModel
        title="Doctor Delete?"
        subtitle="Do you want to delete Doctor?"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onsubmit={deletehandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: Color.secondary,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  doctorListContainer: {
    flex: 4,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: -20,
    paddingTop: 40,
    backgroundColor: Color.greybgc,
    gap: 20,
  },
});
