/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {interpolateColor} from 'react-native-redash/lib/module/v1';
import AnimateNumber from 'react-native-countup';

import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate} = Animated;

const BookButton = ({
  paymentAction,
  scrollY,
  inputRange,
  paymentBottomInputRange,
  cost,
  bookNow,
}) => {
  if (!paymentAction) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.paymentAction,
        {
          // paddingHorizontal: 18,
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          left: 0,
          right: 0,
          // bottom: 0,
          bottom: interpolate(scrollY, {
            inputRange: paymentBottomInputRange,
            outputRange: [-100, -100, 0],
            extrapolate: Extrapolate.CLAMP,
          }),
          paddingHorizontal: interpolate(scrollY, {
            inputRange,
            outputRange: [18, 18, 18, 0, 0],
            extrapolate: Extrapolate.CLAMP,
          }),

          height: interpolate(scrollY, {
            inputRange,
            outputRange: [90, 90, 90, 60, 60],
            extrapolate: Extrapolate.CLAMP,
          }),
          marginHorizontal: interpolate(scrollY, {
            inputRange,
            outputRange: [0, 0, 0, 40, 40],
            extrapolate: Extrapolate.CLAMP,
          }),
          borderRadius: interpolate(scrollY, {
            inputRange,
            outputRange: [0, 0, 0, 10, 10],
            extrapolate: Extrapolate.CLAMP,
          }),
          transform: [
            {
              translateY: interpolate(scrollY, {
                inputRange,
                outputRange: [0, 0, 0, 0, -1],
                // extrapolate: Extrapolate.CLAMP,
              }),
            },
          ],
        },
      ]}>
      {/* <Entypo name="check" size={18} color={'black'} /> */}
      {/* <Animated.View
        style={{
          // flex: 1,
          // width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          // zIndex: 10,
          // transform: [
          //   {
          //     translateX: interpolate(scrollY, {
          //       inputRange,
          //       outputRange: [0, 0, 0, 100, 100],
          //       // extrapolate: Extrapolate.CLAMP,
          //     }),
          //   },
          // ],

        }}>

      </Animated.View> */}
      <View />
      <Animated.View
        style={{
          position: 'absolute',
          left: 20,
          bottom: paymentAction.height / 3,
          fontWeight: 'bold',
          fontSize: 22,
          zIndex: 10,
          opacity: interpolate(scrollY, {
            inputRange,
            outputRange: [1, 1, 1, 0, 0],
          }),
        }}>
        <AnimateNumber
          style={{fontSize: 22, fontWeight: 'bold'}}
          initial={cost.intial}
          value={cost.total}
          // countBy={1}
          formatter={(val) => {
            return '$ ' + parseFloat(val).toFixed(2);
          }}
        />
      </Animated.View>
      <TouchableNativeFeedback onPress={bookNow}>
        <Animated.View
          style={{
            // flex: 2,

            width: interpolate(scrollY, {
              inputRange,
              outputRange: [200, 200, 200, 320, 320],
              extrapolate: Extrapolate.CLAMP,
            }),
            height: 60,
            borderRadius: 10,
            backgroundColor: '#219CAB',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
            book
          </Text>
        </Animated.View>
      </TouchableNativeFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  paymentAction: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookButton;
