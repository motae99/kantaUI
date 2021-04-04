/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useContext, useState} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Rating} from 'react-native-elements';
import {SECTIONS_TOP_MARGIN} from '../detail';

const Reviews = ({item}) => {
  return (
    <View
      style={{
        height: 300,
        width: '100%',
        marginTop: SECTIONS_TOP_MARGIN,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('img/profilePlaceholder.png')}
              style={{
                height: 70,
                width: 70,
                borderRadius: 70,
                alignSelf: 'center',
                resizeMode: 'cover',
                marginRight: 10,
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text>Mo Taha</Text>
              <Text>Dec 10 2020</Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Rating
            type="custom"
            imageSize={20}
            readonly
            startingValue={4}
            // ratingColor="#3498db"
            // ratingBackgroundColor="red"
            style={{backgroundColor: 'green'}}
          />
        </View>
      </View>

      <Text style={{marginTop: 20}}>
        klfjalksf alksdfjlkasdjflka sdfklasjdflkasjd flkasdjf askdlfjalksdf
        klfjalksf alksdfjlkasdjflka sdfklasjdflkasjd flkasdjf askdlfjalksdf
        klfjalksf alksdfjlkasdjflka sdfklasjdflkasjd flkasdjf askdlfjalksdf
        requestalksdjflkasdfjklasjdf klsdfjlaks dfklasdjflkasdjflkasjdf
      </Text>
      <TouchableOpacity
        onPress={() => console.log('show all ')}
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>See All Reviews</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;
