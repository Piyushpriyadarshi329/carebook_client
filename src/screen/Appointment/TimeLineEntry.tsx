import LoadingDots from '@apolloeagle/loading-dots';
import {default as React, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import DownArrow from 'react-native-vector-icons/MaterialIcons';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import Status from './Status';

const TimeLineEntry = ({
  rowData,
  isForClinic,
  updateslot,
}: {
  rowData: any;
  isForClinic: boolean;
  updateslot: any;
}) => {
  const [expand, setExpand] = useState(false);
  return rowData.type == 'SLOT' ? (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[commonStyles.font16, commonStyles.weight400]}>
            {rowData.name}{' '}
            {!!rowData.age &&
              `(${rowData.age} y${
                !!rowData.gender ? `, ${rowData.gender} ` : ' '
              })`}
          </Text>
          {expand ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setExpand(false);
                }}>
                <DownArrow name="keyboard-arrow-up" color="black" size={30} />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setExpand(true);
                }}>
                <DownArrow name="keyboard-arrow-down" color="black" size={30} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={commonStyles.caption}>{rowData.description}</Text>

        {expand ? (
          <>
            {rowData.phone && (
              <Text style={commonStyles.caption}>Phone: {rowData.phone}</Text>
            )}
            {rowData.patient_address && (
              <Text style={commonStyles.caption}>
                Address: {rowData.patient_address}
              </Text>
            )}
          </>
        ) : null}

        {!isForClinic && (
          <Text style={commonStyles.caption}>{rowData.clinic}</Text>
        )}
      </View>
      <View style={{paddingRight: 20}}>
        <Status
          id={rowData.id}
          status={rowData.status}
          updateslot={updateslot}
        />
      </View>
    </View>
  ) : (
    <View>
      <Text style={commonStyles.font20}>{rowData.name}</Text>
    </View>
  );
};

export default TimeLineEntry;
