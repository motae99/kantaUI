// /* eslint-disable react-native/no-inline-styles */
// import * as React from 'react';
// import {ScrollView} from 'react-native';
// import EventCard from './App/components/cards/EventCard';
// import codePush from 'react-native-code-push';

// const codePushOptions = {
//   updateDialog: true,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };
// const App = () => {
//   return (
//     <ScrollView
//       style={{marginTop: 100}}
//       contentContainerStyle={{marginVertical: 20}}>
//       <EventCard />
//       <EventCard />
//       <EventCard />
//       <EventCard />
//       <EventCard />
//       <EventCard />
//     </ScrollView>
//   );
// };
// export default codePush(codePushOptions)(App);

// /* eslint-disable react-native/no-inline-styles */

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import codePush from 'react-native-code-push';
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const {width, height} = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.82;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const mymovies = [
  {
    key: '123',
    title: 'BEAUTY',
    poster: require('./assets/img/beauty.jpeg'),
    backdrop: require('./assets/img/beauty.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
  {
    key: '234',
    title: 'HOTELS',
    poster: require('./assets/img/hotels.jpeg'),
    backdrop: require('./assets/img/hotels.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
  {
    key: '345',
    title: 'MAKEUP ARTISTS',
    poster: require('./assets/img/makeup.jpeg'),
    backdrop: require('./assets/img/makeup.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
  {
    key: '456',
    title: 'PHOTOGRAPHY',
    poster: require('./assets/img/photography.jpeg'),
    backdrop: require('./assets/img/photography.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
  {
    key: '567',
    title: 'EVENTS',
    poster: require('./assets/img/events.jpeg'),
    backdrop: require('./assets/img/events.jpeg'),
    description:
      ' some text some text some text some text some text some text some text some text some text',
    releaseDate: '12',
  },
];

const Backdrop = ({movies, scrollX}) => {
  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          // const translateX = scrollX.interpolate({
          //   inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
          //   outputRange: [0, width],
          //   // extrapolate:'clamp'
          // });
          const opacity = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, 1],
            // extrapolate:'clamp'
          });
          // let back = require(item.backdrop)
          return (
            <View>
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: 'absolute',
                  // width: translateX,
                  opacity,
                  height,
                  // overflow: 'hidden',
                }}>
                <Image
                  source={item.backdrop}
                  style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    position: 'absolute',
                  }}
                />
                <LinearGradient
                  colors={['black', 'rgba(0, 0, 0, 0)', 'white']}
                  style={{
                    height: BACKDROP_HEIGHT,
                    width,
                    position: 'absolute',
                    top: 0,
                  }}
                />
                <View
                  style={{
                    width: 255,
                    position: 'absolute',
                    top: 130,
                    left: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat',
                      fontWeight: '600',
                      textAlign: 'center',
                      fontSize: 34,
                      color: '#fff',
                    }}>
                    {item.title}
                  </Text>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />

      <View style={{position: 'absolute', top: 50, left: 20}}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18,
            color: '#fff',
            letterSpacing: 3,
          }}>
          KANTA BOOK
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: 'white',
        }}>
        <Image
          source={{
            uri:
              'https://www.flaticon.com/svg/vstatic/svg/4061/4061283.svg?token=exp=1610923650~hmac=1dd0068cddddc21a29b99511cf3ee25c',
          }}
          style={{width: width / 2, height: height / 4, resizeMode: 'cover'}}
        />
      </View>
    </View>
  );
};

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = mymovies; //await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{key: 'empty-left'}, ...mymovies, {key: 'empty-right'}]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [160, 100, 160],
            extrapolate: 'clamp',
          });

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
            extrapolate: 'clamp',
          });

          // const opacity = scrollX.interpolate({
          //   inputRange,
          //   outputRange: [0.8, 1, 0.8],
          //   extrapolate: 'clamp',
          // });

          return (
            <View
              style={{
                width: ITEM_SIZE,
                // justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  // opacity,
                  backgroundColor: '#fff',
                  transform: [{translateY}],
                  borderColor: 'white',
                  borderRadius: 34,
                }}>
                <View
                  style={{
                    width: '98%',
                    height: ITEM_SIZE,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 34,
                  }}>
                  <Animated.Image
                    source={item.poster}
                    style={[styles.posterImage, {transform: [{translateX}]}]}
                  />
                </View>
                {/* <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text> */}
                {/* <Rating rating={item.rating} />
                <Genres genres={item.genres} /> */}
                <Text
                  style={{
                    fontFamily: 'Montserrat',
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#3A4154',
                    lineHeight: 18,
                    marginVertical: 10,
                    width: ITEM_SIZE * 0.7,
                  }}
                  numberOfLines={3}>
                  {item.description}
                </Text>
                <TouchableOpacity
                  style={{
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 60,
                    width: '95%',
                    backgroundColor: '#2C3449',
                    borderRadius: 10,
                  }}
                  onPress={() => {}}>
                  <Text
                    style={{color: '#fff', fontSize: 28, textAlign: 'center'}}>
                    See All
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: ITEM_SIZE + 40,
    height: ITEM_SIZE,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
export default codePush(codePushOptions)(App);