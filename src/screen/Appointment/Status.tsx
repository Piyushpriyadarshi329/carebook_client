import {default as React, useMemo, useState} from 'react';
import {
  Button,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Color from '../../asset/Color';
import {UpcomingDateTile} from '../../components/DateTile';
import Navbar from '../../components/Navbar';
import {useUpdateSlotStatus} from '../../customhook/useUpdateSlotStatus';
import {usegetAppointments} from '../../customhook/usegetAppointments';
import {RootState} from '../../redux/Store';
import {useAlert} from '../../utils/useShowAlert';
import {daylist, monthlist} from '../../Appconstant';
import IconButton from '../../components/IconButton';
import {BookingStatus} from '../../types';

const Status = ({
  id,
  status,
  updateslot,
}: {
  id: string;
  status: BookingStatus;
  updateslot: (id: string, status: BookingStatus) => void;
}) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        flexDirection: 'row',
      }}>
      {status == 'BOOKED' ? (
        <IconButton
          icon={<Icon name={'playcircleo'} color={Color.primary} size={25} />}
          onPress={() => {
            updateslot(id, 'STARTED');
          }}
        />
      ) : null}

      {status == 'STARTED' ? (
        <IconButton
          icon={<Icon name={'check'} color={Color.primary} size={25} />}
          onPress={() => {
            updateslot(id, 'COMPLETED');
          }}
        />
      ) : null}

      {status == 'COMPLETED' ? (
        <View>
          <Text style={{color: 'green'}}>Completed</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Status;
