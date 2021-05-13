import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import RequestButton from './RequestButton';
import {perspective, sWidth, sHeight, fullBorderRadius} from './FoldingStyle';
import {Sizing, Outlines, Colors, Typography} from 'styles';

const {concat, interpolate, Extrapolate} = Animated;

const styles = StyleSheet.create({
  card: {
    width: sWidth,
    height: sHeight,
  },
});

export default function ({animation, book}) {
  const borderRadius = interpolate(animation, {
    inputRange: [0, 0.4],
    outputRange: [fullBorderRadius, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const borderRadiusBT = interpolate(animation, {
    inputRange: [0, 0.4, 1],
    outputRange: [fullBorderRadius, 0, fullBorderRadius],
    extrapolate: Extrapolate.CLAMP,
  });

  const NrotateXAsDegBack2 = interpolate(animation, {
    inputRange: [0.7, 1],
    outputRange: [0, -180],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateX2 = concat(NrotateXAsDegBack2, 'deg');

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        height: sHeight,
        width: sWidth,
      }}>
      {/* Back face */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'white',
          transform: [
            {perspective},
            {translateY: sHeight / 2},
            {rotateX: rotateX2},
            {translateY: -sHeight / 2},
            {rotateX: '180deg'},
          ],
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          borderBottomLeftRadius: borderRadiusBT,
          borderBottomRightRadius: borderRadiusBT,
        }}>
        <RequestButton {...{book}} />
      </Animated.View>

      {/* front face */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backfaceVisibility: 'hidden',
          backgroundColor: Colors.neutral.s100,
          transform: [
            // {rotateX: '180deg'},
            {perspective},
            {translateY: sHeight / 2},
            {rotateX: rotateX2},
            {translateY: -sHeight / 2},
          ],
          borderRadius,
        }}
      />
    </Animated.View>
  );
}
