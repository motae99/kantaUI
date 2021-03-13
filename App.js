/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// import {View, Text} from 'react-native';
import Navigator from './App/navigation/';

// import codePush from 'react-native-code-push';
// const codePushOptions = {
//   updateDialog: true,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };

const App = ({props}) => {
  return (
    <SafeAreaProvider>
      <Navigator />
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          flex: 1,
        }}>
        <Text style={{color: 'white'}}>
          Update Now this is a simple fix for now
        </Text>
      </View> */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

// export default codePush(codePushOptions)(App);
export default App;

// import * as React from 'react';
// import {Text, View, Image, Dimensions} from 'react-native';
// import Animated from 'react-native-reanimated';

// import {Sizing, Outlines, Colors, Typography} from 'styles';

// const {width, height} = Dimensions.get('window');

// const SPACING = Sizing.x10;
// const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.82;
// const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
// const BACKDROP_HEIGHT = height * 0.65;

// const HEADER_HEIGHT = 60;
// const {diffClamp, interpolate, Extrapolate} = Animated;

// const List = (props) => {
//   const x = new Animated.Value(0);
//   return (
//     // Use onScroll to update the y value
//     <View style={{flex: 1}}>
//       <Animated.ScrollView
//         horizontal={true}
//         contentContainerStyle={{alignItems: 'center'}}
//         snapToInterval={ITEM_SIZE}
//         onScroll={Animated.event([
//           {
//             nativeEvent: {
//               contentOffset: {
//                 x: x,
//               },
//             },
//           },
//         ])}
//         scrollEventThrottle={16}>
//         {Array.from({length: 10}, (v, index) => {
//           if (index === 0) {
//             return <View style={{width: EMPTY_ITEM_SIZE}} />;
//           }

//           if (index === 9) {
//             return <View style={{width: EMPTY_ITEM_SIZE}} />;
//           }

//           const inputRange = [
//             (index - 2) * ITEM_SIZE,
//             (index - 1) * ITEM_SIZE,
//             index * ITEM_SIZE,
//             // (index + 1) * ITEM_SIZE,
//           ];

//           const translateY = interpolate(x, {
//             inputRange,
//             outputRange: [160, 100, 160],
//             extrapolate: Extrapolate.CLAMP,
//           });

//           const translateX = interpolate(x, {
//             inputRange,
//             outputRange: [-width * 0.7, 0, width * 0.7],
//             extrapolate: Extrapolate.CLAMP,
//           });

//           return (
//             <View
//               style={{
//                 width: ITEM_SIZE,
//                 // justifyContent: 'center',
//                 // alignItems: 'center',
//               }}>
//               <Animated.View
//                 style={{
//                   marginHorizontal: Sizing.x10,
//                   padding: Sizing.x20,
//                   alignItems: 'center',
//                   // opacity,
//                   backgroundColor: Colors.neutral.white,
//                   transform: [{translateY}],
//                   borderColor: Colors.neutral.white,
//                   borderRadius: Outlines.borderRadius.large,
//                 }}>
//                 <View
//                   style={{
//                     width: '98%',
//                     height: ITEM_SIZE,
//                     overflow: 'hidden',
//                     alignItems: 'center',
//                     borderRadius: Outlines.borderRadius.large,
//                   }}>
//                   <Animated.Image
//                     style={{
//                       width: ITEM_SIZE + 20,
//                       height: ITEM_SIZE,
//                       resizeMode: 'cover',
//                       borderRadius: Outlines.borderRadius.small,
//                       marginBottom: Sizing.x10,
//                       transform: [{translateX}],
//                     }}
//                     key={index + ''}
//                     source={{uri: 'https://picsum.photos/200/300'}}
//                   />
//                 </View>
//               </Animated.View>
//             </View>
//           );
//         })}
//       </Animated.ScrollView>
//     </View>
//   );
// };

// export default List;
