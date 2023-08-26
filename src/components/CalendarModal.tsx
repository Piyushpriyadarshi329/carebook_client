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
}: {
  date: Date | null;
  setDate: (p: Date) => void;
  modalVisible: boolean;
  setModalVisible: any;
  minDate?: string;
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
          borderColor: Color.primary,
        }}>
        <Calendar
          onDayPress={day => {
            setDate(new Date(day.dateString));
            setModalVisible(!modalVisible);
          }}
          style={{borderRadius: 15}}
          theme={{
            backgroundColor: Pallet2.tertiary,
            calendarBackground: Pallet2.tertiary,
            textSectionTitleColor: Pallet2.primary,
            selectedDayBackgroundColor: Pallet2.primary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: Pallet2.primary,
            dayTextColor: Pallet2.primary,
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
        />
      </View>
    </Modal>
  );
};

export default CalendarModal;
