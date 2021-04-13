/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');

const BookingCard = ({item, index}) => {
  return (
    <Animatable.View
      animation={'fadeInUp'}
      delay={2 * 400}
      duration={400}
      useNativeDriver={true}>
      <View
        style={{
          height: height / 4,
          width,
          backgroundColor: 'gray',
          marginVertical: 5,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{color: 'white', padding: 4}}>
          providerName = = {item.providerName}
        </Text>
        <Text style={{color: 'white', padding: 4}}>
          userDisplayName = = {item.userDisplayName}
        </Text>
        <Text style={{color: 'white', padding: 4}}>
          basicCost = = {item.basicCost}
        </Text>
        <Text style={{color: 'white', padding: 4}}>
          providerUserId = = {item.providerUserId}
        </Text>
        <Text style={{color: 'white', padding: 4}}>
          totalCost = = {item.totalCost}
        </Text>
        <Text style={{color: 'white', padding: 4}}>
          bookingStatus = = {item.bookingStatus}
        </Text>
      </View>
    </Animatable.View>
  );
};
export default BookingCard;
