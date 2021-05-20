import React, {useRef, useContext, useState, useReducer} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from 'context/authContext';
import {Sizing, Outlines, Colors, Typography} from 'styles';

import Svg, {Path} from 'react-native-svg';

const Heart = ({item, hearted, toggleHeart}) => {
  const {unLike, addLike} = useContext(AuthContext);
  // const {unHeart} = useContext(EventContext);

  // const [state, dispatch] = useReducer(reducer, item)
  // console.log(item);

  const handleViewRef = useRef(null);

  const bounce = () => {
    handleViewRef.current.bounce(300).then((endState) => {
      const type = 'photo';
      hearted ? unLike(item) : addLike(item, type);

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
          fill={hearted ? Colors.primary.brand : '#fff'}
          stroke={hearted ? Colors.primary.brand : '#fff'}
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
