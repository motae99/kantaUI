import React, {useRef, useContext, useState} from 'react';
import {View, Text, FlatList, Dimensions, Image} from 'react-native';
import {SECTIONS_TOP_MARGIN} from 'events/detail';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import ParkingArea from 'assets/svg/parkingArea';
const {width, height} = Dimensions.get('window');

const Facilities = ({provider}) => {
  if (!provider.facilities) {
    return null;
  }

  const facilities = provider.facilities;

  const PhotographyCard = ({item}) => {
    return (
      <View
        style={{
          width: width / 5,
          height: width / 4.5,
          backgroundColor: 'white',
          marginHorizontal: 7,
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          {item === 'parkingArea' ? <ParkingArea /> : null}
          {item === 'wifi' ? (
            <Image
              source={require('img/wifi.png')}
              style={{
                width: 40,
                height: 30,
                resizeMode: 'cover',
              }}
            />
          ) : null}
        </View>
        <Text
          style={{
            flex: 1,
            alignSelf: 'center',
          }}>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={{marginTop: SECTIONS_TOP_MARGIN}}>
      <View
        style={{
          // height: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Facilities</Text>
        </View>
        <AntDesign name="right" size={18} color={'black'} />
      </View>
      <FlatList
        data={facilities}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return <PhotographyCard item={item} />;
        }}
      />
    </View>
  );
};
export default Facilities;
