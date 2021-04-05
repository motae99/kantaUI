/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  Animated,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import StaticMap from 'components/staticMap';
import Reviews from 'events/components/reviews';
import Services from 'events/components/services';
import HeaderImage from 'events/components/headerImage';
import Header from 'events/components/detailHeader';

import {EventContext} from 'context/eventsContext';

export const {width, height} = Dimensions.get('window');

// const headerHieght = height / 6;

export const MIN_HEADER_HEIGHT = 100;
export const HEADER_IMAGE_HEIGHT = height * 0.65;
const ICON_SIZE = 20;
const PADDING = 18;
export const SECTIONS_TOP_MARGIN = 30;
const fadeIn = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
};

const Detail = ({route}) => {
  const {navigation} = useNavigation();
  // const {useProvider, setProvider} = React.useContext(EventContext);

  const {selectedItem, selectedImageIndex} = route.params;
  // setProvider(selectedItem);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const list = React.useRef();

  const scrollBack = () => {
    list.current.scrollToIndex({
      animated: true,
      index: 0,
    });
  };
  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT * 0.7],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={{backgroundColor: '#E5E5E5', flex: 1}}>
      <StatusBar
        // translucent
        barStyle={'light-content'}
        // backgroundColor="transparent"
      />

      <HeaderImage route={route} animatedValue={scrollY} {...{list}} />
      <Header
        route={route}
        animatedValue={scrollY}
        list={list}
        item={selectedItem}
      />

      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{paddingHorizontal: 18}}>
        <View
          style={{
            height: HEADER_IMAGE_HEIGHT,
            marginBottom: 18,
          }}
        />
        <Animatable.View
          animation={fadeIn}
          delay={700}
          duration={400}
          useNativeDriver={true}>
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignItems: 'center',
              opacity,
              marginTop: PADDING * 2,
              marginBottom: 16,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="md-location-outline" size={18} color="#2B3449" />
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'rgba(43,52,73,1)',
                  paddingLeft: 4,
                }}>
                {selectedItem.address}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'rgba(43,52,73,1)',
                  marginRight: 4,
                }}>
                {selectedItem.ratingSum
                  ? Math.round(
                      selectedItem.ratingSum / selectedItem.totalRating,
                      1,
                    )
                  : 0}
              </Text>
              <FontAwesome name="star" size={18} color="#219CAB" />
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'rgba(43,52,73,1)',
                  paddingLeft: 4,
                }}>
                ({selectedItem.totalRating ? selectedItem.totalRating : 'No'}{' '}
                review)
              </Text>
            </View>
          </Animated.View>
        </Animatable.View>

        <View>
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
              <StaticMap item={selectedItem} />
            </View>
          </Animatable.View>

          <Reviews item={selectedItem} />
          <Services provider={selectedItem} />
          <View style={{width, height}} />
        </View>
      </ScrollView>
    </View>
  );
};

Detail.sharedElements = (route, otherRoute, showing) => {
  const {selectedItem} = route.params;
  return selectedItem.files.map(
    (item) => `item.${selectedItem.key}.image.${item.key}`,
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
