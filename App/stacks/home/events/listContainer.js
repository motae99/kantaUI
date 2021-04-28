/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
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
// import Header from 'components/headerTest';
// import Container from 'events/components/container';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
// import Animated from 'react-native-reanimated';
// import {useValues} from 'react-native-redash/lib/module/v1';

import {EventContext} from 'context/eventsContext';

const {width, height} = Dimensions.get('window');

const EventList = ({navigation}) => {
  const {eventProviders} = React.useContext(EventContext);
  // const scrollView = React.useRef(null);
  // const [scrollY] = useValues([0], []);

  return (
    <SafeAreaView mode="margin" style={styles.container}>
      {/* <Container {...{scrollY}} /> */}

      <Animated.FlatList
        // ref={scrollView}
        scrollEventThrottle={16}
        data={eventProviders}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={<ListHeader navigation={navigation} />}
        // onScroll={Animated.event([
        //   {
        //     nativeEvent: {
        //       contentOffset: {
        //         y: scrollY,
        //       },
        //     },
        //   },
        // ])}
        initialNumToRender={3}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Sizing.x20,
          // paddingTop: headerHeight,
          paddingTop: 100,
        }}
        renderItem={({item, index}) => {
          return (
            <Animatable.View
              animation={'fadeInUp'}
              delay={index * 400}
              duration={400}
              useNativeDriver={true}>
              <EventCard data={item} navigation={navigation} />
            </Animatable.View>
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default EventList;
