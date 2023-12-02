import {Text} from '@rneui/themed';
import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import Appointmentcard from '../components/Appointmentcard';
import {usegetBookingsSummary} from '../customhook/usegetBookingsSummary';
import type {RootState} from '../redux/Store';
import {BookingStatus} from '../types';
import {getToday} from '../utils/dateMethods';
import {useGetAppointments} from './Appointment/useAppointmentsQuery';
import {FlatList} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const Appdata = useSelector((state: RootState) => state.Appdata);

  // const [datelabel, setdatelabel] = useState<string[]>([]);
  const {data: bookingdata} = usegetBookingsSummary({
    doctor_id: Appdata.userid,
  });

  const chartConfig = {
    backgroundGradientFrom: '#Ffffff',
    backgroundGradientTo: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => Color.primary,
    // color: () => '#333', // THIS
    strokeWidth: 2.5, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0, // optional, defaults to 2dp
    barRadius: 5,

    useShadowColorFromDataset: false, // optional,
    fillShadowGradient: Color.primary, // THIS
    fillShadowGradientOpacity: 1, // THIS
    style: {
      borderRadius: 16,
      fontFamily: 'Bogle-Regular',
    },
    propsForBackgroundLines: {
      strokeWidth: 0,
      stroke: '#efefef',
      strokeDasharray: '0',
    },
    propsForLabels: {
      fontFamily: 'Regular',
    },
  };

  const data = {
    labels: bookingdata?.datelabel || [],
    datasets: [
      {
        data: bookingdata?.count || [],
      },
    ],
  };
  const {data: Appointmentdata} = useGetAppointments({
    doctorId: Appdata.userid,
    status: [BookingStatus.BOOKED],
    from_date: getToday().getTime(),
  });

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1.2,
          marginHorizontal: 10,
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <View>
          <Text style={{color: 'black', fontSize: 14}}> Welcome back!</Text>
          <Text style={{color: 'black', fontSize: 16}}>
            Dr. {Appdata.username}
          </Text>
        </View>
      </View>
      <View style={{flex: 4, marginHorizontal: 10}}>
        <Text style={{color: 'black', fontWeight: '500'}}>
          Upcoming Appointments
        </Text>

        <FlatList
          horizontal
          data={Appointmentdata}
          contentContainerStyle={{gap: 10}}
          renderItem={({item}) => <Appointmentcard appointment={item} />}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text>Nothing here yet.</Text>
            </View>
          }
        />
      </View>
      <View style={{flex: 5, marginHorizontal: 5, marginRight: 20}}>
        <View style={{marginTop: 10, flex: 1}}>
          {bookingdata?.count.length == 0 || !bookingdata ? (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                  Nothing is here
                </Text>
              </View>
            </>
          ) : (
            <BarChart
              style={{flex: 1}}
              data={data}
              width={screenWidth - 40}
              height={240}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              yAxisSuffix={''}
              showBarTops={false}
              fromZero={true}
              segments={5}
            />
          )}
        </View>
      </View>

      <View style={{flex: 1}}></View>
    </View>
  );
}
