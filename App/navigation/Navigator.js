import React from 'react';
import {Easing} from 'react-native';
import {NavigationContainer, TransitionPresets} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
// import {enabledScreens} from 'react-native-screens';
// import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import Phone from 'stacks/auth/Phone';
import Verify from 'stacks/auth/Verify';
import Login from 'stacks/auth/login';
import Introd from 'stacks/auth/introd';

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
const AuthContext = React.createContext();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Social" component={Social} />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Introd" component={Introd} />
      <Stack.Screen name="Phone" component={Phone} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
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
  );
};

const AppStack = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? <AuthStack /> : <HomeStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppStack;
