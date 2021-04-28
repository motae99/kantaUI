/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  useValues,
  withTimingTransition,
} from 'react-native-redash/lib/module/v1';

import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate, useCode, greaterThan, set, block} = Animated;

const Header = ({scrollY}) => {
  // const top = interpolate(scrollY, {
  //   inputRange: [0, 100],
  //   outputRange: [0, -100],
  //   extrapolate: Extrapolate.CLAMP,
  // });

  return (
    <Animated.View
      style={{
        width: '100%',
        height: 200,
        backgroundColor: 'red',
        zIndex: 10,
        position: 'absulote',
        // top,
        left: 0,
        right: 0,
      }}
    />
  );
};

export default Header;
