/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {
  width,
  height,
  HEADER_IMAGE_HEIGHT,
  MIN_HEADER_HEIGHT,
} from 'events/detail';

import HeartButton from 'events/components/heart';
import ShareButton from 'events/components/share';

import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate} = Animated;

const PADDING = 18;

const Header = ({route, animatedValue, item, list}) => {
  const {goBack} = useNavigation();

  const opacity = interpolate(animatedValue, {
    inputRange: [0, HEADER_IMAGE_HEIGHT, HEADER_IMAGE_HEIGHT + 40],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateX = interpolate(animatedValue, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-28, PADDING],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateY = interpolate(animatedValue, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [HEADER_IMAGE_HEIGHT - 36, -4],
    extrapolate: Extrapolate.CLAMP,
  });

  const fadeIn = {
    0: {
      opacity: 0,
      translateY: 100,
    },
    1: {
      opacity: 1,
      translateY: 0,
    },
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: MIN_HEADER_HEIGHT,
          alignItems: 'flex-end',
          paddingHorizontal: 18,
          paddingBottom: MIN_HEADER_HEIGHT / 5,
        }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity,
            backgroundColor: 'white',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            list.current.scrollToIndex({
              animated: true,
              index: 0,
            });
            setTimeout(() => {
              goBack();
            }, 100);
          }}>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="arrow-back" size={20} color="#2B3449" />
          </View>
        </TouchableOpacity>

        <Animated.View
          style={{flex: 1, transform: [{translateX}, {translateY}]}}>
          <Animatable.View
            animation={fadeIn}
            delay={300}
            duration={400}
            useNativeDriver={true}>
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 18,
                fontWeight: '800',
              }}>
              {item.name}
            </Text>
          </Animatable.View>
        </Animated.View>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
            <HeartButton item={item} />
          </View>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ShareButton item={item} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
