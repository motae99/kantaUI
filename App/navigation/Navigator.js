/* eslint-disable react-native/no-inline-styles */
// // import React, {useState} from 'react';
// // import {Button, TextInput} from 'react-native';
// // import auth from '@react-native-firebase/auth';

// // function PhoneSignIn() {
// //   // If null, no SMS has been sent
// //   const [confirm, setConfirm] = useState(null);

// //   const [code, setCode] = useState('');

// //   // Handle the button press
// //   async function signInWithPhoneNumber(phoneNumber) {
// //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
// //     setConfirm(confirmation);
// //   }

// //   async function confirmCode() {
// //     try {
// //       await confirm.confirm(code);
// //     } catch (error) {
// //       console.log('Invalid code.');
// //     }
// //   }

// //   if (!confirm) {
// //     return (
// //       <Button
// //         title="Phone Number Sign In"
// //         onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
// //       />
// //     );
// //   }

// //   return (
// //     <>
// //       <TextInput value={code} onChangeText={(text) => setCode(text)} />
// //       <Button title="Confirm Code" onPress={() => confirmCode()} />
// //     </>
// //   );
// // }

import React from 'react';
import {Easing} from 'react-native';
import {NavigationContainer, TransitionPresets} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {enabledScreens} from 'react-native-screens';
// import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

// import Phone from '../stacks/auth/Phone';
// import Verify from '../stacks/auth/Verify';
// // import Intro from '../stacks/auth/Intro';
// import Category from '../stacks/home/Category';
// import Beauty from '../stacks/home/Beauty';
// import beautyList from '../stacks/home/beautyList';

import Category from 'stacks/home';

import Beauty from 'beauty/index';
import BeautyList from 'beauty/beautyList';

import Photo from 'photo/index';
import Social from 'social/index';

import EventList from 'events/list';
import EventDetail from 'events/detail';
import EventMap from 'events/eventMap';
import PlannerDetail from 'events/plannerDetail';

// enabledScreens();
const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Social" component={Social} />
    </Tab.Navigator>
  );
};
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};
const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="EventList" component={EventList} />
        <Stack.Screen name="Beauty" component={Beauty} />
        <Stack.Screen name="BeautyList" component={BeautyList} />
        <Stack.Screen name="Photo" component={Photo} />

        <Stack.Screen
          name="EventMap"
          component={EventMap}
          // options={{...TransitionPresets.SlideFromRightIOS}}
        />
        <Stack.Screen
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {duration: 200},
                // config: {duration: 500, easing: Eeasing.easingInOut},
              },
              close: {
                animation: 'timing',
                config: {duration: 200},
              },
            },
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
          name="EventDetail"
          component={EventDetail}
        />
        <Stack.Screen
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {duration: 200},
                // config: {duration: 500, easing: Eeasing.easingInOut},
              },
              close: {
                animation: 'timing',
                config: {duration: 200},
              },
            },
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
          name="PlannerDetail"
          component={PlannerDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const BeautyStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator headerMode={'none'}>
//         <Stack.Screen name="Beauty" component={Beauty} />
//         <Stack.Screen name="BeautyList" component={BeautyList} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default HomeStack;
