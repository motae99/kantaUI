import React, {useRef} from 'react';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

import * as Animatable from 'react-native-animatable';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {EventContext} from 'context/eventsContext';

const Heart = () => {
  const {selectedTime, setSelectedTime} = React.useContext(EventContext);
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
    <TouchableNativeFeedback onPress={() => bounce()}>
      <Animatable.View ref={handleViewRef} useNativeDriver={true}>
        <Fontisto
          name="day-sunny"
          size={18}
          color={selectedTime === 'evening' ? '#219CAB' : 'black'}
        />
      </Animatable.View>
    </TouchableNativeFeedback>
  );
};

export default Heart;
