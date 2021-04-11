/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Night from 'events/components/night';
import Evening from 'events/components/evening';
import * as Animatable from 'react-native-animatable';

import moment from 'moment';
import {EventContext} from 'context/eventsContext';

import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate} = Animated;

const DateTime = ({dateAction, scrollY, inputRange, yInputRange, item}) => {
  const {date, setDate, selectedTime} = React.useContext(EventContext);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    // console.log('pressed');
    showMode('date');
  };

  if (!dateAction) {
    return null;
  }
  return (
    <Animatable.View
      animation={'fadeInUp'}
      delay={1600}
      duration={300}
      useNativeDriver={true}>
      <Animated.View
        style={[
          styles.dateAction,
          {
            paddingHorizontal: 18,
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            bottom: 0,
            left: 0,
            right: 0,
            marginHorizontal: interpolate(scrollY, {
              inputRange,
              outputRange: [0, 0, 0, 18, 18],
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
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableNativeFeedback onPress={showDatepicker}>
              <Entypo
                name="calendar"
                size={24}
                color="black"
                style={{marginHorizontal: 10}}
              />
            </TouchableNativeFeedback>
            <View
              style={
                {
                  // alignItems: 'center',
                }
              }>
              <Animated.Text
                style={{
                  opacity: interpolate(scrollY, {
                    inputRange,
                    outputRange: [0, 0, 0, 1, 1],
                    extrapolate: Extrapolate.CLAMP,
                  }),
                }}>
                {moment(date).format('MM/DD/YYYY')}
              </Animated.Text>

              <Animated.Text
                style={{
                  opacity: interpolate(scrollY, {
                    inputRange,
                    outputRange: [0, 0, 0, 1, 1],
                    extrapolate: Extrapolate.CLAMP,
                  }),
                }}>
                {selectedTime === 'evening' ? '2 PM - 7 PM' : '8 PM - 11 PM'}
              </Animated.Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Animated.View
            style={[
              styles.icon,
              {
                transform: [
                  {
                    translateX: interpolate(scrollY, {
                      inputRange,
                      outputRange: [120, 120, 120, 0, 0],
                      extrapolate: Extrapolate.CLAMP,
                    }),
                  },
                ],
              },
            ]}>
            {selectedTime === 'night' ? <Night /> : <Evening />}
          </Animated.View>
          <Animated.View
            style={[
              styles.icon,
              {
                opacity: interpolate(scrollY, {
                  inputRange,
                  outputRange: [0, 0, 0, 1, 1],
                  extrapolate: Extrapolate.CLAMP,
                }),
              },
            ]}>
            {selectedTime === 'night' ? <Evening /> : <Night />}
          </Animated.View>
          <Animated.View
            style={[
              styles.icon,

              {
                opacity: interpolate(scrollY, {
                  inputRange,
                  outputRange: [0, 0, 0, 0, 1],
                  extrapolate: Extrapolate.CLAMP,
                }),
              },
            ]}>
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text>
              {selectedTime === 'evening' ? item.evening : item.night}
            </Text>
          </Animated.View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Animated.View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  dateAction: {
    height: 80,
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

export default DateTime;
