import React from 'react';
// import {enabledScreens} from 'react-native-screens';
// import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import EventContextProvider from 'context/eventsContext';
import Tabs from './tabs';
import Beauty from 'beauty';
import BeautyList from 'beauty/beautyList';
import Photo from 'photo';
import Event from 'events';
import EventDetail from 'events/detail';
import PlannerDetail from 'events/plannerDetail';
import Calendar from 'events/calendar';
import Filter from 'events/filter';

import Phone from 'auth/phone';
// enabledScreens();
const Stack = createSharedElementStackNavigator();

const HomeStack = () => {
  return (
    <EventContextProvider>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Phone" component={Phone} />

        <Stack.Screen name="Beauty" component={Beauty} />
        <Stack.Screen name="BeautyList" component={BeautyList} />
        <Stack.Screen name="Photo" component={Photo} />

        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Filter" component={Filter} />
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
