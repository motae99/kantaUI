/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const CardWidth = height / 2.15;
const CardHight = height / 3.8;
const files = [
  {
    key: '123',
    image: require('../../../assets/img/beauty.jpeg'),
  },
  {
    key: '234',
    image: require('../../../assets/img/hotels.jpeg'),
  },
  {
    key: '345',
    image: require('../../../assets/img/makeup.jpeg'),
  },
  {
    key: '456',
    image: require('../../../assets/img/photography.jpeg'),
  },
  {
    key: '567',
    image: require('../../../assets/img/events.jpeg'),
  },
];

const Indicator = ({scrollx}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        right: 30,
        flexDirection: 'row',
      }}>
      {files.map((_, i) => {
        const inputRange = [
          (i - 1) * CardWidth,
          i * CardWidth,
          (i + 1) * CardWidth,
        ];
        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [1, 1, 1],
          extrapolate: 'clamp',
        });

        const color = scrollx.interpolate({
          inputRange,
          outputRange: ['rgba(0, 0, 0, 0)', '#fff', 'rgba(0, 0, 0, 0)'],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 5,
              width: 5,
              borderRadius: 2.5,
              backgroundColor: color,
              opacity,
              margin: 2,
              borderWidth: 0.5,
              borderColor: '#fff',
              borderColorOpacity: opacity,
              // transform: [{scale}],
            }}
          />
        );
      })}
    </View>
  );
};

const EventCard = () => {
  const scrollx = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        height: CardHight,
        width: CardWidth,
        alignSelf: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 18,
      }}>
      <Animated.FlatList
        data={files}
        keyExtractor={(item) => item.key}
        pagingEnabled={true}
        decelerationRate={'fast'}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollx}}}],
          {useNativeDriver: false},
        )}
        snapToInterval={CardWidth}
        renderItem={({item, index}) => {
          return (
            <View
              style={
                {
                  // width: CardWidth,
                  // height: CardHight,
                  // borderRadius: 16,
                  // overflow: 'hidden',
                }
              }>
              <Image
                source={item.image}
                style={[
                  {
                    width: CardWidth,
                    height: CardHight,
                    resizeMode: 'cover',
                  },
                ]}
              />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'black']}
                style={{
                  height: CardHight / 3,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
      <Indicator scrollx={scrollx} />

      <View
        style={{
          position: 'absolute',
          top: 12,
          right: 18,
          height: 28,
          width: 28,
          backgroundColor: '#fff',
          borderRadius: 36 / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name="heart" size={18} color="#219CAB" />
      </View>

      <View
        style={{
          position: 'absolute',
          height: 28,
          top: 12,
          left: 18,
          flexDirection: 'row',
          marginRight: 12,
        }}>
        <View
          style={{
            height: 28,
            width: 28,
            backgroundColor: '#fff',
            borderRadius: 36 / 2,
            marginRight: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto name="day-sunny" size={18} color="black" />
        </View>
        <View
          style={{
            height: 28,
            width: 28,
            backgroundColor: '#fff',
            borderRadius: 36 / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="weather-night"
            size={18}
            color="black"
          />
        </View>
      </View>
      <Text
        style={{
          color: '#fff',
          position: 'absolute',
          bottom: 38,
          fontSize: 14,
          fontWeight: 'bold',
          letterSpacing: 2,
          fontFamily: 'Montserrat',
          left: 24,
        }}>
        Royal Palace Party Hall
      </Text>
      <View
        style={{
          color: '#fff',
          position: 'absolute',
          bottom: 12,
          left: 24,
          flexDirection: 'row',
          width: width / 3,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginRight: 12,
            }}>
            <FontAwesome name="star" size={18} color="#219CAB" />
          </View>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
              letterSpacing: 2,
              fontFamily: 'Montserrat',
            }}>
            4.9
          </Text>
        </View>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
            letterSpacing: 2,
            fontFamily: 'Montserrat',
          }}>
          $100
        </Text>
      </View>
    </View>
  );
};
export default EventCard;
