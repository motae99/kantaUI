/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useContext} from 'react';
import {
  Text,
  View,
  Dimensions,
  Animated,
  Pressable,
  Alert,
  Modal,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {EventContext} from 'context/eventsContext';
const {width, height} = Dimensions.get('window');

const DateTimePick = ({scrollY}) => {
  const {date, selectedTime, setSelectedTime} = useContext(EventContext);
  const navigation = useNavigation();
  const headerHeight = height / 7;

  const scrollYClamped = Animated.diffClamp(scrollY, 0, height);

  const translateYDate = scrollYClamped.interpolate({
    inputRange: [headerHeight / 2, headerHeight, height * 0.8, height * 0.85],
    outputRange: [
      0,
      headerHeight / 2 + 10,
      headerHeight / 2 + 10,
      -headerHeight,
    ],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View
        style={{
          backgroundColor: 'white',
          height: headerHeight / 2,
          width,
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          transform: [{translateY: translateYDate}],
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            borderRightColor: 'gray',
            borderRightWidth: 0.8,
            flex: 2,
          }}
          onPress={() => navigation.navigate('Calendar')}>
          <Ionicons name="calendar-outline" size={25} color="#219CAB" />
          <Text style={{paddingHorizontal: 10}}>
            {moment(date).format('YYYY-MM-DD')}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            selectedTime === 'evening'
              ? setSelectedTime('night')
              : setSelectedTime('evening');
          }}
          // onPress={() => navigation.navigate('Calendar')}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="time-outline" size={25} color="#219CAB" />
          <Text style={{paddingHorizontal: 10}}>{selectedTime}</Text>
        </Pressable>
      </Animated.View>
    </>
  );
};

export default DateTimePick;
