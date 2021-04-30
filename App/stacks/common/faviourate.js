/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useContext} from 'react';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Faviourate = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
      }}>
      <Pressable
        style={{
          marginTop: 22,
          marginHorizontal: 20,
          borderRadius: 5,
          padding: 10,
          elevation: 2,
          backgroundColor: '#2196F3',
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Hide Modal
        </Text>
      </Pressable>

      <View
        style={{
          flex: 1,
          backgroundColor: '#2196F3',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Faviourate</Text>
      </View>
    </View>
  );
};
export default Faviourate;
