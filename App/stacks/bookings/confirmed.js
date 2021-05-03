/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import BookingCard from 'stacks/bookings/components/bookingCard';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import moment from 'moment';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const today = moment(Date.now()).format('YYYY-MM-DD');

  useEffect(() => {
    const subscriber = firestore()
      .collection('bookings')
      .where('bookingStatus', '==', 'confirmed')
      .where('date', '>=', today)
      .orderBy('date', 'desc')
      .orderBy('timeStamp', 'desc')
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
    <View style={{flex: 1, backgroundColor: Colors.neutral.s200}}>
      <Animated.FlatList
        data={bookings}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        contentContainerStyle={{
          marginHorizontal: Sizing.x20,
          paddingTop: Sizing.x10,
        }}
        renderItem={({item, index}) => {
          return <BookingCard {...{item, index}} />;
        }}
      />
    </View>
  );
};
export default BookingList;
