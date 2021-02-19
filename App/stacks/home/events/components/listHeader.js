/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  Animated,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';

import EventPlanner from './EventPlanerCard';
import Searchbar from './SearchBar';
import DATA from './eventData';
const {width, height} = Dimensions.get('window');

const SIZE = 64;
const ICON_SIZE = SIZE * 0.6;
const SPACING = 12;
const s = width * 0.64;
const ITEM_WIDTH = s;
const ITEM_HEIGHT = s * 1.4;
const RADIUS = 18;
const FULL_SIZE = s + SPACING * 2;

const listHeader = ({navigation}) => {
  const scrollx = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{marginTop: 87}}>
      <Searchbar />
      <View
        style={{
          width,
          marginTop: 24,
          // paddingLeft: 18,
          // flex: 1,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontWeight: '600',
            fontSize: 20,
            paddingLeft: SPACING,
            color: 'rgba( 80,39,107,1)',
            marginBottom: 18,
          }}>
          Event Planners
        </Text>
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          snapToInterval={FULL_SIZE}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={1}
          horizontal
          decelerationRate="fast"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollx}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * FULL_SIZE,
              index * FULL_SIZE,
              (index + 1) * FULL_SIZE,
            ];
            const translateX = scrollx.interpolate({
              inputRange,
              outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
            });
            const scale = scrollx.interpolate({
              inputRange,
              outputRange: [1, 1.2, 1],
            });
            return (
              <Animatable.View
                animation={'slideInRight'}
                delay={index * 100}
                duration={300}
                useNativeDriver={true}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PlannerDetail', {item, index});
                  }}
                  style={styles.itemContainer}>
                  <SharedElement
                    id={`item.${item.key}.image`}
                    style={StyleSheet.absoluteFillObject}>
                    <View
                      style={[
                        StyleSheet.absoluteFillObject,
                        {overflow: 'hidden', borderRadius: RADIUS},
                      ]}>
                      <Animated.Image
                        source={item.files[index].image}
                        style={[
                          // StyleSheet.absoluteFillObject,
                          {
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            resizeMode: 'cover',
                            transform: [{scale}],
                          },
                        ]}
                      />
                    </View>
                  </SharedElement>
                  <SharedElement
                    id={`item.${item.key}.title`}
                    style={styles.location}>
                    <Animated.Text
                      style={[styles.location, {transform: [{translateX}]}]}>
                      {item.name}
                    </Animated.Text>
                  </SharedElement>
                  <View style={styles.days}>
                    <Text style={styles.daysValue}>{item.rate}</Text>
                    <Text style={styles.daysLabel}>Rate</Text>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            );
          }}
        />
        <View
          style={{
            marginTop: SPACING,
            marginBottom: SPACING,
          }}
        />
        <Animatable.View
          animation={'fadeInUp'}
          delay={200}
          duration={300}
          useNativeDriver={true}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontWeight: '600',
              fontSize: 20,
              color: 'rgba( 80,39,107,1)',
              marginBottom: SPACING,
              paddingLeft: SPACING,
            }}>
            Event Halls
          </Text>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
    // overflow: 'hidden',
  },
  location: {
    fontSize: 30,
    color: '#fff',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING,
    left: SPACING,
  },
  days: {
    position: 'absolute',
    left: SPACING,
    bottom: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#219CAB',
  },
  daysLabel: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 18,
  },
  daysValue: {
    color: '#fff',
    fontSize: 10,
  },
});

export default listHeader;
