import {Button} from '@rneui/themed';
import React, {useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import Color from '../../../../asset/Color';
import {AddressStyles} from '../../../../components/Address/styles';
import {RHFDropdown} from '../../../../components/RHFInputs/RHFDropdown';
import {RHFTextInput} from '../../../../components/RHFInputs/RHFTextInput';
import {useGetSpecialtiesQuery} from '../../../../customhook/useSpecialty';

const DoctorEditForm = ({
  isClinic,
  onSubmit,
  onSkip,
  bgColor,
}: {
  isClinic?: boolean;
  onSubmit: () => void;
  onSkip?: () => void;
  bgColor?: string;
}) => {
  const {data: specialties} = useGetSpecialtiesQuery();

  const specialtyOptions = useMemo(
    () => specialties?.map(s => ({label: s.name, value: s.name})),
    [specialties],
  );

  return (
    <ScrollView>
      <View
        style={{
          flex: 3,
          marginVertical: 20,
          marginHorizontal: 30,
          gap: 20,
        }}>
        <RHFTextInput
          name="username"
          placeholder={'Enter Name'}
          label={'Name'}
          style={AddressStyles.textInput}
          required
        />
        {isClinic && (
          <RHFTextInput
            name="fees"
            placeholder={'Enter Consultation Fees'}
            label={'Consultation Fees'}
            keyboardType="decimal-pad"
            style={AddressStyles.textInput}
            required
          />
        )}
        <RHFTextInput
          name="degree"
          placeholder={'Enter Degree'}
          label={'Degree'}
          style={AddressStyles.textInput}
        />
        <RHFTextInput
          name="experience"
          placeholder={'Enter Yrs of Experience'}
          label={'Yrs of Experience'}
          style={AddressStyles.textInput}
          keyboardType="number-pad"
        />
        <RHFDropdown
          name="speciality"
          options={specialtyOptions ?? []}
          label="Specialty"
          placeholder="Enter specialty"
          style={{backGroundColor: bgColor}}
          zIndex={100}
          componentProps={{
            style: {backgroundColor: bgColor},
            dropDownContainerStyle: {backgroundColor: bgColor},
          }}
        />
        <RHFTextInput
          name="about"
          placeholder={'Enter About'}
          label={'About'}
          style={{
            ...AddressStyles.textInput,
            borderRadius: 10,
          }}
          multiline={true}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 20,
          gap: 20,
        }}>
        {onSkip && (
          <Button
            title={'Skip'}
            onPress={onSkip}
            color={Color.secondary}
            buttonStyle={{paddingHorizontal: 30}}
          />
        )}
        <Button
          title={'Save'}
          onPress={() => onSubmit()}
          buttonStyle={{paddingHorizontal: 40}}
        />
      </View>
    </ScrollView>
  );
};

export default DoctorEditForm;
