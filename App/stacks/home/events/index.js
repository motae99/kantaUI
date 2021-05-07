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

import {EventContext} from 'context/eventsContext';

const {diffClamp} = Animated;
const headerHeight = 58 * 2;
export const getCloser = (value, checkOne, checkTwo) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  const {eventProviders} = React.useContext(EventContext);
  const ref = React.useRef(null);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  //  const onScroll = {Animated.event(
  //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
  //   {useNativeDriver: false},
  // )}
  // const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  // const translateY = scrollYClamped.interpolate({
  //   inputRange: [0, headerHeight],
  //   outputRange: [0, -headerHeight / 2],
  // });

  // const translateYNumber = React.useRef();

  // translateY.addListener(({value}) => {
  //   translateYNumber.current = value;
  // });

  // const handleSnap = ({nativeEvent}) => {
  //   const offsetY = nativeEvent.contentOffset.y;
  //   if (
  //     !(
  //       translateYNumber.current === 0 ||
  //       translateYNumber.current === -headerHeight
  //     )
  //   ) {
  //     if (ref.current) {
  //       ref.current.scrollToOffset({
  //         offset:
  //           getCloser(translateYNumber.current, -headerHeight, 0) ===
  //           -headerHeight
  //             ? offsetY + headerHeight
  //             : offsetY - headerHeight / 2,
  //       });
  //     }
  //   }
  // };
  return (
    <SafeAreaView mode="margin" style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="#219CAB"
      />

      {/* <Animated.View style={[styles.header, {transform: [{translateY}]}]} /> */}
      {/* <Sorting /> */}

      {/* <Header {...{headerHeight}} /> */}
      {/* </Animated.View> */}
      <TabHeader {...{scrollY, ref}} />
      <Tab.Navigator tabBar={(props) => <Tabs {...props} />}>
        <Tab.Screen name="List" options={{tabBarLabel: 'List'}}>
          {(props) => (
            <List
              {...props}
              // scrollY={scrollY}
              // ref={ref}
              // eventProviders={eventProviders}
              {...{eventProviders, ref, scrollY}}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Map" options={{tabBarLabel: 'Map'}}>
          {(props) => <Map {...props} {...{eventProviders}} />}
        </Tab.Screen>
      </Tab.Navigator>
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
