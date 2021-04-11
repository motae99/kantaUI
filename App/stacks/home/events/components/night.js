import React, {useRef} from 'react';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {EventContext} from 'context/eventsContext';

const Night = () => {
  const {selectedTime, setSelectedTime} = React.useContext(EventContext);
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
    <TouchableNativeFeedback onPress={() => bounce()}>
      <Animatable.View ref={handleViewRef} useNativeDriver={true}>
        <MaterialCommunityIcons
          name="weather-night"
          size={18}
          color={selectedTime === 'night' ? '#219CAB' : 'black'}
        />
      </Animatable.View>
    </TouchableNativeFeedback>
  );
};

export default Night;
