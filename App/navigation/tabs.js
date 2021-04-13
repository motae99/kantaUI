import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Category from 'stacks/home';
import Social from 'social/index';
import Booking from 'stacks/bookings';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Category"
      tabBarOptions={{
        activeTintColor: '#219CAB',
      }}>
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarLabel: 'Social',
          tabBarIcon: ({color, size}) => (
            <Foundation name="social-treehouse" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="category" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarLabel: 'Booking',
          tabBarIcon: ({color, size}) => (
            <Feather name="git-pull-request" color={color} size={size} />
          ),
          tabBarBadge: 2,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
