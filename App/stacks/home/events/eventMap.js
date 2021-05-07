/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, {useRef, useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';

import MapView, {
  MAP_TYPES,
  ProviderPropType,
  Polyline,
  Marker,
  Polygon,
  Overlay,
  Circle,
  AnimatedRegion,
} from 'react-native-maps';

import Card from './components/EventMapCard';

import {EventContext} from 'context/eventsContext';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width * 0.9;

const region = {
  latitude: 17.4126274,
  longitude: 78.2679583,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
};

const eventMap = ({navigation}) => {
  const {eventProviders} = useContext(EventContext);

  const [current, setCurrent] = useState(0);
  const mapRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const cardlList = useRef();

  const onViewRef = useRef(({viewableItems, changed}) => {
    setCurrent(viewableItems[0]?.index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  React.useEffect(() => {
    setTimeout(() => {
      const {coordinates} = eventProviders[current];
      mapRef.current.animateToRegion(
        {
          latitude: coordinates._latitude,
          longitude: coordinates._longitude,
          latitudeDelta: 0.00864195044303443,
          longitudeDelta: 0.000142817690068,
        },
        350,
      );
    }, 10);
  }, [current, eventProviders]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} initialRegion={region} style={styles.container}>
        {eventProviders.map((marker, index) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 2, 1],
            extrapolate: 'clamp',
          });

          const scaleStyle = {
            transform: [
              {
                scale,
              },
            ],
          };

          const coordinates = {
            latitude: marker.coordinates._latitude,
            longitude: marker.coordinates._longitude,
          };
          return (
            <MapView.Marker key={index} coordinate={coordinates}>
              <Animated.View style={[styles.markerWrap, {opacity}]}>
                <Animated.View style={[styles.ring, scaleStyle]} />
                <View style={styles.marker} />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>

      <Animated.FlatList
        ref={cardlList}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={eventProviders}
        renderItem={({item}) => (
          // <View style={{marginHorizontal: 18}}>
          <Card data={item} navigation={navigation} />
          // </View>
        )}
        // contentContainerStyle={
        //   {
        //     // alignItems: 'center',
        //     // justifyContent: 'center',
        //     // marginHorizontal: 18,
        //   }
        // }
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height,
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  marker: {
    position: 'absolute', // <-- moved from ring
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 25,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  Header: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  BottomContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    width: 350,
    height: '15%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
  },

  map: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: '#000000',
  },
  linearGradient: {
    width: '100%',
    height: '25%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    fontWeight: 'normal',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default eventMap;
