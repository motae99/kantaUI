/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useContext} from 'react';
import {Text, View, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {EventContext} from 'context/eventsContext';
import {Calendar, CalendarList} from 'react-native-calendars';
const ModalCalender = () => {
  const {date, selectedTime, setDate, setSelectedTime} = useContext(
    EventContext,
  );
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
      }}>
      <Pressable
        style={{
          marginTop: 22,
          marginHorizontal: 20,
          borderRadius: 5,
          padding: 10,
          elevation: 2,
          backgroundColor: '#2196F3',
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Hide Modal
        </Text>
      </Pressable>

      <CalendarList
        // Specify style for calendar container element. Default = {}
        style={{
          // borderWidth: 1,
          borderColor: 'gray',
          // height: 350,
        }}
        onDayPress={(day) => {
          console.log('selected day', day);
          setDate(day.timestamp);
          navigation.goBack();
        }}
        // selected={moment(date).format('YYYY-MM-DD')}
        selected={'2021-04-30'}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
          // backgroundColor: '#ffffff',
          // calendarBackground: '#ffffff',
          // textSectionTitleColor: '#b6c1cd',
          // textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          // todayTextColor: '#00adf5',
          // dayTextColor: '#2d4150',
          // textDisabledColor: '#d9e1e8',
          // dotColor: '#00adf5',
          // selectedDotColor: '#ffffff',
          // arrowColor: 'orange',
          // disabledArrowColor: '#d9e1e8',
          // monthTextColor: 'blue',
          // indicatorColor: 'blue',
          // textDayFontFamily: 'monospace',
          // textMonthFontFamily: 'monospace',
          // textDayHeaderFontFamily: 'monospace',
          // textDayFontWeight: '300',
          // textMonthFontWeight: 'bold',
          // textDayHeaderFontWeight: '300',
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
};
export default ModalCalender;
