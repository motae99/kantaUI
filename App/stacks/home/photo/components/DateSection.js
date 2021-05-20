import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';
import Animated from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {fWidth, fHeight, fullBorderRadius} from './FoldingStyle';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import moment from 'moment';
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
  serviceSelectionText: {...Typography.header.x10},
});

const DateSection = ({animation, date, setDate, selected}) => {
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
    showMode('date');
  };

  const borderRadius = interpolate(animation, {
    inputRange: [0, 0.4],
    outputRange: [fullBorderRadius, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={[styles.selectServiceContainer, {borderRadius}]}>
      <View style={[styles.service]}>
        <TouchableWithoutFeedback
          onPress={showDatepicker}
          style={styles.iconButton}>
          <Ionicons
            name={'calendar-outline'}
            size={24}
            color={Colors.primary.brand}
            style={styles.iconButton}
          />
        </TouchableWithoutFeedback>
        <View style={styles.serviceText}>
          <Text>Date</Text>
          <Text style={{...Typography.header.x20, fontWeight: 'bold'}}>
            {moment(date).format('DD/MM')}
          </Text>
        </View>
      </View>

      <View style={styles.service}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <AntDesign name="pay-circle-o1" size={24} color="#01c5c4" />
        </View>
        <View style={{flex: 4, justifyContent: 'space-between'}}>
          <Text>Price</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>${selected}</Text>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : ''}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Animated.View>
  );
};

export default DateSection;
