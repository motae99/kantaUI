/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalenderPicker from './tabHeaderPicker';
import Search from 'assets/svg/Search';
const {width, height} = Dimensions.get('window');
const Header = ({scrollY}) => {
  const navigation = useNavigation();
  const headerHeight = height / 7;

  const scrollYClamped = Animated.diffClamp(scrollY, 0, height);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight, height * 0.8, height * 0.85],
    outputRange: [
      0,
      -headerHeight / 2 + 10,
      -headerHeight / 2 + 10,
      -headerHeight,
    ],
    extrapolate: 'clamp',
  });

  const translateYIcon = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, headerHeight / 2 - 10],
    extrapolate: 'clamp',
  });

  const paddingHorizontal = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [55, 12],
    extrapolate: 'clamp',
  });

  const opacity = scrollYClamped.interpolate({
    inputRange: [0, headerHeight, height / 2],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const opacityOpp = scrollYClamped.interpolate({
    inputRange: [0, headerHeight - 10, headerHeight],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const left = scrollYClamped.interpolate({
    inputRange: [0, headerHeight - 10, height / 2 + 5],
    outputRange: [-100, -100, 15],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View
        style={{
          backgroundColor: '#219CAB',
          height: headerHeight,
          width,
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 2,
          transform: [{translateY}],
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 15,
            left: 15,
            opacity,
            transform: [{translateY: translateYIcon}],
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <Ionicons name="menu" size={25} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: 15,
            left,
            opacity: opacityOpp,
            transform: [{translateY: translateYIcon}],
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: 15,
            right: 15,
            transform: [{translateY: translateYIcon}],
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('pressed');
            }}>
            <Ionicons
              name="notifications-off-circle-outline"
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            paddingVertical: 12,
            backgroundColor: 'white',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            paddingHorizontal,
            marginTop: headerHeight / 2,
          }}>
          <Search />
          <Text
            style={{
              color: '#8B8B8B',
              fontSize: 17,
              lineHeight: 22,
              marginLeft: 8,
            }}>
            Search for messages or users
          </Text>
        </Animated.View>
      </Animated.View>

      <CalenderPicker {...{scrollY}} />
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    paddingHorizontal: 10,
    // backgroundColor: '#1c1c1c',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversation: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  searchText: {
    color: '#8B8B8B',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
  },
  searchBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  touchable: {},
});
export default Header;
