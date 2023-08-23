import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../asset/Color';

const SwipeDeleteButton = ({
  onPress,
  item,
}: {
  onPress: (i: any) => void;
  item: any;
}) => {
  return (
    <View style={style.rowBack}>
      <View style={[style.backRightBtn, style.backRightBtnRight]}>
        <TouchableOpacity
          style={style.btn}
          onPress={() => {
            onPress(item);
          }}>
          <AntDesign name="delete" color={Color.red} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SwipeDeleteButton;

const style = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },

  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
