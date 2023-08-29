import {Text} from '@rneui/themed';
import {default as React} from 'react';
import {StyleSheet, View} from 'react-native';
import {commonStyles} from '../../../asset/styles';
import {DoctorDto} from '../../../types';

const DoctorDetails = ({
  doctorDetails,
}: {
  doctorDetails:
    | (DoctorDto & {
        profile_image: string;
      })
    | undefined;
}) => {
  return (
    <>
      <Text style={commonStyles.caption}>{doctorDetails?.speciality}</Text>
      <Text style={[commonStyles.font20, commonStyles.weight700]}>
        Dr.{doctorDetails?.name}
      </Text>
      {doctorDetails?.degree && (
        <Text style={commonStyles.caption}>{doctorDetails?.degree}</Text>
      )}
      <View style={style.detailsCardContainer}>
        <View style={style.detailsCard}>
          <Text style={commonStyles.caption}>Experience</Text>
          <Text style={[commonStyles.font18, commonStyles.weight600]}>
            {doctorDetails?.experience
              ? `${doctorDetails?.experience + ' Yrs'}`
              : ''}
          </Text>
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: 'grey',
            height: '80%',
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{paddingVertical: 20}}>
        <Text style={[commonStyles.font18, commonStyles.weight800]}>About</Text>
        <Text style={commonStyles.font14}>{doctorDetails?.about}</Text>
      </View>
    </>
  );
};

export default DoctorDetails;

const style = StyleSheet.create({
  detailsCardContainer: {
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  detailsCard: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
