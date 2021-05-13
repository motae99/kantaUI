// import React from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Toast from 'react-native-toast-message';

// // import {View, Text} from 'react-native';
// import Navigator from './App/navigation/';
// import Services from 'utils/services';

// import codePush from 'react-native-code-push';
// const codePushOptions = {
//   updateDialog: true,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };

// const App = ({props}) => {
//   return (
//     <SafeAreaProvider>
//       <Services />

//       <Navigator />
//       {/* <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'green',
//           flex: 1,
//         }}>
//         <Text style={{color: 'white'}}>
//           Update Now this is a simple fix for now
//         </Text>
//       </View> */}
//       <Toast ref={(ref) => Toast.setRef(ref)} />
//     </SafeAreaProvider>
//   );
// };

// export default codePush(codePushOptions)(App);
// // export default App;

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
  SafeAreaView,
} from 'react-native';
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
export default () => {
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
              <Image
                source={{uri: item.src.portrait}}
                style={[StyleSheet.absoluteFillObject]}
              />
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
              <Image
                source={{uri: item.src.portrait}}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
