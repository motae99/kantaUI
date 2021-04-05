/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SECTIONS_TOP_MARGIN} from '../detail';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');
const Catering = ({provider}) => {
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('eventProviders')
      .doc(`${provider.key}`)
      .collection('catering')
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
        <Text>Catering Loading</Text>
      </View>
    );
  }

  const Header = () => {
    return (
      <View style={{height: 60, width, backgroundColor: 'gray', flex: 1}}>
        <Text>Catering </Text>
      </View>
    );
  };

  const CateringCard = ({item}) => {
    return (
      <View
        style={{
          width: width / 2.5,
          height: width / 1.7,
          backgroundColor: 'white',
          marginHorizontal: 7,
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            position: 'absolute',
            top: -10,
            right: -10,
            backgroundColor: '#219CAB',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}>
          <Entypo name="check" size={18} color={'white'} />
        </View>
        <View style={{flex: 4}}>
          <FastImage
            style={[
              {
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 10,
              },
            ]}
            source={{
              uri: provider.files[0].uri,
              priority: FastImage.priority.normal,
              cashe: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={{flex: 3}}>
          <Text numberOfLines={1} style={{paddingTop: 1}}>
            {item.name}
          </Text>
          <Text numberOfLines={2} style={{paddingTop: 3}}>
            {item.description}
          </Text>
          <View styles={{alignItems: 'flex-end'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{paddingTop: 1}}>$ {item.price}</Text>
              <TouchableOpacity
                onPress={() => console.log('pressed')}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 5,
                  backgroundColor: '#AD56E5',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="plus" size={18} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{marginTop: SECTIONS_TOP_MARGIN}}>
      <View
        style={{
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Catering</Text>
        <AntDesign name="right" size={18} color={'black'} />
      </View>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={<Header />}
        // contentContainerStyle={{
        //   alignItems: 'center',
        //   justifyContent: 'center',
        // }}
        renderItem={({item, index}) => {
          return <CateringCard item={item} />;
        }}
      />
    </View>
  );
};
export default Catering;
