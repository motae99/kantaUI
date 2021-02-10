import React from 'react';
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

import imagesData from './components/eventData';
import Card from './components/EventMapCard';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width - 40;

const DATA = [
  {
    CateringPrice: '30',
    address: 'Address and lication',
    cabacity: '400',
    contactNo: '0922066609',
    coordinate: {latitude: 17.411549, longitude: 78.494381},
    day: true,
    email: 'me@yahoo.com',
    // files: imagesData.files[0],
    files: [[Object], [Object], [Object]],
    hallRenting: '5000',
    id: '3',
    isHearted: false,
    key: 'NzE0afBtUOfYLg5krWrbVSPoCcB3',
    night: true,
    ownerId: 'NzE0afBtUOfYLg5krWrbVSPoCcB3',
    partyHallName: 'Spark city',
    photographing: '400',
    timestamp: 1579602565368,
    videoShooting: '100',
    weddingStage: '300',
  },
  {
    CateringPrice: '',
    address: 'Hshygg jhaggg adress',
    cabacity: '100',
    contactNo: '09764323678',
    coordinate: {latitude: 17.411249, longitude: 78.189381},
    day: true,
    email: 'mo@hotmail.com',
    files: [[Object], [Object], [Object]],
    hallRenting: '3000',
    id: '2',
    isHearted: false,
    key: 'SZit9ewC3fYpx05WvI4PzU2GzQE3',
    night: true,
    ownerId: 'SZit9ewC3fYpx05WvI4PzU2GzQE3',
    partyHallName: 'Spark',
    photographing: '',
    timestamp: 1579602940830,
    videoShooting: '',
    weddingStage: '',
  },
  {
    address: 'Address of u ou ',
    cabacity: '100',
    contactNo: '09864333567',
    coordinate: {latitude: 17.426646, longitude: 78.42827},
    email: 'mo@tail.com',
    files: [[Object], [Object], [Object]],
    hallRenting: '5788',
    id: '5',
    isHearted: false,
    key: '9Cg4qvaHKvaWNolba8F9XrU3Wxx1',
    ownerId: '9Cg4qvaHKvaWNolba8F9XrU3Wxx1',
    partyHallName: 'Test try',
    timestamp: 1579603373833,
  },
  {
    CateringPrice: '',
    address: 'Adress should be my current location',
    cabacity: '400',
    contactNo: '09876554332',
    coordinate: {latitude: 17.441549, longitude: 78.489381},
    coords: {_latitude: 17.3929717, _longitude: 78.4565447},
    day: true,
    email: 'test@yahoo.com',
    files: [[Object], [Object], [Object]],
    hallRenting: '9000',
    id: '4',
    isHearted: false,
    key: 'LOQ3NBuIaIeAwVObUh2L7cLoXNE2',
    night: true,
    ownerId: 'LOQ3NBuIaIeAwVObUh2L7cLoXNE2',
    partyHallName: 'With geo location',
    photographing: '',
    timestamp: 1579662790561,
    videoShooting: '',
    weddingStage: '',
  },
];

const region = {
  latitude: 17.4126274,
  longitude: 78.2679583,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
};

const eventMap = ({navigation}) => {
  // componentDidMount() {
  //   scrollX.addListener(({value}) => {
  //     let index = Math.floor(value / CARD_WIDTH); // animate 30% away from landing on the next item
  //     if (index >= DATA.length) {
  //       index = DATA.length - 1;
  //     }
  //     if (index <= 0) {
  //       index = 0;
  //     }

  //     clearTimeout(this.regionTimeout);

  //     this.regionTimeout = setTimeout(() => {
  //       if (this.index !== index) {
  //         this.index = index;
  //         const {coordinate} = DATA[index];
  //         mapRef.animateToRegion(
  //           {
  //             ...coordinate,
  //             latitudeDelta: 0.00864195044303443,
  //             longitudeDelta: 0.000142817690068,
  //           },
  //           350,
  //         );
  //       }
  //     }, 10);
  //   });
  // }
  // const itemKey = 'NzE0afBtUOfYLg5krWrbVSPoCcB3';
  // const selectedItemIndex = DATA.findIndex((i) => i.key === iteKey);

  const [current, setCurrent] = React.useState(0);
  const mapRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const cardlList = React.useRef();

  const onViewRef = React.useRef(({viewableItems, changed}) => {
    setCurrent(viewableItems[0]?.index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  React.useEffect(() => {
    clearTimeout(regionTimeout);

    const regionTimeout = setTimeout(() => {
      const {coordinate} = DATA[current];
      mapRef.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: 0.00864195044303443,
          longitudeDelta: 0.000142817690068,
        },
        350,
      );
    }, 10);
  }, [current]);

  // React.useEffect(() => {
  //   const currentIndex = Math.floor(scrollX / CARD_WIDTH);
  //   if (currentIndex >= DATA.length) {
  //     setIndex(DATA.length - 1);
  //   }
  //   if (currentIndex <= 0) {
  //     setIndex(0);
  //   }

  //   console.log('index now is ', currentIndex);

  //   // clearTimeout(regionTimeout);

  //   // const regionTimeout = setTimeout(() => {
  //   //   if (currentIndex !== index) {
  //   //     setIndex(currentIndex);
  //   //     const {coordinate} = DATA[index];
  //   //     mapRef.animateToRegion(
  //   //       {
  //   //         ...coordinate,
  //   //         latitudeDelta: 0.00864195044303443,
  //   //         longitudeDelta: 0.000142817690068,
  //   //       },
  //   //       350,
  //   //     );
  //   //   }
  //   // }, 10);
  // }, [index, scrollX]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} initialRegion={region} style={styles.container}>
        {DATA.map((marker, index) => {
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
            outputRange: [1, 2.5, 1],
            extrapolate: 'clamp',
          });

          const scaleStyle = {
            transform: [
              {
                scale,
              },
            ],
          };

          return (
            <MapView.Marker key={index} coordinate={marker.coordinate}>
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
        data={DATA}
        renderItem={({item}) => <Card data={item} navigation={navigation} />}
        keyExtractor={(item) => String(item.key)}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
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
    borderRadius: 24,
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
