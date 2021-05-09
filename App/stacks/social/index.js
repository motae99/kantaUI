// // import firebase from 'firebase/app';
// // import 'firebase/firestore';
// import React, {useEffect} from 'react';
// import firestore from '@react-native-firebase/firestore';
// import * as geofirestore from 'geofirestore';
// import Geolocation from '@react-native-community/geolocation';

// const Test = () => {
//   Geolocation.getCurrentPosition((info) => console.log(info));

//   // const GeoFirestore = geofirestore.initializeApp(firestore());
//   // const geocollection = GeoFirestore.collection('eventProviders');
//   // const query = geocollection.near({
//   //   center: new firestore.GeoPoint(15.5863, 32.5426),
//   //   radius: 1000,
//   // });
//   // query.get().then((value) => {
//   //   // All GeoDocument returned by GeoQuery, like the GeoDocument added above
//   //   console.log(value.docs);
//   // });

//   return null;
// };
// export default Test;

// import React from 'react';
// import firestore from '@react-native-firebase/firestore';
// import geofire from 'geofire';
// const GeoTest = () => {
//   // Compute the GeoHash for a lat/lng point
//   const lat = 51.5074;
//   const lng = 0.1278;
//   const hash = new geofire.geohashForLocation([lat, lng]);

//   // Add the hash and the lat/lng to the document. We will use the hash
//   // for queries and the lat/lng for distance comparisons.
//   const londonRef = firestore()
//     .collection('eventServices')
//     .doc('1A9xrlGd4mseFuABefeQ');
//   londonRef
//     .update({
//       geohash: hash,
//       lat: lat,
//       lng: lng,
//     })
//     .then(() => {
//       console.log('updated Done');
//     });
// };

// export default GeoTest;

// // Find cities within 50km of London
// const center = [51.5074, 0.1278];
// const radiusInM = 50 * 1000;

// // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
// // a separate query for each pair. There can be up to 9 pairs of bounds
// // depending on overlap, but in most cases there are 4.
// const bounds = geofire.geohashQueryBounds(center, radiusInM);
// const promises = [];
// for (const b of bounds) {
//   const q = db.collection('cities')
//     .orderBy('geohash')
//     .startAt(b[0])
//     .endAt(b[1]);

//   promises.push(q.get());
// }

// // Collect all the query results together into a single list
// Promise.all(promises).then((snapshots) => {
//   const matchingDocs = [];

//   for (const snap of snapshots) {
//     for (const doc of snap.docs) {
//       const lat = doc.get('lat');
//       const lng = doc.get('lng');

//       // We have to filter out a few false positives due to GeoHash
//       // accuracy, but most will match
//       const distanceInKm = geofire.distanceBetween([lat, lng], center);
//       const distanceInM = distanceInKm * 1000;
//       if (distanceInM <= radiusInM) {
//         matchingDocs.push(doc);
//       }
//     }
//   }

//   return matchingDocs;
// }).then((matchingDocs) => {
//   // Process the matching documents
//   // ...
// });

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import faker from 'faker';
import i18n, {isRTL} from 'utils/i18n';

// import {StatusBar} from 'expo-status-bar';

const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const images = [
  'https://images.pexels.com/photos/1799912/pexels-photo-1799912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1758101/pexels-photo-1758101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1698394/pexels-photo-1698394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1684429/pexels-photo-1684429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

faker.seed(10);

const DATA = [...Array(images.length).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: images[i],
    title: faker.commerce.productName(),
    subtitle: faker.company.bs(),
    price: faker.finance.amount(80, 200, 0),
  };
});
const SPACING = 20;

const Content = ({item}) => {
  return (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 16,
          textTransform: 'uppercase',
        }}
        numberOfLines={1}
        adjustsFontSizeToFit>
        {item.title}
      </Text>
      <Text style={{fontSize: 12, opacity: 0.4}}>{item.subtitle}</Text>
      <View style={{flexDirection: 'row', marginTop: SPACING}}>
        <Text
          style={{
            fontSize: 42,
            letterSpacing: 3,
            fontWeight: '900',
            marginRight: 8,
          }}>
          {item.price}
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 36,
            fontWeight: '800',
            alignSelf: 'flex-end',
          }}>
          USD
        </Text>
      </View>
    </>
  );
};

export default () => {
  const ref = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const [index, setIndex] = React.useState(0);
  return (
    <View style={{backgroundColor: '#A5F1FA', flex: 1}}>
      <StatusBar hidden />
      <SafeAreaView style={{marginTop: SPACING * 4}}>
        <View style={{height: IMAGE_HEIGHT * 2.1}}>
          <Animated.FlatList
            ref={ref}
            data={isRTL ? DATA.reverse() : DATA}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            bounces={false}
            style={{flexGrow: 0}}
            contentContainerStyle={{
              height: IMAGE_HEIGHT + SPACING * 2,
              paddingHorizontal: SPACING * 2,
              flexDirection: isRTL ? 'row-reverse' : 'row',

              zIndex: 99999,
            }}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(ev) => {
              setIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            renderItem={({item, index}) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [50, 0, 20],
              });
              return (
                <Animated.View
                  style={{
                    width,
                    opacity,
                    paddingVertical: SPACING,
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_HEIGHT,
                      resizeMode: 'cover',
                    }}
                  />
                </Animated.View>
              );
            }}
          />
          <View
            style={{
              width: IMAGE_WIDTH,
              alignItems: 'center',
              paddingHorizontal: SPACING * 2,
              marginLeft: SPACING * 2,
              zIndex: 99,
            }}>
            {DATA.map((item, index) => {
              const inputRange = [
                (index - 0.2) * width,
                index * width,
                (index + 0.2) * width,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });
              const rotateY = scrollX.interpolate({
                inputRange,
                outputRange: ['45deg', '0deg', '45deg'],
              });
              return (
                <Animated.View
                  key={index}
                  style={{
                    position: 'absolute',
                    opacity,
                    transform: [{perspective: IMAGE_WIDTH * 4}, {rotateY}],
                  }}>
                  <Content item={item} />
                </Animated.View>
              );
            })}
          </View>
          <Animated.View
            style={{
              width: IMAGE_WIDTH + SPACING * 2,
              position: 'absolute',
              backgroundColor: 'white',
              backfaceVisibility: 'visible',
              zIndex: -1,
              top: SPACING * 2,
              left: SPACING,
              bottom: 0,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              transform: [
                {perspective: IMAGE_WIDTH * 4},
                {
                  rotateY: progress.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ['0deg', '90deg', '180deg'],
                  }),
                },
              ],
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: IMAGE_WIDTH + SPACING * 4,
            paddingHorizontal: SPACING,
            paddingVertical: SPACING,
          }}>
          <TouchableOpacity
            onPress={() => {
              ref?.current?.scrollToOffset({
                offset: (index - 1) * width,
                animated: true,
              });
            }}
            disabled={index === 0}
            style={{opacity: index === 0 ? 0.2 : 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="swapleft" size={42} color="black" />
              <Text style={{fontSize: 12, fontWeight: '800'}}>PREV</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ref?.current?.scrollToOffset({
                offset: (index + 1) * width,
                animated: true,
              });
            }}
            disabled={index === DATA.length - 1}
            style={{opacity: index === DATA.length - 1 ? 0.2 : 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, fontWeight: '800'}}>NEXT</Text>
              <AntDesign name="swapright" size={42} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
