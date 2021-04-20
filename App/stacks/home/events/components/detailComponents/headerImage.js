/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  width,
  height,
  HEADER_IMAGE_HEIGHT,
  MIN_HEADER_HEIGHT,
} from 'events/components/constants';

import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate} = Animated;

import FastImage from 'react-native-fast-image';

const Header = ({route, animatedValue, list}) => {
  const {selectedItem, selectedImageIndex} = route.params;

  const [current, setCurrent] = React.useState(selectedImageIndex);
  // const list = React.useRef();
  const onViewRef = React.useRef(({viewableItems, changed}) => {
    setCurrent(viewableItems[0]?.index + 1);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const hHeight = interpolate(animatedValue, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [HEADER_IMAGE_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const radius = interpolate(animatedValue, {
    inputRange: [0, HEADER_IMAGE_HEIGHT / 2],
    outputRange: [25, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = interpolate(animatedValue, {
    inputRange: [0, HEADER_IMAGE_HEIGHT / 2, HEADER_IMAGE_HEIGHT],
    outputRange: [1, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={{
        width,
        height: hHeight,
        borderBottomRightRadius: radius,
        borderBottomLeftRadius: radius,
        opacity,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}>
      <FlatList
        ref={list}
        horizontal
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => selectedItem.key + item.uri}
        data={selectedItem.files}
        // keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({item, index}) => {
          return (
            <View>
              <SharedElement
                id={`item.${selectedItem.key}.image.${item.uri}`}
                style={{
                  width,
                  height: HEADER_IMAGE_HEIGHT,
                }}>
                <FastImage
                  style={[
                    {
                      width,
                      height: HEADER_IMAGE_HEIGHT,
                      resizeMode: 'cover',
                      borderBottomRightRadius: 25,
                      borderBottomLeftRadius: 25,
                    },
                  ]}
                  source={{
                    uri: item.uri,
                    priority: FastImage.priority.normal,
                    cashe: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </SharedElement>
            </View>
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 18,
          right: 18,
          width: 50,
          height: 24,
          backgroundColor: 'rgba(34,40,42,.7)',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>
          {current}/{selectedItem.files.length}
        </Text>
      </View>
    </Animated.View>
  );
};

Header.sharedElements = (route, otherRoute, showing) => {
  const {selectedItem} = route.params;
  return selectedItem.files.map(
    (item, index) => `item.${selectedItem.key}.image.${item.uri}`,
  );
};
export default Header;
