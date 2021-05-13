import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import List from './list';
import Map from './eventMap';
// import Header from 'components/headerTest';
import Sorting from './components/sorting';
import Tabs from './components/tabButton';
import TabHeader from './components/tabHeader';
import FilterTab from './components/filterTab';

import {EventContext} from 'context/eventsContext';

const {diffClamp} = Animated;
const headerHeight = 58 * 2;
export const getCloser = (value, checkOne, checkTwo) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  const {eventProviders, loading} = React.useContext(EventContext);
  const ref = React.useRef(null);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView mode="margin" style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="#219CAB"
      />

      <TabHeader {...{scrollY, ref}} />

      <Tab.Navigator tabBar={(props) => <Tabs {...props} />}>
        <Tab.Screen name="List" options={{tabBarLabel: 'List'}}>
          {() => <List refs={ref} {...{scrollY}} />}
        </Tab.Screen>
        <Tab.Screen name="Map" options={{tabBarLabel: 'Map'}}>
          {() => <Map {...{eventProviders}} />}
        </Tab.Screen>
      </Tab.Navigator>

      <FilterTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    backgroundColor: 'red',
    height: headerHeight,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 2,
  },
  container: {
    flex: 1,
  },
});

export default MyTabs;
