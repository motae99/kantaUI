/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ListHeader from 'eventsComponents/listHeader';
import EventCard from 'eventsComponents/EventCard';
import DATA from 'eventsComponents/eventData';
// import DATA from '_events/components/eventData';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

const EventList = ({navigation}) => {
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
          width,
          marginTop: 24,
          marginBottom: 18,
        }}>
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeader navigation={navigation} />}
          initialNumToRender={3}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 18,
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
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EventMap');
        }}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          height: 34,
          width: 34,
          borderRadius: 16,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name="map" size={18} color="#000" />
      </TouchableOpacity>
    </View>
  );
};
export default EventList;
