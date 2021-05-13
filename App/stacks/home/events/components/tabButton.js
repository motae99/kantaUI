/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import {Dimensions, View, TouchableOpacity, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const MyTabBar = ({state, descriptors, navigation, position}) => {
  return (
    <View style={{}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const opacity = Animated.interpolate(position, {
          inputRange: [0, 1],
          outputRange: [1, 1],
        });

        const top = Animated.interpolate(position, {
          inputRange: [0, 1],
          outputRange: [height - 110, height - 280],
        });

        // const translateX = Animated.interpolate(position, {
        //   inputRange: [0, 1],
        //   outputRange: [60, 160],
        // });

        return (
          <Animated.View
            // key={options.key}
            style={{
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              // width: 90,
              borderRadius: 20,
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: top,
              left: width / 2.7,
              zIndex: 1,
            }}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, alignItems: 'center'}}>
              <Animated.Text
                style={{
                  color: 'white',
                  opacity,
                  fontSize: 12,
                  alignSelf: 'center',
                }}>
                <Feather
                  name={label === 'Map' ? 'map-pin' : 'list'}
                  size={16}
                  color="white"
                />{' '}
                {label} View
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

// const MyTabBar = ({state, descriptors, navigation, position}) => {
//   return (
//     <View style={{}}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           console.log(
//             'event',
//             event,
//             'event.defaultPrevented',
//             event.defaultPrevented,
//             'isFocused',
//             isFocused,
//             'navigate To',
//             route.name,
//           );
//           if (!isFocused && !event.defaultPrevented) {
//             console.log('test', route.name);
//             navigation.navigate(route.name);

//             // route.name === 'Notifications'
//             //   ? navigation.navigate('Profile')
//             //   : navigation.navigate('Notifications');
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         const inputRange = state.routes.map((_, i) => i);
//         // console.log(inputRange);
//         // const opacity = Animated.interpolate(position, {
//         //   inputRange,
//         //   outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
//         // });

//         const opacity = Animated.interpolate(position, {
//           inputRange: [0, 1],
//           outputRange: [1, 1],
//         });

//         const top = Animated.interpolate(position, {
//           inputRange: [0, 1],
//           outputRange: [height - 110, height - 280],
//         });

//         // const translateX = Animated.interpolate(position, {
//         //   inputRange: [0, 1],
//         //   outputRange: [60, 160],
//         // });
//         console.log('options key', options);
//         return (
//           <Animated.View
//             key={options.key}
//             style={{
//               flex: 1,
//               paddingHorizontal: 10,
//               paddingVertical: 5,
//               // width: 90,
//               borderRadius: 20,
//               backgroundColor: 'rgba(0,0,0,.5)',
//               justifyContent: 'center',
//               alignItems: 'center',
//               position: 'absolute',
//               top: top,
//               left: width / 2.7,
//               zIndex: 1,
//             }}>
//             <TouchableOpacity
//               key={options.key}
//               accessibilityRole="button"
//               accessibilityState={isFocused ? {selected: true} : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Animated.Text
//                 style={{
//                   color: 'white',
//                   opacity,
//                   fontSize: 12,
//                   alignSelf: 'center',
//                 }}>
//                 <Feather
//                   name={label === 'Map' ? 'map-pin' : 'list'}
//                   size={16}
//                   color="white"
//                 />{' '}
//                 {label} View
//               </Animated.Text>
//             </TouchableOpacity>
//           </Animated.View>
//         );
//       })}
//     </View>
//   );
// };

export default MyTabBar;
