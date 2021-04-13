/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SECTIONS_TOP_MARGIN} from 'events/detail';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import FastImage from 'react-native-fast-image';
import {EventContext} from 'context/eventsContext';

const {width, height} = Dimensions.get('window');
const Photography = ({provider, selectedServices, setselectedServices}) => {
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('eventProviders')
      .doc(`${provider.key}`)
      .collection('photography')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const serviceOptions = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (serviceOptions && serviceOptions.length > 0) {
            setOptions(serviceOptions);
            setLoading(false);
          }
        }
      });

    return () => subscriber();
  }, [provider]);

  if (loading) {
    return (
      <View>
        <Text>photography Loading</Text>
      </View>
    );
  }

  const select = (item) => {
    setSelected(item.key);
    let newArr = [...selectedServices];

    const i = newArr.findIndex((_item) => _item.name === 'photography');

    if (i > -1) {
      newArr[i].data = item;
    }
    // (2)
    else {
      newArr.push({name: 'photography', data: item});
    }

    setselectedServices(newArr);
    // console.log(selectedServices);
  };

  const PhotographyCard = ({item}) => {
    return (
      <View
        style={{
          width: width - 45,
          height: width / 3,
          // backgroundColor: 'white',
          marginHorizontal: 7,
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
        }}>
        <View style={{flex: 3}}>
          <Text numberOfLines={2} style={{paddingTop: 3}}>
            {item.description}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>${item.price}</Text>
            <TouchableOpacity
              onPress={() => select(item)}
              style={{
                height: 40,
                width: 100,
                borderRadius: 20,
                backgroundColor: selected ? 'gray' : 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#219CAB'}}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
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
          <Feather
            name="camera"
            size={30}
            color={selected ? '#219CAB' : 'black'}
            style={{marginRight: 15}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Photography</Text>
        </View>
        <AntDesign name="right" size={18} color={'black'} />
      </View>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return <PhotographyCard item={item} />;
        }}
      />
    </View>
  );
};
export default Photography;
