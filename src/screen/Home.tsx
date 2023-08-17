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

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const Appdata = useSelector((state: RootState) => state.Appdata);

  const [datelabel, setdatelabel] = useState<string[]>([]);

  useEffect(() => {
    let localdate = [];

    for (let i = 1; i < 7; i++) {
      let date = new Date();

      date.setDate(date.getDate() - i);

      let month = date.getMonth();

      let d1 = date.getDate();

      let s1 = d1 + ' ' + monthlist[month];
      localdate.push(s1);
    }
    setdatelabel(localdate);
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#Ffffff',
    backgroundGradientTo: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(227,182,77, 1)`,
    // color: Color.primary,
    strokeWidth: 2.5, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0, // optional, defaults to 2dp
    barRadius: 5,
    useShadowColorFromDataset: false, // optional,
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
    labels: datelabel,
    datasets: [
      {
        data: [20, 45, 28, 80, 30, 43],
      },
    ],
  };
  const {data: Appointmentdata} = usegetAppointments({
    doctorId: Appdata.userid,
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

        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
            marginTop: 20,
            marginLeft: 10,
          }}>
          <Icon name="bell" size={30} color={Color.primary} />
        </View>
      </View>
      <View style={{flex: 4, marginHorizontal: 10}}>
        <Text style={{color: 'black', fontWeight: '500'}}>
          Upcomming Appointments
        </Text>

        <View style={{flex: 1}}>
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
      </View>
      <View style={{flex: 5, marginHorizontal: 10}}>
        <View style={{marginTop: 10}}>
          <BarChart
            style={{flex: 1}}
            data={data}
            width={screenWidth - 20}
            height={240}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            yAxisSuffix={''}
            showBarTops={false}
            fromZero={true}
            segments={5}
          />
        </View>
      </View>

      <View style={{flex: 1}}></View>
    </View>
  );
}
