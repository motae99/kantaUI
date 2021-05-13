import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
// import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width * 0.9;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: (width * 0.1) / 2,
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    // marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    // flex: 1,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
  },
  textContent: {
    // flex: 4,
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 25,
  },
  cardtitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  },
  cardDescription: {
    fontSize: 15,
    color: 'white',
  },
});

export default memo(({data}) => {
  const navigation = useNavigation();

  const [selectedTime, setSelectedTime] = React.useState('evening');
  const [current, setCurrent] = React.useState(0);
  // console.log(print_r(data.files));

  return (
    <View style={styles.card}>
      {/* <SharedElement id={`item.${data.key}.image`}> */}
      <Image
        style={styles.cardImage}
        source={{
          uri: data.files[0].uri,
          resizeMode: 'cover',
        }}
      />
      {/* </SharedElement> */}
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('EventDetail', {
            selectedItem: data,
            selectedImageIndex: current,
          });
        }}>
        <View style={styles.textContent}>
          <Text numberOfLines={1} style={styles.cardtitle}>
            {data.name}
          </Text>
          <Text numberOfLines={1} style={styles.cardDescription}>
            {data.address}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});
