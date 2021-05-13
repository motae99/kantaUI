import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {sWidth, sHeight, fullBorderRadius} from './FoldingStyle';
import {Sizing, Outlines, Colors, Typography} from 'styles';

const Second = ({book}) => {
  return (
    <View
      style={{
        width: sWidth,
        height: sHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.neutral.s100,
        borderRadius: fullBorderRadius,
      }}>
      <TouchableOpacity
        style={{
          height: sHeight / 2,
          width: sWidth * 0.9,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary.brand,
          borderRadius: fullBorderRadius,
        }}
        onPress={() => book()}>
        <Text
          style={{
            color: Colors.neutral.white,
            ...Typography.header.x30,
          }}>
          REQUEST
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Second;
