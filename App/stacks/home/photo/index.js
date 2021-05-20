/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {View, StatusBar, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import {AuthContext} from 'context/authContext';

import PhotoCard from 'photo/photoCard';

const PhotoList = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const {likes} = useContext(AuthContext);

  useEffect(() => {
    const subscriber = firestore()
      .collection('photoProviders')
      // .orderBy('date', 'desc')
      // .orderBy('timeStamp', 'asc')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const allData = querySnapshot.docs.map((documentSnapshot) => {
            if (likes && likes.length > 0) {
              const existed = likes.filter(
                (item) => item.providerId === documentSnapshot.id,
              );
              var hearted = existed.length > 0 ? true : false;
            }
            // console.log(documentSnapshot.id);
            // !data.photoURL ? data.push(photoURL: '' : data.photoURL;
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              isHearted: hearted,
            };
          });
          if (allData && allData.length > 0) {
            setData(allData);
          }
        }
      });

    return () => subscriber();
  }, [likes]);

  return (
    <View style={{backgroundColor: Colors.neutral.s200, flex: 1}}>
      <StatusBar
        // translucent
        barStyle={'light-content'}
        // backgroundColor="transparent"
      />
      <View
        style={{
          marginTop: 50,
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        // initialNumToRender={3}
        contentContainerStyle={{
          // marginHorizontal: Sizing.x20,
          paddingTop: Sizing.x10,
          alignItems: 'center',
        }}
        renderItem={({item, index}) => {
          return <PhotoCard {...{item}} />;
        }}
      />
    </View>
  );
};

export default PhotoList;
