/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useContext, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Rating} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {SECTIONS_TOP_MARGIN} from 'events/components/constants';

const Reviews = ({item}) => {
  const navigation = useNavigation();

  if (!item.snippet) {
    return null;
  }

  const snippet = item.snippet;
  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
        marginTop: SECTIONS_TOP_MARGIN,
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              style={{
                height: 70,
                width: 70,
                borderRadius: 70,
                alignSelf: 'center',
                resizeMode: 'cover',
                marginRight: 10,
              }}
              source={{
                uri: snippet.userPhotoURL,
                priority: FastImage.priority.normal,
                cashe: FastImage.cacheControl.immutable,
              }}
            />

            <View style={{justifyContent: 'center'}}>
              <Text>{snippet.userDisplayName}</Text>
              <Text>{moment(snippet.timeStamp).format('MM/DD/YYYY')}</Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Rating
            type="custom"
            imageSize={20}
            readonly
            startingValue={snippet.rate}
            // ratingColor="#3498db"
            // ratingBackgroundColor="red"
            style={{backgroundColor: 'green'}}
          />
        </View>
      </View>

      <Text style={{marginTop: 20}}>{snippet.review}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Modal', {
            screen: 'AllReview',
            params: {
              provider: item,
            },
          })
        }
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>See All Reviews</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;
