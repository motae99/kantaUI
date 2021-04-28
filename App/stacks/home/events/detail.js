/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useRef, useContext} from 'react';
import {View, Dimensions, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useValues} from 'react-native-redash/lib/module/v1';
import BasicInfo from 'events/components/detailComponents/basicInfo';
import LocationMap from 'events/components/detailComponents/locationMap';
import Reviews from 'events/components/detailComponents/reviews';
import Services from 'events/components/detailComponents/services';
import HeaderImage from 'events/components/detailComponents/headerImage';
import Facilities from 'events/components/detailComponents/facilities';
import Header from 'events/components/detailComponents/detailHeader';
import DateTime from 'events/components/detailComponents/dateTime';
import PayComponent from 'events/components/detailComponents/payComponent';
import moment from 'moment';

import {AuthContext} from 'context/authContext';
import {EventContext} from 'context/eventsContext';

import Animated from 'react-native-reanimated';

export const {width, height} = Dimensions.get('window');

export const MIN_HEADER_HEIGHT = 100;
export const HEADER_IMAGE_HEIGHT = height * 0.65;
export const PADDING = 18;
export const SECTIONS_TOP_MARGIN = 30;
const top = 36;

export const fadeIn = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

const Detail = ({route, navigation}) => {
  const {selectedItem, time} = route.params;
  const {dbUser} = useContext(AuthContext);
  const {date, creatBooking} = useContext(EventContext);

  const scrollView = useRef(null);
  const list = useRef();
  const [dateAction, setDateAction] = useState(null);
  const [paymentAction, setPaymentAction] = useState(null);
  const [selectedTime, setSelectedTime] = useState(time);

  const [selectedServices, setselectedServices] = useState([]);

  const [scrollY] = useValues([0], []);

  const cost = useMemo(() => {
    const {evening, night} = selectedItem;
    let initial = selectedTime === 'evening' ? Number(evening) : Number(night);
    let total = initial;
    selectedServices.forEach((service) => {
      total += Number(service.data.price);
    });
    return {total, initial};
  }, [selectedServices, selectedTime, selectedItem]);

  const bookNow = () => {
    const data = {
      userId: dbUser.uid,
      userDisplayName: dbUser.displayName,
      userPhotoURL: dbUser.photoURL,
      userPhoneNumber: dbUser.phoneNumber,
      providerType: 'partyHall',
      providerUserId: selectedItem.ownerId,
      providerId: selectedItem.key,
      providerName: selectedItem.name,
      providerNamePhotoURL: selectedItem.files[0].uri,
      date: moment(date).format('YYYY-MM-DD'),
      timeStamp: Date.now(),
      time: selectedTime,
      basicCost: cost.initial,
      additionalServices: selectedServices,
      totalCost: cost.total,
      bookingStatus: 'booked',
    };

    // console.log(moment(date).format('YYYY-MM-DD'));
    creatBooking(data).then(navigation.goBack());
    // console.log('date: ', moment(data.date).format('DD/MM/YYYY'));
    // console.log('timeStamp:', Date.now());
  };

  const dateTopEdge =
    dateAction?.y -
    (height - top) +
    dateAction?.height +
    top +
    HEADER_IMAGE_HEIGHT;
  const paymentTopEdge =
    paymentAction?.y -
    (height - top) +
    paymentAction?.height +
    top +
    HEADER_IMAGE_HEIGHT;
  const dateInputRange = [
    -1,
    0,
    dateTopEdge - 60,
    dateTopEdge,
    dateTopEdge + 1,
  ];
  const paymentInputRange = [
    -1,
    0,
    paymentTopEdge - 60,
    paymentTopEdge,
    paymentTopEdge + 1,
  ];
  const paymentBottomInputRange = [-1, dateTopEdge, dateTopEdge + 200];

  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5', flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <HeaderImage route={route} animatedValue={scrollY} {...{list}} />
      <Header
        route={route}
        animatedValue={scrollY}
        list={list}
        item={selectedItem}
      />
      <Animated.ScrollView
        ref={scrollView}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: HEADER_IMAGE_HEIGHT,
          paddingHorizontal: 18,
        }}>
        <BasicInfo item={selectedItem} {...{scrollY}} />
        <View>
          <LocationMap item={selectedItem} />
          <Facilities provider={selectedItem} />
          <Reviews item={selectedItem} />
          <View
            onLayout={(ev) => {
              setDateAction(ev.nativeEvent.layout);
            }}
            style={[styles.dateAction, {marginTop: SECTIONS_TOP_MARGIN}]}
          />
          <Services
            provider={selectedItem}
            {...{selectedServices, setselectedServices}}
          />
          <View
            onLayout={(ev) => {
              setPaymentAction(ev.nativeEvent.layout);
            }}
            style={[styles.paymentAction, {marginTop: SECTIONS_TOP_MARGIN}]}
          />
          <View style={{height: 400, width}} />
        </View>
      </Animated.ScrollView>
      {dateAction && (
        <DateTime
          item={selectedItem}
          inputRange={dateInputRange}
          {...{scrollY, dateAction, selectedTime, setSelectedTime}}
        />
      )}
      {paymentAction && (
        <PayComponent
          item={selectedItem}
          inputRange={paymentInputRange}
          {...{scrollY, paymentAction, cost, paymentBottomInputRange, bookNow}}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateAction: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  paymentAction: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

Detail.sharedElements = (route, otherRoute, showing) => {
  const {selectedItem} = route.params;
  return selectedItem.files.map(
    (item, index) => `item.${selectedItem.key}.image.${item.uri}`,
  );
};

export default Detail;

/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import * as React from 'react';
// import {
//   Text,
//   View,
//   Dimensions,
//   StatusBar,
//   ScrollView,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import * as Animatable from 'react-native-animatable';
// import {useNavigation} from '@react-navigation/native';
// import StaticMap from 'components/staticMap';
// import HeaderImage from 'events/components/headerImage';
// import Header from 'events/components/detailHeader';
// import {
//   onScrollEvent,
//   useValues,
//   onScroll,
// } from 'react-native-redash/lib/module/v1';
// export const {width, height} = Dimensions.get('window');
// import Animated from 'react-native-reanimated';
// const {interpolate, Extrapolate, Value} = Animated;

// // const headerHieght = height / 6;

// export const MIN_HEADER_HEIGHT = 100;
// export const HEADER_IMAGE_HEIGHT = height * 0.65;
// const ICON_SIZE = 20;
// const PADDING = 18;
// const fadeIn = {
//   0: {
//     opacity: 0,
//     translateY: 100,
//   },
//   1: {
//     opacity: 1,
//     translateY: 0,
//   },
// };

// const Detail = ({route}) => {
//   const {selectedItem, selectedImageIndex} = route.params;
//   // const y = React.useRef(new Animated.Value(0)).current;
//   // const scrollView = React.useRef(null);
//   // const [y] = useValues([0], []);

//   const y = new Value(0);
//   const list = React.useRef();

//   const scrollBack = () => {
//     list.current.scrollToIndex({
//       animated: true,
//       index: 0,
//     });
//   };
//   const opacity = interpolate(y, {
//     inputRange: [0, HEADER_IMAGE_HEIGHT * 0.7],
//     outputRange: [1, 0],
//     extrapolate: Extrapolate.CLAMP,
//   });

//   return (
//     <View style={{backgroundColor: '#fff', flex: 1}}>
//       <StatusBar
//         // translucent
//         barStyle={'light-content'}
//         // backgroundColor="transparent"
//       />

//       <HeaderImage route={route} animatedValue={y} {...{list}} />
//       <Header route={route} animatedValue={y} list={list} item={selectedItem} />

//       <Animated.ScrollView
//         // ref={scrollView}
//         // onScroll={Animated.event([{nativeEvent: {contentOffset: {y}}}])}
//         // onScroll={onScrollEvent({y})}
//         // onScroll={onScrollEvent({y: new Value(0)})}
//         // onScroll={onScrollEvent({y})}
//         onScroll={Animated.event(
//           [
//             {
//               nativeEvent: {
//                 contentOffset: {
//                   y: y,
//                 },
//               },
//             },
//           ],
//           {
//             useNativeDriver: true,
//           },
//         )}
//         contentContainerStyle={{paddingHorizontal: 18}}>
//         <View
//           style={{
//             height: HEADER_IMAGE_HEIGHT,
//             marginBottom: 18,
//           }}
//         />
//         <Animatable.View
//           animation={fadeIn}
//           delay={700}
//           duration={400}
//           useNativeDriver={true}>
//           <Animated.View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               // alignItems: 'center',
//               opacity,
//               marginTop: PADDING * 2,
//               marginBottom: 16,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Ionicons name="md-location-outline" size={18} color="#2B3449" />
//               <Text
//                 style={{
//                   fontFamily: 'Montserrat',
//                   fontSize: 10,
//                   fontWeight: '400',
//                   color: 'rgba(43,52,73,1)',
//                   paddingLeft: 4,
//                 }}>
//                 {selectedItem.address}
//               </Text>
//             </View>

//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <FontAwesome name="star" size={18} color="#219CAB" />
//               <Text
//                 style={{
//                   fontFamily: 'Montserrat',
//                   fontSize: 10,
//                   fontWeight: '400',
//                   color: 'rgba(43,52,73,1)',
//                   paddingLeft: 4,
//                 }}>
//                 {selectedItem.rate}(2.2K review)
//               </Text>
//             </View>
//           </Animated.View>
//         </Animatable.View>

//         <View>
//           <Animatable.View
//             animation={'fadeInUp'}
//             delay={1100}
//             duration={400}
//             useNativeDriver={true}>
//             <Text
//               style={{
//                 fontFamily: 'Montserrat',
//                 fontSize: 14,
//                 fontWeight: '500',
//                 marginBottom: 18,
//               }}>
//               Get Directions
//             </Text>
//             <View
//               style={{
//                 borderRadius: 16,
//                 overflow: 'hidden',
//                 height: height / 5,
//               }}>
//               <StaticMap item={selectedItem} />
//             </View>
//           </Animatable.View>
//           <View style={{width, height}} />
//         </View>
//       </Animated.ScrollView>
//     </View>
//   );
// };

// Detail.sharedElements = (route, otherRoute, showing) => {
//   const {selectedItem} = route.params;
//   return selectedItem.files.map(
//     (item) => `item.${selectedItem.key}.image.${item.key}`,
//   );
// };

// export default Detail;
