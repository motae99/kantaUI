import React, {useRef, useContext, useState, useReducer} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Fontisto from 'react-native-vector-icons/Fontisto';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';

const ShareButton = ({item}) => {
  const handleViewRef = useRef(null);

  const sharePost = async () => {
    const sharedUrl = await dynamicLinks().buildLink(
      {
        link: 'https://www.example.com/?curPage=1', //use any Domanin name or ur domain name ? curPage=1 leads to homepage
        domainUriPrefix: 'https://kantaui.page.link',
        analytics: {
          campaign: 'offer',
        },
        social: {
          title: item.name,
          descriptionText: item.address,
          imageUrl: item.files[0].uri,
        },
        android: {
          packageName: 'com.kantaui',
        },
        ios: {
          bundleId: 'IOS bundle ID',
        },
      },
      dynamicLinks.ShortLinkType.SHORT,
    );

    //   new firebase.links.DynamicLink(
    //     encodeURI(`https://eventsmag.page.link/${id}`),
    //     'eventsmag.page.link'
    // ).android.setPackageName('app_android_package_name')
    // .ios.setBundleId('app_ios_bundle_id');

    // const dymcLink = await firebase.links()
    //     .createShortDynamicLink(link, `UNGUESSABLE`)
    //     .then((url) => decodeURIComponent(url));

    // console.log(sharedUrl);

    const shareOptions = {
      // title: 'Share Contents',
      failOnCancel: false,
      url: sharedUrl,
    };

    try {
      Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const share = () => {
    handleViewRef.current.bounceIn(300).then((endState) => {});
    sharePost();
  };

  return (
    <TouchableWithoutFeedback onPress={() => share()}>
      <Animatable.View ref={handleViewRef} useNativeDriver={true}>
        <Fontisto name="share-a" size={18} color="#2B3449" />
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default ShareButton;

// if (item.type) {
//  if (item.type == 'post') {
//    var socialData = {
//      title: item.title,
//      descriptionText: item.post,
//      imageUrl: item.autherPhoto,
//    };
//  }
//  if (item.type == 'video') {
//    var socialData = {
//      title: item.autherName,
//      descriptionText: item.title,
//      imageUrl: item.autherPhoto,
//    };
//  }
//  if (item.type == 'images') {
//    var socialData = {
//      title: item.autherName,
//      descriptionText: item.title,
//      imageUrl: item.images[0].uri,
//    };
//  }
// } else {
//  let socialData = {
//    title: item.name,
//    descriptionText: item.address,
//    imageUrl: item.files[0].uri,
//  };
// }
