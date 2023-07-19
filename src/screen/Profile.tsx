import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import {useSelector, useDispatch} from 'react-redux';
import {updateappstate} from './../redux/reducer/Authreducer';



export default function Profile() {
  const dispatch = useDispatch();

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 2, marginTop: 30}}>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Dr. Nirmala Azelea
            </Text>
          </View>
          <View>
            <Text style={{color: 'black', marginTop: 5}}>Heart Specialist</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black'}}>consultation Time:</Text>
            <Text style={{color: 'black', marginLeft: 10}}> 15 Min</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black'}}>consultation Fees:</Text>

            <Text style={{color: 'black', marginLeft: 10}}> 500 Rs.</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{justifyContent: 'center', flex: 1}}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginTop: 10,
              }}
              source={require('./../asset/image/profile.png')}
            />
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'column', flex: 8}}>
        <View style={{flex: textShown ? 2.5 : 1.5, marginHorizontal: 20}}>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              About
            </Text>
          </View>
          <View>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 2}
              style={{lineHeight: 21, color: 'black'}}>
              {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
            </Text>

            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 21,
                  marginTop: 4,
                  color: 'black',
                  fontWeight: '700',
                }}>
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={{flex: textShown ? 5 : 6, marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Availablity
            </Text>
            <Pressable
              style={{flex: 1, alignItems: 'flex-end', marginRight: 30}}>
              <Icon name="plus" size={30} color={Color.primary} />
            </Pressable>
          </View>

          <View style={{flex: 10}}>
            {[0, 1, 2].map(i => {
              return (
                <View style={{flexDirection: 'row',marginTop:10,backgroundColor:Color.primary,borderRadius:5}}>
                  <View style={{flex:1,alignItems:"flex-start"}}>
                    <Text style={{textAlign:"left",padding:5,color:"black"}}>Clinic 1</Text>
                    <Text style={{padding:5,color:"black"}}>Slots: 10</Text>
                  </View>
                  <View style={{flex:2,alignItems:"center"}}>
                    <Text style={{padding:5,color:"black"}}>Mon-Fri</Text>
                  </View>
                  <View style={{flex:1,alignItems:"center"}}>
                    <Text style={{padding:5,color:"black"}}>05:00 PM</Text>
                    <Text style={{padding:5,color:"black"}}>08:00 PM</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={{flex:1,alignItems:"center"}}>

<TouchableOpacity style={{backgroundColor:Color.primary,borderRadius:5}}
onPress={()=>{

  dispatch(
    updateappstate({
      islogin: false,
      isdoctor:false
    }),
  );
}}
>

  <Text style={{color:"black",fontSize:20,padding:5}}>Logout</Text>
</TouchableOpacity>
</View>
        </View>
      </View>
    </View>
  );
}
