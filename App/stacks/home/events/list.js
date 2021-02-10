/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import EventPlanner from './components/EventPlanerCard';
import EventCard from './components/EventCard';
import Searchbar from './components/SearchBar';
import DATA from './components/eventData';

const {width, height} = Dimensions.get('window');

const Header = () => {
  return (
    <View style={{marginTop: 87}}>
      <Searchbar />
      <View
        style={{
          width,
          marginTop: 24,
          marginLeft: 18,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontWeight: '600',
            fontSize: 20,
            marginLeft: 4,
            color: 'rgba( 80,39,107,1)',
            marginBottom: 18,
          }}>
          Event Planners
        </Text>
        <Animated.FlatList
          data={DATA}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          pagingEnabled={true}
          decelerationRate={'fast'}
          horizontal
          renderItem={({item, index}) => {
            return <EventPlanner data={item} />;
          }}
        />
        <View
          style={{
            marginTop: 24,
            marginBottom: 18,
          }}
        />
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontWeight: '600',
            fontSize: 20,
            marginLeft: 18,
            color: 'rgba( 80,39,107,1)',
            marginBottom: 18,
          }}>
          Event Halls
        </Text>
      </View>
    </View>
  );
};
const EventList = () => {
  return (
    <View style={{backgroundColor: '#E5E5E5', flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      {/* <Image
        source={require('../../../../assets/img/EventBack.jpg')}
        blurRadius={8}
        // style={{height: '100%', width: '100%', resizeMode: 'cover'}}
        style={StyleSheet.absoluteFillObject}
      /> */}

      <View
        style={{
          // height: 300,
          width,
          // backgroundColor: 'gray',
          marginTop: 24,
          marginBottom: 18,
          // marginLeft: 18,
        }}>
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<Header />}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 18,
          }}
          renderItem={({item, index}) => {
            return <EventCard data={item} />;
          }}
        />
      </View>
    </View>
  );
};
export default EventList;
