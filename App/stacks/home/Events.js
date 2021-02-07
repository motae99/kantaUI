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
import {Searchbar} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import EventPlanner from '../../components/cards/EventPlanerCard';
import EventCard from '../../components/cards/EventCard';

const {width, height} = Dimensions.get('window');

const SearchBarHieght = 54;
const EventList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={{backgroundColor: '#E5E5E5', flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <Image
        source={require('../../../assets/img/EventBack.jpg')}
        blurRadius={8}
        // style={{height: '100%', width: '100%', resizeMode: 'cover'}}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView>
        <View style={{height: 87, width}} />

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 18,
            height: SearchBarHieght,
          }}>
          {/* <View
            style={{
              flex: 5,
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: 15,
              marginRight: 12,
              padding: 16,
              justifyContent: 'center',
            }}> */}
          <Searchbar
            style={{
              flex: 5,
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: 15,
              marginRight: 12,
              // padding: 16,
              justifyContent: 'center',
              borderWidth: 0,
            }}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          {/* <Ionicons name="filter" size={24} color="#000" style={{flex: 4}} /> */}
          {/* <Text style={{paddingLeft: 16, flex: 4}}>Search Events</Text> */}
          {/* </View> */}
          <View
            style={{
              flex: 1,
              borderRadius: 15,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LinearGradient
              colors={['#55DAEA', '#219CAB']}
              style={StyleSheet.absoluteFillObject}
            />
            <Ionicons name="filter" size={24} color="#fff" />
          </View>
        </View>
        <View
          style={{
            // height: 300,
            width,
            // backgroundColor: 'gray',
            marginTop: 24,
            // marginBottom: 18,
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <EventPlanner />
            <EventPlanner />
            <EventPlanner />
            <EventPlanner />
            <EventPlanner />
          </ScrollView>
        </View>

        <View
          style={{
            // height: 300,
            width,
            // backgroundColor: 'gray',
            marginTop: 24,
            marginBottom: 18,
            // marginLeft: 18,
          }}>
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
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
            }}>
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
export default EventList;
