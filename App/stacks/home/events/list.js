/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  // SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ListHeader from 'eventsComponents/listHeader';
import EventCard from 'eventsComponents/EventCard';
import Header from 'components/headerTest';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {EventContext} from 'context/eventsContext';

const {width, height} = Dimensions.get('window');

const headerHeight = 58 * 2;

export const getCloser = (value, checkOne, checkTwo) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

const EventList = ({scrollY, eventProviders}) => {
  const insets = useSafeAreaInsets();

  // const {eventProviders} = React.useContext(EventContext);

  const ref = React.useRef(null);

  // const scrollY = React.useRef(new Animated.Value(0));
  // const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight * 2);

  // const translateY = scrollYClamped.interpolate({
  //   inputRange: [0, headerHeight],
  //   outputRange: [0, -headerHeight],
  // });

  // const translateYNumber = React.useRef();

  // translateY.addListener(({value}) => {
  //   translateYNumber.current = value;
  // });

  // const handleScroll = Animated.event(
  //   [
  //     {
  //       nativeEvent: {
  //         contentOffset: {y: scrollY.current},
  //       },
  //     },
  //   ],
  //   {
  //     useNativeDriver: true,
  //   },
  // );

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

  const right = scrollY.interpolate({
    inputRange: [0, height * 0.8, height * 0.85],
    outputRange: [-200, -200, 15],
    extrapolate: 'clamp',
  });

  const scrollToTopOpacity = scrollY.interpolate({
    inputRange: [0, height * 0.8, height * 0.84, height * 0.85],
    outputRange: [0, 0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView mode="margin" style={styles.container}>
      <Animated.FlatList
        ref={ref}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        // onMomentumScrollEnd={handleSnap}
        data={eventProviders}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ListHeader />}
        initialNumToRender={3}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Sizing.x20,
          paddingTop: headerHeight,
        }}
        renderItem={({item, index}) => {
          return (
            <Animatable.View
              animation={'fadeInUp'}
              delay={index * 400}
              duration={400}
              useNativeDriver={true}>
              <EventCard data={item} />
            </Animatable.View>
          );
        }}
      />
      <Animated.View
        style={{
          backgroundColor: 'rgba(0,0,0,.7)',
          height: 50,
          width: 50,
          borderRadius: 30,
          position: 'absolute',
          bottom: 65,
          right,
          zIndex: 1,
          opacity: scrollToTopOpacity,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            ref.current?.scrollToOffset({
              offset: 0,
              animated: true,
            });
            // console.log('scroll To Top');
          }}>
          <Ionicons name="arrow-up" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    // backgroundColor: 'red',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 10,
  },
  subHeader: {
    height: headerHeight / 2,
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // paddingTop: 100,
  },
  mapButton: {
    position: 'absolute',
    bottom: Sizing.x30,
    right: Sizing.x30,
    height: Sizing.icons.x40,
    width: Sizing.icons.x40,
    borderRadius: Outlines.borderRadius.large,
    backgroundColor: Colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EventList;
