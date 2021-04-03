import React, {useRef, useContext, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Heart = ({setSelectedTime, selectedTime}) => {
  const handleViewRef = useRef(null);

  const bounce = () => {
    handleViewRef.current.bounceIn(500).then((endState) => {
      if (selectedTime === 'night') {
        setSelectedTime('evening');
      } else {
        setSelectedTime('night');
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => bounce()}>
      <Animatable.View ref={handleViewRef} useNativeDriver={true}>
        <MaterialCommunityIcons
          name="weather-night"
          size={18}
          color={selectedTime === 'night' ? '#219CAB' : 'black'}
        />
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default Heart;
