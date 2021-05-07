/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Animated} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BookingCard from 'stacks/bookings/components/bookingCard';
import BottomSheet from 'stacks/bookings/components/bottomSheet';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import moment from 'moment';

const BookedList = ({
  bottomSheetModalRef,
  handleSheetChanges,
  snapPoints,
  action,
  selected,
  requestedAction,
  process,
  bookedBookings,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.neutral.s200}}>
      <Animated.FlatList
        data={bookedBookings}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        // initialNumToRender={3}
        contentContainerStyle={{
          marginHorizontal: Sizing.x20,
          paddingTop: Sizing.x10,
        }}
        renderItem={({item, index}) => {
          return <BookingCard {...{item, index, action}} />;
        }}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheet {...{selected, requestedAction, process}} />
      </BottomSheetModal>
    </View>
  );
};
export default BookedList;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react-native/no-inline-styles */
// import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
// import {View, Animated, Text, StyleSheet, Button} from 'react-native';
// import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
// import firestore from '@react-native-firebase/firestore';
// import BookingCard from 'stacks/bookings/components/bookingCard';
// import BottomSheet from 'stacks/bookings/components/bottomSheet';
// import {Sizing, Outlines, Colors, Typography} from 'styles';
// import moment from 'moment';

// const BookingList = () => {
//   // const {dismissAll} = useBottomSheetModal();

//   const bottomSheetModalRef = useRef(null);

//   const [bookings, setBookings] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [requestedAction, setRequestedAction] = useState(null);
//   const today = moment(Date.now()).format('YYYY-MM-DD');

//   // variables
//   const snapPoints = useMemo(() => {
//     // const numberOfServices = selected.additionalServices.length;
//     // let points = [-1, '15%'];
//     const points =
//       requestedAction === 'services' ? [-1, '80%'] : [-1, '9%', '80%'];
//     return points;
//   }, [requestedAction]);

//   // callbacks
//   // const handlePresentModalPress = useCallback(() => {
//   //   bottomSheetModalRef.current?.present();
//   // }, []);
//   const handlePresentModalPress = useCallback(() => {
//     // console.log(item);
//     bottomSheetModalRef.current?.present();
//   }, []);

//   const dismiss = useCallback(() => {
//     console.log('dissmiss');
//     bottomSheetModalRef.current?.dismiss();
//   }, []);

//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   useEffect(() => {
//     const subscriber = firestore()
//       .collection('bookings')
//       .where('bookingStatus', '==', 'booked')
//       .where('date', '>=', today)
//       .orderBy('date', 'asc')
//       .orderBy('timeStamp', 'desc')
//       .onSnapshot((querySnapshot) => {
//         if (querySnapshot) {
//           const data = querySnapshot.docs.map((documentSnapshot) => {
//             return {
//               ...documentSnapshot.data(),
//               key: documentSnapshot.id,
//             };
//           });
//           if (data && data.length > 0) {
//             setBookings(data);
//           }
//         }
//       });

//     return () => subscriber();
//   }, []);

//   const updateList = (item) => {
//     const newBooking = bookings.filter((i) => i !== item);
//     setBookings(newBooking);
//   };

//   const process = () => {
//     requestedAction === 'confirm'
//       ? firestore()
//           .collection('bookings')
//           .doc(selected.key)
//           .update({
//             bookingStatus: 'confirmed',
//           })
//           .then(() => {
//             const newBooking = bookings.filter((i) => i !== selected);
//             setBookings(newBooking);
//           })
//           .then(() => {
//             bottomSheetModalRef.current?.dismiss();
//           })
//           .catch((error) => {
//             console.log(error);
//           })
//       : firestore()
//           .collection('bookings')
//           .doc(selected.key)
//           .update({
//             bookingStatus: 'canceled',
//           })
//           .then(() => {
//             const newBooking = bookings.filter((i) => i !== selected);
//             setBookings(newBooking);
//           })
//           .then(() => {
//             bottomSheetModalRef.current?.dismiss();
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//   };

//   const action = (name, item) => {
//     console.log('name', name);
//     console.log('item', item);
//     setRequestedAction(name);
//     setSelected(item);
//     // bottomSheetModalRef.current?.dismiss();
//     bottomSheetModalRef.current?.present();
//     // const newBooking = bookings.filter((i) => i !== item);
//     // setBookings(newBooking);
//   };

//   return (
//     <BottomSheetModalProvider>
//       <View style={{flex: 1, backgroundColor: Colors.neutral.s200}}>
//         <Animated.FlatList
//           data={bookings}
//           keyExtractor={(item) => item.key}
//           showsVerticalScrollIndicator={false}
//           initialNumToRender={3}
//           contentContainerStyle={{
//             marginHorizontal: Sizing.x20,
//             paddingTop: Sizing.x10,
//           }}
//           renderItem={({item, index}) => {
//             return <BookingCard {...{item, index, action}} />;
//           }}
//         />

//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           index={1}
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}>
//           <BottomSheet {...{selected, requestedAction, process}} />
//         </BottomSheetModal>
//       </View>
//     </BottomSheetModalProvider>
//   );
// };

// export default BookingList;
