import React from 'react';
import {Easing} from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import EventContextProvider from 'context/eventsContext';
import Tabs from './tabs';
import Beauty from 'beauty';
import BeautyList from 'beauty/beautyList';
import Photo from 'photo';
import PhotoDetail from 'photo/details';
import Event from 'events';
import EventDetail from 'events/detail';
import PlannerDetail from 'events/plannerDetail';
import Calendar from 'events/calendar';
import Filter from 'events/filter';
import Notifications from 'stacks/common/notifications';
import Faviourate from 'stacks/common/faviourate';
import FeedBack from 'stacks/common/feedBack';
import AllReview from 'stacks/common/rating';

import Phone from 'auth/phone';
// enabledScreens();
const Stack = createSharedElementStackNavigator();
const ModalStack = createStackNavigator();

const modalOpen = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const modalClose = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

function MainStackScreen() {
  return (
    <ModalStack.Navigator
      mode="modal"
      // headerMode={'none'}
      // screenOptions={{
      //   gestureEnabled: true,
      //   gestureDirection: 'horizontal',
      //   // cardStyleInterpolator: CardStyleInterpolators.SlideFromRightIOS,
      //   transitionSpec: {
      //     open: modalOpen,
      //     close: modalClose,
      //   },
      // }}
      // animation="fade"
      // headerMode="float"
    >
      <ModalStack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          title: 'Notifcations',
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      />
      <ModalStack.Screen name="Filter" component={Filter} />
      <ModalStack.Screen name="FeedBack" component={FeedBack} />
      <ModalStack.Screen name="AllReview" component={AllReview} />
      <ModalStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <ModalStack.Screen name="Faviourate" component={Faviourate} />
    </ModalStack.Navigator>
  );
}
const HomeStack = () => {
  return (
    <EventContextProvider>
      <Stack.Navigator headerMode={'none'} intial="Tabs">
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Phone" component={Phone} />

        <Stack.Screen name="Beauty" component={Beauty} />
        <Stack.Screen name="BeautyList" component={BeautyList} />
        <Stack.Screen name="Photo" component={Photo} />
        <Stack.Screen name="PhotoDetail" component={PhotoDetail} />

        <Stack.Screen name="Event" component={Event} />
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

        <Stack.Screen
          name="Modal"
          component={MainStackScreen}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </EventContextProvider>
  );
};

export default HomeStack;

// const config = {
//   animation: 'spring',
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// };

// const forSlide = ({current, next, inverted, layouts: {screen}}) => {
//   const progress = Animated.add(
//     current.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1],
//       extrapolate: 'clamp',
//     }),
//     next
//       ? next.progress.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, 1],
//           extrapolate: 'clamp',
//         })
//       : 0,
//   );

//   return {
//     cardStyle: {
//       transform: [
//         {
//           translateX: Animated.multiply(
//             progress.interpolate({
//               inputRange: [0, 1, 2],
//               outputRange: [
//                 screen.width, // Focused, but offscreen in the beginning
//                 0, // Fully focused
//                 screen.width * -0.3, // Fully unfocused
//               ],
//               extrapolate: 'clamp',
//             }),
//             inverted,
//           ),
//         },
//       ],
//     },
//   };
// };
