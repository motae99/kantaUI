import React, {useState, useRef, useMemo, useEffect, useCallback} from 'react';
import {StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import Booked from './booked';
import Confirmed from './confirmed';
import Previous from './previous';

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  const bottomSheetModalRef = useRef(null);
  const [data, setData] = useState([]);
  const [bookedBookings, setBookedBookings] = useState([]);
  const [confimedBookings, setConfimedBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [sort, setSort] = useState(null);
  const [selected, setSelected] = useState(null);
  const [requestedAction, setRequestedAction] = useState(null);
  const today = moment(Date.now()).format('YYYY-MM-DD');

  useEffect(() => {
    const subscriber = firestore()
      .collection('bookings')
      .orderBy('date', 'desc')
      .orderBy('timeStamp', 'asc')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const allData = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (allData && allData.length > 0) {
            setData(allData);
          }
        }
      });

    return () => subscriber();
  }, []);

  useMemo(() => {
    const previous = data.filter(
      (item) => moment(item.date).format('YYYY-MM-DD') < today,
    );
    setPreviousBookings(previous);

    const booked = data.filter(
      (item) =>
        item.bookingStatus === 'booked' &&
        moment(item.date).format('YYYY-MM-DD') >= today,
    );
    setBookedBookings(booked);

    const confirmed = data.filter(
      (item) =>
        item.bookingStatus === 'confirmed' &&
        moment(item.date).format('YYYY-MM-DD') >= today,
    );
    setConfimedBookings(confirmed);
  }, [data, today]);

  const snapPoints = useMemo(() => {
    // const numberOfServices = selected.additionalServices.length;
    // let points = [-1, '15%'];
    const points =
      requestedAction === 'services' ? [-1, '80%'] : [-1, '9%', '80%'];
    return points;
  }, [requestedAction]);

  // const handlePresentModalPress = useCallback(() => {
  //   // console.log(item);
  //   bottomSheetModalRef.current?.present();
  // }, []);

  // const dismiss = useCallback(() => {
  //   console.log('dissmiss');
  //   bottomSheetModalRef.current?.dismiss();
  // }, []);

  // const updateList = (item) => {
  //   const newBooking = bookings.filter((i) => i !== item);
  //   setBookings(newBooking);
  // };

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  const process = () => {
    requestedAction === 'confirm'
      ? firestore()
          .collection('bookings')
          .doc(selected.key)
          .update({
            bookingStatus: 'confirmed',
          })
          .then(() => {
            const newData = data;
            const objIndex = newData.findIndex((i) => i === selected);
            newData[objIndex].bookingStatus = 'confirmed';
            setData(newData);
            setSort(true);
          })
          .then(() => {
            bottomSheetModalRef.current?.dismiss();
          })
          .catch((error) => {
            console.log(error);
          })
      : firestore()
          .collection('bookings')
          .doc(selected.key)
          .update({
            bookingStatus: 'canceled',
          })
          .then(() => {
            const newData = data;
            const objIndex = newData.findIndex((i) => i === selected);
            newData[objIndex].bookingStatus = 'canceled';
            setData(newData);
            setSort(true);
          })
          .then(() => {
            bottomSheetModalRef.current?.dismiss();
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const action = (name, item) => {
    console.log('name', name);
    console.log('item', item);
    setRequestedAction(name);
    setSelected(item);
    // bottomSheetModalRef.current?.dismiss();
    bottomSheetModalRef.current?.present();
    // const newBooking = bookings.filter((i) => i !== item);
    // setBookings(newBooking);
  };

  return (
    <SafeAreaView mode="margin" style={{flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={Colors.primary.brand}
      />
      <BottomSheetModalProvider>
        <Tab.Navigator
          initialRouteName="Booked"
          tabBarOptions={{
            activeTintColor: Colors.secondary.brand,
            labelStyle: {...Typography.header.x20},
            style: {
              backgroundColor: Colors.primary.brand,
              height: 80,
              justifyContent: 'center',
            },
            indicatorStyle: {backgroundColor: Colors.primary.s200},
          }}>
          <Tab.Screen name="Booked" options={{tabBarLabel: 'Booked'}}>
            {(props) => (
              <Booked
                {...{
                  bottomSheetModalRef,
                  handleSheetChanges,
                  snapPoints,
                  action,
                  selected,
                  requestedAction,
                  process,
                  bookedBookings,
                }}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Confirmed" options={{tabBarLabel: 'Confirmed'}}>
            {(props) => (
              <Confirmed
                {...{
                  bottomSheetModalRef,
                  handleSheetChanges,
                  snapPoints,
                  action,
                  selected,
                  requestedAction,
                  process,
                  confimedBookings,
                }}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Previous" options={{tabBarLabel: 'Previous'}}>
            {(props) => (
              <Previous
                {...{
                  bottomSheetModalRef,
                  handleSheetChanges,
                  snapPoints,
                  action,
                  selected,
                  requestedAction,
                  process,
                  previousBookings,
                }}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};
export default MyTabs;

// import React, {useCallback, useMemo, useRef} from 'react';
// import {View, Text, StyleSheet, Button} from 'react-native';
// import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

// const App = () => {
//   // ref
//   const bottomSheetModalRef = useRef(null);

//   // variables
//   const snapPoints = useMemo(() => ['0%', '15%'], []);

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
//     <BottomSheetModalProvider>
//       <View style={styles.container}>
//         <Button
//           onPress={handlePresentModalPress}
//           title="Present Modal"
//           color="black"
//         />
//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           index={1}
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}>
//           <View style={styles.contentContainer}>
//             <Text>Awesome 🎉</Text>
//           </View>
//         </BottomSheetModal>
//       </View>
//     </BottomSheetModalProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default App;
