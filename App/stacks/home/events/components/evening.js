import React, {useRef} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Heart = ({setSelectedTime, selectedTime}) => {
  const handleViewRef = useRef(null);

  const bounce = () => {
    handleViewRef.current.bounceIn(400).then((endState) => {
      if (selectedTime === 'evening') {
        setSelectedTime('night');
      } else {
        setSelectedTime('evening');
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => bounce()}>
      <Animatable.View ref={handleViewRef} useNativeDriver={true}>
        <Fontisto
          name="day-sunny"
          size={18}
          color={selectedTime === 'evening' ? '#219CAB' : 'black'}
        />
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default Heart;
