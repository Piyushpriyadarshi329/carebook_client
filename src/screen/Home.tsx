import {View, Text, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import Color from '../asset/Color';
import Appointmentcard from '../components/Appointmentcard';
import Icon from 'react-native-vector-icons/FontAwesome';
import type {RootState} from '../redux/Store';
import {useSelector, useDispatch} from 'react-redux';
import {usegetAppointments} from '../customhook/usegetAppointments';

import {monthlist, daylist} from './../Appconstant';
import {usegetBookingsSummary} from '../customhook/usegetBookingsSummary';
import {BookingStatus} from '../types';
import {getToday} from '../utils/dateMethods';

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
    color: (opacity = 1) => `rgba(227,182,77, ${opacity})`,
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
  const {data: Appointmentdata} = usegetAppointments({
    doctorId: Appdata.userid,
    status: BookingStatus.BOOKED,
    from_date: getToday(),
  });

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1.2,
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: 'black', fontSize: 14}}> Welcome back!</Text>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
            Dr. {Appdata.username}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
            marginLeft: 10,
          }}>
          <Icon name="bell" size={30} color={Color.primary} />
        </View>
      </View>
      <View
        style={{
          flex: 2,
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: Color.tertiary,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            fontSize: 19,
          }}>
          Upcomming Appointments
        </Text>

        <ScrollView horizontal={true}>
          {Appointmentdata?.map(i => {
            return (
              <View style={{marginHorizontal: 10}}>
                <Appointmentcard data={i} />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={{flex: 5, marginHorizontal: 5, marginRight: 20}}>
        <View style={{marginTop: 10, flex: 1}}>
          {bookingdata?.count.length == 0 || !bookingdata ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                No Bookings yet.
              </Text>
            </View>
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
