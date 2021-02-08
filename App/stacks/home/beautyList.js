/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SharedElement} from 'react-navigation-shared-element';

const SPACING = 10;
const {width, height} = Dimensions.get('window');
const beautyList = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <View style={{flex: 1}}>
      <SharedElement
        id={`item.${item.key}.image`}
        style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={{uri: item.poster}}
          style={[StyleSheet.absoluteFillObject]}
        />
      </SharedElement>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: '#000', opacity: 0.3},
        ]}
      />
      <AntDesign
        name="close"
        size={28}
        color={'#333'}
        style={{
          padding: SPACING,
          top: SPACING,
          right: SPACING,
          position: 'absolute',
          zIndex: 2,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SharedElement
        id="general.bg"
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{translateY: height}],
          },
        ]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: '#fff',
              transform: [{translateY: -height * 0.3}],
              padding: SPACING * 2,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          ]}>
          <Text style={{fontWeight: '900', fontSize: 28}}>{item.title}</Text>
          <Text style={{fontWeight: '500', fontSize: 16}}>{item.location}</Text>
          <Text style={{fontSize: 12}}>{item.date}</Text>
        </View>
      </SharedElement>
    </View>
  );
};
beautyList.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return [
    {
      id: `item.${item.key}.image`,
    },
    {
      id: 'general.bg',
    },
  ];
};
export default beautyList;
