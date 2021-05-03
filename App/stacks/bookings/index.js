import * as React from 'react';
import {StatusBar, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Sizing, Outlines, Colors, Typography} from 'styles';

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
        backgroundColor={Colors.primary.brand}
      />
      <Tab.Navigator
        initialRouteName="Booked"
        tabBarOptions={{
          activeTintColor: Colors.primary.s600,
          labelStyle: {...Typography.header.x20},
          style: {
            backgroundColor: Colors.primary.brand,
            height: 80,
            justifyContent: 'center',
          },
          indicatorStyle: {backgroundColor: Colors.primary.s200},
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
