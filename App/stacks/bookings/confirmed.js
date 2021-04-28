/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import BookingCard from 'stacks/bookings/components/bookingCard';
import {Sizing, Outlines, Colors, Typography} from 'styles';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('bookings')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const data = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (data && data.length > 0) {
            setBookings(data);
          }
        }
      });

    return () => subscriber();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      <Animated.FlatList
        data={bookings}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        contentContainerStyle={{
          marginTop: Sizing.x40,
          marginHorizontal: Sizing.x20,
        }}
        renderItem={({item, index}) => {
          return <BookingCard {...{item, index}} />;
        }}
      />
    </SafeAreaView>
  );
};
export default BookingList;
