import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {cardWidth, cardHeigh, fullBorderRadius} from './FoldingStyle';
import {Sizing, Outlines, Colors, Typography} from 'styles';

const {interpolate, Extrapolate} = Animated;

const styles = StyleSheet.create({
  image: {
    width: cardWidth,
    alignSelf: 'center',
    borderRadius: fullBorderRadius,
    // borderTopRightRadius: fullBorderRadius,
  },
  requestsText: {
    color: Colors.neutral.white,
    ...Typography.header.x10,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

const Base = ({toggle, animation, item}) => {
  const navigation = useNavigation();

  const baseHieght = interpolate(animation, {
    inputRange: [0, 0.3, 0.4],
    outputRange: [cardHeigh, cardHeigh + 12, cardHeigh],
    extrapolate: Extrapolate.CLAMP,
  });
  const borderRadius = interpolate(animation, {
    inputRange: [0, 0.4],
    outputRange: [fullBorderRadius, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('PhotoDetail', {
          item: item,
        })
      }>
      {/* <SharedElement
        id={`image.${item.files[0].uri}`}
        style={[
          {
            height: cardHeigh,
            width: cardWidth,
          },
        ]}> */}
      <Animated.Image
        style={[
          styles.image,
          {
            height: baseHieght,
            borderBottomLeftRadius: fullBorderRadius,
            borderBottomRightRadius: fullBorderRadius,
            // borderRadius,
          },
        ]}
        resizeMode="cover"
        source={{uri: item.files[0].uri}}
      />
      {/* </SharedElement> */}

      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'black']}
        style={{
          height: cardHeigh / 3,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderBottomRightRadius: fullBorderRadius,
          borderBottomLeftRadius: fullBorderRadius,
        }}
      />
      <Text style={styles.requestsText}>
        {item.requests ? item.requests : 0} people have sent a request
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default Base;
