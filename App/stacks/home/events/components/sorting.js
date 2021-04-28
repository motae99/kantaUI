/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useContext, useState, useReducer} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Sort = () => {
  return (
    <View
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: 'white',
        height: 60,
        justifyContent: 'center',
      }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            borderWidth: 0.6,
            borderColor: 'gray',
            padding: 8,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto
            name="share-a"
            size={18}
            color="#2B3449"
            style={{marginRight: 5}}
          />
          <Text>Sort kfkj IM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            borderWidth: 0.6,
            borderColor: 'gray',
            padding: 8,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto
            name="share-a"
            size={18}
            color="#2B3449"
            style={{marginRight: 5}}
          />
          <Text>Sort kfkj IM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            borderWidth: 0.6,
            borderColor: 'gray',
            padding: 8,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto
            name="share-a"
            size={18}
            color="#2B3449"
            style={{marginRight: 5}}
          />
          <Text>Sort kfkj IM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            borderWidth: 0.6,
            borderColor: 'gray',
            padding: 8,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto
            name="share-a"
            size={18}
            color="#2B3449"
            style={{marginRight: 5}}
          />
          <Text>Sort kfkj IM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            borderWidth: 0.6,
            borderColor: 'gray',
            padding: 8,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto
            name="share-a"
            size={18}
            color="#2B3449"
            style={{marginRight: 5}}
          />
          <Text>Sort kfkj IM</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Sort;
