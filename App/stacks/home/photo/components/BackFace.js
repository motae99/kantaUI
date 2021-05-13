/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import moment from 'moment';

import {cardWidth, cardHeigh, fullBorderRadius} from './FoldingStyle';
import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate} = Animated;

const styles = StyleSheet.create({
  selectServiceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.neutral.s300,
    borderStyle: 'dashed',
    backgroundColor: Colors.neutral.s100,
  },
  service: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Sizing.x20,
    height: '70%',
    borderRadius: fullBorderRadius,
    paddingVertical: 10,
  },
  iconButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  serviceText: {flex: 4, justifyContent: 'space-evenly', paddingHorizontal: 5},
  serviceSelectionText: {fontWeight: 'bold', fontSize: 16},
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: '100%',
  },
});
const BackFace = ({
  animation,
  item,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  selected,
  setSelected,
}) => {
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [show, setShow] = useState(false);

  const onChangeFrom = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setFromTime(selectedDate);
    setShowFrom(false);
  };

  const onChangeTo = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setToTime(selectedDate);
    setShowTo(false);
  };

  const borderRadius = interpolate(animation, {
    inputRange: [0, 0.4],
    outputRange: [fullBorderRadius, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    // <View>
    <>
      <Animated.View
        style={{
          backgroundColor: 'white',
          width: cardWidth,
          height: cardHeigh,
          borderRadius,
          overflow: 'hidden',
        }}>
        <View style={styles.selectServiceContainer}>
          <View
            style={[
              styles.service,
              {
                borderWidth: selected === item.inDoor ? 2 : 0,
                borderColor:
                  selected === item.inDoor
                    ? Colors.primary.brand
                    : Colors.neutral.black,
              },
            ]}>
            <TouchableWithoutFeedback
              style={styles.touchable}
              onPress={() => setSelected(item.inDoor)}>
              <Text>Indoor</Text>
              <Text
                style={{
                  ...Typography.header.x20,
                  fontWeight: 'bold',
                  color:
                    selected === item.inDoor
                      ? Colors.primary.brand
                      : Colors.neutral.black,
                }}>
                {item.inDoor}
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={[
              styles.service,
              {
                borderWidth: selected === item.outDoor ? 2 : 0,
                borderColor:
                  selected === item.outDoor
                    ? Colors.primary.brand
                    : Colors.neutral.black,
              },
            ]}>
            <TouchableWithoutFeedback
              style={styles.touchable}
              onPress={() => setSelected(item.outDoor)}>
              <Text>outDoor</Text>
              <Text
                style={{
                  ...Typography.header.x20,
                  fontWeight: 'bold',
                  color:
                    selected === item.outDoor
                      ? Colors.primary.brand
                      : Colors.neutral.black,
                }}>
                {item.outDoor}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.selectServiceContainer}>
          <View style={styles.service}>
            <Ionicons
              name="ios-time-outline"
              size={24}
              color={Colors.primary.brand}
              style={styles.iconButton}
            />
            <TouchableWithoutFeedback
              style={styles.serviceText}
              onPress={() => {
                // setShowTo(false);
                setShowFrom(true);
              }}>
              <Text>From</Text>
              <Text style={styles.serviceSelectionText}>
                {moment(fromTime).format('HH:mm A')}
              </Text>
            </TouchableWithoutFeedback>

            <Ionicons
              name="chevron-down"
              size={24}
              color={Colors.neutral.black}
              style={styles.iconButton}
            />
          </View>

          <View style={styles.service}>
            <Ionicons
              name="ios-time-outline"
              size={24}
              color={Colors.secondary.brand}
              style={styles.iconButton}
            />
            <TouchableWithoutFeedback
              style={styles.serviceText}
              onPress={() => {
                // setShowFrom(false);
                setShowTo(true);
              }}>
              <Text>From</Text>
              <Text style={styles.serviceSelectionText}>
                {moment(toTime).format('HH:mm A')}
              </Text>
            </TouchableWithoutFeedback>

            <Ionicons
              name="chevron-down"
              size={24}
              color={Colors.neutral.black}
              style={styles.iconButton}
            />
          </View>
        </View>
        {showFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromTime}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={onChangeFrom}
          />
        )}

        {showTo && (
          <DateTimePicker
            testID="dateTimePicker"
            value={toTime}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={onChangeTo}
          />
        )}
      </Animated.View>
    </>
    // </View>
  );
};

export default BackFace;
