/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useRef, useContext} from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate} = Animated;
import {HEADER_IMAGE_HEIGHT, fadeIn, SECTIONS_TOP_MARGIN} from 'events/detail';

const BasicInfo = ({item, scrollY}) => {
  const opacity = interpolate(scrollY, {
    inputRange: [0, HEADER_IMAGE_HEIGHT * 0.7],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animatable.View
      animation={fadeIn}
      delay={700}
      duration={400}
      useNativeDriver={true}>
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          opacity,
          marginTop: SECTIONS_TOP_MARGIN,
          marginBottom: 16,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="md-location-outline" size={18} color="#2B3449" />
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 10,
              fontWeight: '400',
              color: 'rgba(43,52,73,1)',
              paddingLeft: 4,
            }}>
            {item.address}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 10,
              fontWeight: '400',
              color: 'rgba(43,52,73,1)',
              marginRight: 4,
            }}>
            {item.ratingSum
              ? Math.round(item.ratingSum / item.totalRating, 1)
              : 0}
          </Text>
          <FontAwesome name="star" size={18} color="#219CAB" />
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 10,
              fontWeight: '400',
              color: 'rgba(43,52,73,1)',
              paddingLeft: 4,
            }}>
            ({item.totalRating ? item.totalRating : 'No'} review)
          </Text>
        </View>
      </Animated.View>
    </Animatable.View>
  );
};

export default BasicInfo;
