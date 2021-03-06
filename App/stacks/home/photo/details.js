/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'photo/components/share';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
const API_KEY = '563492ad6f91700001000001d7bc6ad796bf4db4a876711a1a688b67';
const API_URL =
  'https://api.pexels.com/v1/search?query=Party&orientation=portrait&size=small&per_page=20';

const IMAGE_SIZE = 80;
const SPACING = 10;
const fetchImagesFromPexel = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const {photos} = await data.json();
  return photos;
};
const Browser = ({navigation, route}) => {
  const {item} = route.params;

  const [images, setImages] = React.useState(null);
  React.useEffect(() => {
    const fetchImages = async () => {
      const Images = await fetchImagesFromPexel();
      setImages(Images);
    };
    fetchImages();
  }, []);

  const topRef = React.useRef();
  const thumbRef = React.useRef();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollToIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (!images) {
    <Text>loading...</Text>;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden />
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(ev) => {
          // scrollToIndex(3);
          // console.log(Math.floor(ev.nativeEvent.conten  tOffset.x / width);
          scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width) + 1);
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={{height, width}}>
              <SharedElement
                id={`image.${item.src.portrait}`}
                style={{
                  width,
                  height,
                }}>
                <FastImage
                  style={[StyleSheet.absoluteFillObject]}
                  source={{
                    uri: item.src.portrait,
                    priority: FastImage.priority.normal,
                    cashe: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </SharedElement>
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: IMAGE_SIZE}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToIndex(index);
              }}>
              <FastImage
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                }}
                source={{
                  uri: item.src.portrait,
                  priority: FastImage.priority.normal,
                  cashe: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 30,
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={'black'} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 70,
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Share {...{item}} />
      </View>
    </SafeAreaView>
  );
};

Browser.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  return item.files.map((i, index) => `image.${i.uri}`);
};

export default Browser;

// import React from 'react';
// import {
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   View,
// } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Share from 'photo/components/share';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {SharedElement} from 'react-navigation-shared-element';

// const {width, height} = Dimensions.get('window');
// const Browser = ({navigation, route}) => {
//   const {item} = route.params;
//   const images = item.files;
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <StatusBar
//         // barStyle={'light-content'}
//         translucent
//         backgroundColor="transparent"
//       />
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={width}>
//         {images.map((i) => {
//           return (
//             <View key={i.uri}>
//               <SharedElement
//                 id={`image.${item.uri}`}
//                 style={{
//                   width,
//                   height,
//                 }}>
//                 <FastImage
//                   style={[
//                     {
//                       width,
//                       height,
//                       resizeMode: 'contain',
//                     },
//                   ]}
//                   source={{
//                     uri: i.uri,
//                     priority: FastImage.priority.normal,
//                     cashe: FastImage.cacheControl.immutable,
//                   }}
//                   resizeMode={FastImage.resizeMode.cover}
//                 />
//               </SharedElement>
//             </View>
//           );
//         })}
//       </ScrollView>

//       <View
//         style={{
//           position: 'absolute',
//           top: 80,
//           left: 30,
//           width: 40,
//           height: 40,
//           borderRadius: 20,
//           borderWidth: 2,
//           borderColor: 'white',
//           justifyContent: 'center',
//           alignItems: 'center',
//           overflow: 'hidden',
//         }}>
//         <FastImage
//           style={[
//             {
//               width: 40,
//               height: 40,
//               borderRadius: 20,
//             },
//           ]}
//           source={{
//             uri: images[0].uri,
//             priority: FastImage.priority.normal,
//             cashe: FastImage.cacheControl.immutable,
//           }}
//           resizeMode={FastImage.resizeMode.cover}
//         />
//       </View>

//     </SafeAreaView>
//   );
// };
// Browser.sharedElements = (route, otherRoute, showing) => {
//   const {item} = route.params;
//   return item.files.map((i, index) => `image.${i.uri}`);
// };
// export default Browser;
