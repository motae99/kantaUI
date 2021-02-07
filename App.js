// /* eslint-disable react-native/no-inline-styles */
// /**
//  *
//  * Inspiration: https:dribbble.com/shots/3731362-Event-cards-iOS-interaction
//  */

// import * as React from 'react';
// import {
//   StatusBar,
//   Image,
//   FlatList,
//   Dimensions,
//   Animated,
//   Text,
//   View,
//   Alert,
//   StyleSheet,
//   SafeAreaView,
// } from 'react-native';
// const {width} = Dimensions.get('screen');
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import {
//   FlingGestureHandler,
//   Directions,
//   State,
// } from 'react-native-gesture-handler';

// // https://www.creative-flyers.com
// const DATA = [
//   {
//     title: 'Afro vibes',
//     location: 'Mumbai, India',
//     date: 'Nov 17th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
//   },
//   {
//     title: 'Jungle Party',
//     location: 'Unknown',
//     date: 'Sept 3rd, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
//   },
//   {
//     title: '4th Of July',
//     location: 'New York, USA',
//     date: 'Oct 11th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
//   },
//   {
//     title: 'Summer festival',
//     location: 'Bucharest, Romania',
//     date: 'Aug 17th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
//   },
//   {
//     title: 'BBQ with friends',
//     location: 'Prague, Czech Republic',
//     date: 'Sept 11th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
//   },
//   {
//     title: 'Festival music',
//     location: 'Berlin, Germany',
//     date: 'Apr 21th, 2021',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
//   },
//   {
//     title: 'Beach House',
//     location: 'Liboa, Portugal',
//     date: 'Aug 12th, 2020',
//     poster:
//       'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
//   },
// ];

// const OVERFLOW_HEIGHT = 77;
// const SPACING = 10;
// const ITEM_WIDTH = width * 0.76;
// const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
// const VISIBLE_ITEMS = 3;

// const OverflowItems = ({data, scrollXAnimated}) => {
//   const inputRange = [-1, 0, 1];
//   const translateY = scrollXAnimated.interpolate({
//     inputRange,
//     outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
//   });
//   return (
//     <View style={styles.overflowContainer}>
//       <Animated.View style={{transform: [{translateY}]}}>
//         {data.map((item, index) => {
//           return (
//             <View key={index} style={styles.itemContainer}>
//               <Text style={[styles.title]} numberOfLines={1}>
//                 {item.title}
//               </Text>
//               <View style={styles.itemContainerRow}>
//                 <Text style={[styles.location]}>
//                   <EvilIcons
//                     name="location"
//                     size={16}
//                     color="black"
//                     style={{marginRight: 5}}
//                   />
//                   {item.location}
//                 </Text>
//                 <Text style={[styles.date]}>{item.date}</Text>
//               </View>
//             </View>
//           );
//         })}
//       </Animated.View>
//     </View>
//   );
// };

// export default function App() {
//   const [data, setData] = React.useState(DATA);
//   const scrollXIndex = React.useRef(new Animated.Value(0)).current;
//   const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
//   const [index, setIndex] = React.useState(0);
//   const setActiveIndex = React.useCallback((activeIndex) => {
//     scrollXIndex.setValue(activeIndex);
//     setIndex(activeIndex);
//   });

//   React.useEffect(() => {
//     if (index === data.length - VISIBLE_ITEMS - 1) {
//       // get new data
//       // fetch more data
//       const newData = [...data, ...data];
//       setData(newData);
//     }
//   });

//   React.useEffect(() => {
//     Animated.spring(scrollXAnimated, {
//       toValue: scrollXIndex,
//       useNativeDriver: true,
//     }).start();
//     // setInterval(() => {
//     //   scrollXIndex.setValue(Math.floor(Math.random() * data.length));
//     // }, 3000);
//   });

//   return (
//     <FlingGestureHandler
//       key="left"
//       direction={Directions.LEFT}
//       onHandlerStateChange={(ev) => {
//         if (ev.state === State.ACTIVE) {
//           Alert.alert("I'm flinged!");
//         }
//         if (ev.nativeEvent.state === State.END) {
//           if (index === data.length - 1) {
//             return;
//           }
//           setActiveIndex(index + 1);
//           console.log('left');
//         }
//       }}>
//       <FlingGestureHandler
//         key="right"
//         direction={Directions.RIGHT}
//         onHandlerStateChange={(ev) => {
//           if (ev.state === State.ACTIVE) {
//             Alert.alert("I'm flinged!");
//           }

//           if (ev.nativeEvent.state === State.END) {
//             if (index === 0) {
//               return;
//             }
//             setActiveIndex(index - 1);
//           }
//         }}>
//         <SafeAreaView style={styles.container}>
//           <StatusBar hidden />
//           <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
//           <FlatList
//             data={data}
//             keyExtractor={(_, index) => String(index)}
//             horizontal
//             // inverted
//             contentContainerStyle={{
//               flex: 1,
//               justifyContent: 'center',
//               padding: SPACING * 2,
//               marginTop: 50,
//             }}
//             scrollEnabled={false}
//             removeClippedSubviews={false}
//             CellRendererComponent={({
//               item,
//               index,
//               children,
//               style,
//               ...props
//             }) => {
//               const newStyle = [style, {zIndex: data.length - index}];
//               return (
//                 <View style={newStyle} index={index} {...props}>
//                   {children}
//                 </View>
//               );
//             }}
//             renderItem={({item, index}) => {
//               const inputRange = [index - 1, index, index + 1];
//               const translateX = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [50, 0, -100],
//               });
//               const scale = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [0.8, 1, 1.3],
//               });
//               const opacity = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
//               });

//               return (
//                 <Animated.View
//                   style={{
//                     position: 'absolute',
//                     left: -ITEM_WIDTH / 2,
//                     opacity,
//                     transform: [
//                       {
//                         translateX,
//                       },
//                       {scale},
//                     ],
//                   }}>
//                   <Image
//                     source={{uri: item.poster}}
//                     style={{
//                       width: ITEM_WIDTH,
//                       height: ITEM_HEIGHT,
//                       borderRadius: 14,
//                     }}
//                   />
//                 </Animated.View>
//               );
//             }}
//           />
//         </SafeAreaView>
//       </FlingGestureHandler>
//     </FlingGestureHandler>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '900',
//     textTransform: 'uppercase',
//     letterSpacing: -1,
//   },
//   location: {
//     fontSize: 16,
//   },
//   date: {
//     fontSize: 12,
//   },
//   itemContainer: {
//     height: OVERFLOW_HEIGHT,
//     padding: SPACING * 2,
//   },
//   itemContainerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   overflowContainer: {
//     height: OVERFLOW_HEIGHT,
//     overflow: 'hidden',
//   },
// });

import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

// import { true } from '../config';

const windowWidth = Dimensions.get('window').width;
const circleRadius = 30;

class Fling extends Component {
  constructor(props) {
    super(props);
    this._touchX = new Animated.Value(windowWidth / 2 - circleRadius);
    this._translateX = Animated.add(
      this._touchX,
      new Animated.Value(-circleRadius),
    );
    this._translateY = new Animated.Value(0);
  }

  _onHorizontalFlingHandlerStateChange = ({nativeEvent}, offset) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this._touchX, {
        toValue: this._touchX._value + offset,
        useNativeDriver: true,
      }).start();
    }
  };

  _onVerticalFlingHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this._translateY, {
        toValue: this._translateY._value + 10,
        useNativeDriver: true,
      }).start();
    }
  };

  render() {
    return (
      <FlingGestureHandler
        direction={Directions.UP}
        numberOfPointers={2}
        onHandlerStateChange={this._onVerticalFlingHandlerStateChange}>
        <FlingGestureHandler
          direction={Directions.RIGHT | Directions.LEFT}
          onHandlerStateChange={(ev) =>
            this._onHorizontalFlingHandlerStateChange(ev, -10)
          }>
          <View style={styles.horizontalPan}>
            <Animated.View
              style={[
                styles.circle,
                {
                  transform: [
                    {
                      translateX: this._translateX,
                    },
                    {
                      translateY: this._translateY,
                    },
                  ],
                },
              ]}
            />
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  }
}

export default class Example extends Component {
  render() {
    return (
      <View>
        <Fling />
        <Text>
          Move up (with two fingers) or right/left (with one finger) and watch
          magic happens
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontalPan: {
    backgroundColor: '#f76f41',
    height: 300,
    justifyContent: 'center',
    marginVertical: 10,
  },
  circle: {
    backgroundColor: '#42a5f5',
    borderRadius: circleRadius,
    height: circleRadius * 2,
    width: circleRadius * 2,
  },
});
