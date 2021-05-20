/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import Heart from 'photo/components/heart';
import {cardWidth, cardHeigh, fullBorderRadius} from './FoldingStyle';

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardHeigh,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: fullBorderRadius,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: fullBorderRadius,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  heartContainer: {
    // flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    height: 35,
    width: 35,
    borderRadius: 40,
    justifyContent: 'center',
  },

  ratingLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  line: {
    width: '75%',
    borderBottomColor: Colors.neutral.s300,
    borderBottomWidth: 0.5,
  },
  servicesContainer: {
    flex: 1,
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  priceNumber: {...Typography.header.x30, color: Colors.neutral.black},
  priceTite: {
    ...Typography.body.x10,
    color: Colors.neutral.s300,
  },
});

const FrontFace = ({toggle, item}) => {
  const [hearted, toggleHeart] = React.useState(item.isHearted);

  return (
    // <TouchableWithoutFeedback onPress={() => toggle()}>
    <View style={styles.container}>
      <View style={{flex: 1.6}}>
        <View style={styles.imageContainer}>
          <TouchableWithoutFeedback
            style={styles.image}
            onPress={() => toggle()}>
            <Image
              style={{...StyleSheet.absoluteFillObject}}
              resizeMode="cover"
              source={{uri: item.photoURL}}
            />
          </TouchableWithoutFeedback>
        </View>

        <View
          style={[
            styles.heartContainer,
            {
              backgroundColor: hearted
                ? Colors.neutral.white
                : Colors.primary.brand,
            },
          ]}>
          <Heart {...{item, hearted, toggleHeart}} />
        </View>
      </View>
      <View style={{flex: 3, padding: 10}}>
        <View style={{flex: 1.1, justifyContent: 'center'}}>
          <Text style={{...Typography.header.x30}}>{item.name}</Text>
          <View style={styles.ratingLine}>
            <AntDesign name={'star'} size={18} color={Colors.primary.brand} />
            <Text style={{marginHorizontal: 10}}>
              {item.totalRate && item.numberOfRate
                ? Math.round(item.totalRate / item.numberOfRate)
                : 0}
            </Text>
            <View style={styles.line} />
          </View>
        </View>
        <View style={styles.servicesContainer}>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.priceTite}>Party</Text>
            <Text style={styles.priceNumber}>{item.party} $</Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.priceTite}>Indoor</Text>
            <Text style={styles.priceNumber}>{item.inDoor} $</Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.priceTite}>Outdoor</Text>
            <Text style={styles.priceNumber}>{item.outDoor} $</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FrontFace;
