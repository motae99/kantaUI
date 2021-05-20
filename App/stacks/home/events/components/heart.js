import React, {useRef, useContext, useState, useReducer} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from 'context/authContext';
import {EventContext} from 'context/eventsContext';

import Svg, {Path} from 'react-native-svg';

const Heart = ({item}) => {
  const {unLike, addLike} = useContext(AuthContext);
  const {unHeart} = useContext(EventContext);

  // const [state, dispatch] = useReducer(reducer, item)
  // console.log(item);

  const [hearted, toggleHeart] = useState(item.isHearted);
  const handleViewRef = useRef(null);

  const bounce = () => {
    handleViewRef.current.bounce(300).then((endState) => {
      const type = 'events';
      hearted ? unLike(item) : addLike(item, type);
      unHeart(item, !item.isHearted);

      toggleHeart(!hearted);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => bounce()}>
      <Animatable.View ref={handleViewRef} useNativeDriver={true}>
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill={hearted ? '#219CAB' : 'rgba(0, 0, 0, 0.3)'}
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-heart">
          <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </Svg>
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default Heart;

// const people = [
//  {name: 'Jay', alive: true},
//  {name: 'Kailee', alive: true},
//  {name: 'John', alive: true},
//  {name: 'Mia', alive: true}
// ]

// const reducer = (people, action) => {
//  if(action.type == 'chomp') {
//    return people.map(person => {
//      if(person.name == action.payload) {
//        person.alive = false;
//      }
//      return person;
//    })
//  }
//  if(action.type == 'revive') {
//    return people.map(person => {
//      if(person.name == action.payload) {
//        person.alive = true;
//      }
//      return person;
//    })
//  }
// }
