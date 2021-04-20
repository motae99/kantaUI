/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useContext, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Rating} from 'react-native-elements';
import {SECTIONS_TOP_MARGIN} from 'events/components/constants';

const Reviews = ({item}) => {
  if (!item.reviewSnippet) {
    return null;
  }

  const snippet = item.reviewSnippet;
  return (
    <View
      style={{
        // height: 300,
        width: '100%',
        marginTop: SECTIONS_TOP_MARGIN,
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
                uri: snippet.photoUrl,
                priority: FastImage.priority.normal,
                cashe: FastImage.cacheControl.immutable,
              }}
            />

            <View style={{justifyContent: 'center'}}>
              <Text>{snippet.name}</Text>
              <Text>{moment(snippet.timeStamp).format('MM/DD/YYYY')}</Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Rating
            type="custom"
            imageSize={20}
            readonly
            startingValue={snippet.rating}
            // ratingColor="#3498db"
            // ratingBackgroundColor="red"
            style={{backgroundColor: 'green'}}
          />
        </View>
      </View>

      <Text style={{marginTop: 20}}>{snippet.review}</Text>
      <TouchableOpacity
        onPress={() => console.log('show all ')}
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>See All Reviews</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;
