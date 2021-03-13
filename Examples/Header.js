import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {onScroll} from 'react-native-redash';
import Animated from 'react-native-reanimated';

const HEADER_HEIGHT = 60;
const {diffClamp, interpolate} = Animated;

const Header = (props) => {
  const diffClampY = diffClamp(props.y, 0, HEADER_HEIGHT);
  const translateY = interpolate(diffClampY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });
  return (
    <Animated.View
      style={{
        height: HEADER_HEIGHT,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 2,
        backgroundColor: '#ffb74d',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{translateY: translateY}],
      }}>
      <Text>Header</Text>
    </Animated.View>
  );
};

const List = (props) => {
  return (
    // Use onScroll to update the y value
    <Animated.ScrollView
      horizontal={true}
      onScroll={Animated.event([
        {
          nativeEvent: {
            contentOffset: {
              x: props.y,
            },
          },
        },
      ])}
      scrollEventThrottle={16}
      contentContainerStyle={{paddingTop: 50}}>
      {Array.from({length: 10}, (v, k) => (
        <Image
          style={{width: '100%', height: 200, marginTop: 50}}
          key={k + ''}
          source={{uri: 'https://picsum.photos/200/300'}}
        />
      ))}
    </Animated.ScrollView>
  );
};

const Parent = () => {
  // Create an "y" animated value and pass it down to the children
  const y = new Animated.Value(0);

  return (
    <View>
      <Header y={y} />
      <List y={y} />
    </View>
  );
};

export default Parent;
