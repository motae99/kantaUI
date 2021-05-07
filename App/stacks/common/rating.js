/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-elements';
import moment from 'moment';

const Reviews = ({route}) => {
  const {provider} = route.params;
  const [rates, setRate] = useState();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'title',
    });
  }, [navigation]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('feedBack')
      .where('providerId', '==', provider.key)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const reviews = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (reviews && reviews.length > 0) {
            setRate(reviews);
          }
        }
      });

    return () => subscriber();
  }, [provider.key]);

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginBottom: 10,
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
                  uri: item.userPhotoURL,
                  priority: FastImage.priority.normal,
                  cashe: FastImage.cacheControl.immutable,
                }}
              />

              <View style={{justifyContent: 'center'}}>
                <Text>{item.userDisplayName}</Text>
                <Text>{moment(item.timeStamp).format('MM/DD/YYYY')}</Text>
              </View>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Rating
              type="custom"
              imageSize={20}
              readonly
              startingValue={item.rate}
              // ratingColor="#3498db"
              // ratingBackgroundColor="red"
              style={{backgroundColor: 'green'}}
            />
          </View>
        </View>

        <Text style={{marginTop: 20}}>{item.review}</Text>
      </View>
    );
  };

  if (!rates) {
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>You have now review</Text>
    </View>;
  }

  return (
    <SafeAreaView
      mode="margin"
      style={{flex: 1, backgroundColor: Colors.neutral.s200}}>
      <FlatList
        data={rates}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        contentContainerStyle={{
          marginHorizontal: Sizing.x20,
          paddingTop: Sizing.x10,
        }}
        renderItem={({item, index}) => {
          return <RenderItem {...{item}} />;
        }}
      />
    </SafeAreaView>
  );
};
export default Reviews;
