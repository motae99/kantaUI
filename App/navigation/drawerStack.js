/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Animated from 'react-native-reanimated';

import HomeStack from './homeStack';
import {AuthContext} from '../context/authContext';

function Language() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Language Screen</Text>
    </View>
  );
}

function Vouchers() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Vouchers Screen</Text>
    </View>
  );
}

function CustomDrawerContent({progress, ...rest}) {
  const {signOut} = React.useContext(AuthContext);

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{transform: [{translateX}]}}>
        <View style={{height: 200, backgroundColor: 'green'}} />
        <DrawerItemList {...rest} />
        <DrawerItem label="SignOut" onPress={() => signOut()} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerStyle={
        {
          // backgroundColor: '#c6cbef',
          // width: 300,
        }
      }
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="Language" component={Language} />
      <Drawer.Screen name="Vouchers" component={Vouchers} />
    </Drawer.Navigator>
  );
}
