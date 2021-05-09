/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSpringTransition} from 'react-native-redash/lib/module/v1';
import {EventContext} from 'context/eventsContext';
import Animated from 'react-native-reanimated';
const {interpolate, Extrapolate} = Animated;
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    position: 'absolute',
    bottom: 8,
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 5,
    left: 15,
    zIndex: 2,
  },
  buttonText: {...Typography.header.x10, color: Colors.neutral.s500},
  header: {
    height: 40,
    backgroundColor: Colors.neutral.s200,
    width,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerText: {
    ...Typography.header.x10,
    letterSpacing: 2,
    color: Colors.neutral.s500,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    width,
    paddingLeft: Sizing.layout.x5,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.neutral.s300,
    borderLeftWidth: 8,
  },
  itemText: {
    paddingLeft: 10,
    ...Typography.body.x20,
    color: Colors.neutral.s400,
  },
});
const Header = () => {
  const {sortBy, setSortBy} = React.useContext(EventContext);

  const [open, setOpen] = useState(false);
  const transition = useSpringTransition(open, {duration: 100});

  const height = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [55, 280],
    extrapolate: Extrapolate.CLAMP,
  });

  const toWidth = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [55, width],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = interpolate(transition, {
    inputRange: [0, 0.1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const oppOpacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <>
      <Animated.View style={[styles.container, {height, width: toWidth}]}>
        <Animated.View style={[styles.button, {opacity}]}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <MaterialCommunityIcons
              name="sort-variant"
              size={30}
              color={Colors.neutral.s500}
            />
            <Text style={styles.buttonText}>Sort</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{opacity: oppOpacity, backgroundColor: '#fff'}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>SORT BY</Text>
          </View>
          <Animated.View style={{opacity: oppOpacity}}>
            <TouchableOpacity
              onPress={() => {
                setSortBy('rate');
                setOpen(false);
              }}
              style={[
                styles.itemContainer,
                {
                  borderLeftColor:
                    sortBy === 'rate'
                      ? Colors.primary.brand
                      : Colors.neutral.white,
                },
              ]}>
              <SimpleLineIcons
                name="fire"
                size={24}
                color={
                  sortBy === 'rate' ? Colors.primary.brand : Colors.neutral.s400
                }
              />
              <Text style={styles.itemText}>User Rating</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSortBy('low');
                setOpen(false);
              }}
              style={[
                styles.itemContainer,
                {
                  borderLeftColor:
                    sortBy === 'low'
                      ? Colors.primary.brand
                      : Colors.neutral.white,
                },
              ]}>
              <Feather
                name="arrow-down"
                size={24}
                color={
                  sortBy === 'low' ? Colors.primary.brand : Colors.neutral.s400
                }
              />
              <Text style={styles.itemText}>Low to High Prices</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortBy('high');
                setOpen(false);
              }}
              style={[
                styles.itemContainer,
                {
                  borderLeftColor:
                    sortBy === 'high'
                      ? Colors.primary.brand
                      : Colors.neutral.white,
                },
              ]}>
              <Feather
                name="arrow-up"
                size={24}
                color={
                  sortBy === 'high' ? Colors.primary.brand : Colors.neutral.s400
                }
              />
              <Text style={styles.itemText}>High to Low Prices</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortBy('distance');
                setOpen(false);
              }}
              style={[
                styles.itemContainer,
                {
                  borderLeftColor:
                    sortBy === 'distance'
                      ? Colors.primary.brand
                      : Colors.neutral.white,
                },
              ]}>
              <Ionicons
                name="location-outline"
                size={24}
                color={
                  sortBy === 'distance'
                    ? Colors.primary.brand
                    : Colors.neutral.s400
                }
              />
              <Text style={styles.itemText}>Distance</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default Header;
