/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import codePush from 'react-native-code-push';

const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const { width, height } = Dimensions.get('window');
const bgs = ['#28abb9', '#6a097d', '#01c5c4', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: require('./assets/Lottie/first.json'),
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: require('./assets/Lottie/second.json'),
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: require('./assets/Lottie/first.json'),
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: require('./assets/Lottie/second.json'),
  },
];

const Indicator = ({ scrollx }) => {
  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollx.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.4, 0.9, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              opacity,
              margin: 10,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollx }) => {
  const backgroundColor = scrollx.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Square = ({ scrollx }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollx, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['25deg', '0deg', '25deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-30, -height, -30],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        borderRadius: 86,
        backgroundColor: '#fff',
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const App = () => {
  const scrollx = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Backdrop scrollx={scrollx} />
      <Square scrollx={scrollx} />
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollx } } }],
          { useNativeDriver: false },
        )}
        pagingEnabled
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: 'center' }}>
                {/* <Image
                  source={{uri: item.image}}
                  style={{
                    width: width / 2,
                    height: height / 4,
                    resizeMode: 'contain',
                  }}
                /> */}
                <LottieView
                  style={{ width: width / 2, height: height / 3 }}
                  source={item.image}
                  autoPlay
                  loop
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    color: '#1a097f',
                    fontWeight: '800',
                    fontSize: 28,
                    marginBottom: 10,
                  }}>
                  {item.title}
                </Text>
                <Text style={{ color: '#fff', fontWeight: '300' }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollx={scrollx} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: 'green',
    // paddingTop: Platform.OS === 'android' ? 25 : 0,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});

export default codePush(codePushOptions)(App);
