import * as React from 'react';
import {StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Booked from './booked';
import Confirmed from './confirmed';
import Previous from './previous';

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <SafeAreaView mode="margin" style={{flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="black"
      />
      <Tab.Navigator
        initialRouteName="Booked"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          labelStyle: {fontSize: 12},
          style: {backgroundColor: 'powderblue'},
        }}>
        <Tab.Screen
          name="Booked"
          component={Booked}
          options={{tabBarLabel: 'Booked'}}
        />
        <Tab.Screen
          name="Confirmed"
          component={Confirmed}
          options={{tabBarLabel: 'Confirmed'}}
        />

        <Tab.Screen
          name="Previous"
          component={Previous}
          options={{tabBarLabel: 'Previous'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default MyTabs;
