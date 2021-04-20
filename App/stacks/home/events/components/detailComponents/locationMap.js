/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import StaticMap from 'components/staticMap';
import * as Animatable from 'react-native-animatable';
import {height, SECTIONS_TOP_MARGIN} from 'events/components/constants';

const LocationMap = ({item}) => {
  return (
    <Animatable.View
      animation={'fadeInUp'}
      delay={1100}
      duration={400}
      useNativeDriver={true}
      style={{marginTop: SECTIONS_TOP_MARGIN / 2}}>
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: 14,
          fontWeight: '500',
          marginBottom: 18,
        }}>
        Get Directions
      </Text>
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          height: height / 4,
        }}>
        <StaticMap {...{item}} />
      </View>
    </Animatable.View>
  );
};

export default LocationMap;
