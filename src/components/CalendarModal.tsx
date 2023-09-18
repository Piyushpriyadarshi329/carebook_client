import {default as React} from 'react';
import {Modal, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Color, {Pallet2} from '../asset/Color';
import ModalCloseOnEscape from '../utils/ModalCloseOnEscape';
import moment from 'moment';

const CalendarModal = ({
  date,
  setDate,
  modalVisible,
  setModalVisible,
  minDate,
  maxDate = '2999-10-10',
}: {
  date: Date | null;
  setDate: (p: Date) => void;
  modalVisible: boolean;
  setModalVisible: any;
  minDate?: string;
  maxDate?: string;
}) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      transparent={true}
      visible={modalVisible}>
      <ModalCloseOnEscape setVisible={setModalVisible} />
      <View
        style={{
          marginTop: 200,
          marginHorizontal: 50,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <Calendar
          onDayPress={day => {
            console.log('india', moment.utc(day.timestamp).local());
            setDate(new Date(day.timestamp - 19800000));
            setModalVisible(!modalVisible);
          }}
          style={{borderRadius: 15}}
          theme={{
            backgroundColor: Pallet2.tertiary,
            calendarBackground: Color.white,
            textSectionTitleColor: Color.primary,
            selectedDayBackgroundColor: Color.primary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: Pallet2.primary,
            dayTextColor: Color.primary,
          }}
          markedDates={{
            [moment().format('YYYY-MM-DD')]: {
              marked: true,
              selectedColor: Pallet2.primary,
            },
            [moment(date).format('YYYY-MM-DD')]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          minDate={minDate}
          maxDate={maxDate}
        />
      </View>
    </Modal>
  );
};

export default CalendarModal;
