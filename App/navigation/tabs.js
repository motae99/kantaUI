import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import Category from 'stacks/home';
import Social from 'social/index';
import Booking from 'stacks/bookings';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const [value, setValue] = React.useState(null);
  const {getItem} = useAsyncStorage('booking');

  const readItemFromStorage = async () => {
    const item = await getItem();
    console.log('item', item);
    item ? setValue(item) : null;
  };

  React.useEffect(() => {
    readItemFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(value, 'value');
  // const [bookTab, setBookingBadge] = React.useState(null);

  // const getBookingBadge = async () => {
  //   try {
  //     const bookingBadge = await AsyncStorage.getItem('booking');
  //     console.log('bookingBadge', bookingBadge);
  //     bookingBadge ? setBookingBadge(Number(bookingBadge)) : null;
  //     return bookingBadge;
  //   } catch (e) {
  //     // error reading value
  //     console.log('error', e);
  //   }
  // };

  // React.useEffect(() => {
  //   getBookingBadge();
  //   console.log('badge in storage', bookTab);
  //   // setData(all);
  // }, []);

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
          // tabBarBadge: value ? value : '',
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
