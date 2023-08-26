import {default as React} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Color from '../../asset/Color';
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
    </View>
  );
};

export default Status;
