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

// import i18n from 'i18n-js';
// import memoize from 'lodash.memoize';
// import * as React from 'react';
// import {
//   I18nManager,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import * as RNLocalize from 'react-native-localize';

// const translationGetters = {
//   // lazy requires (metro bundler does not support symlinks)
//   ar: () => require('./android/app/src/main/assets/translations/ar.json'),
//   en: () => require('./android/app/src/main/assets/translations/en.json'),
// };

// const translate = memoize(
//   (key, config) => i18n.t(key, config),
//   (key, config) => (config ? key + JSON.stringify(config) : key),
// );

// const setI18nConfig = () => {
//   // fallback if no available language fits
//   const fallback = {languageTag: 'en', isRTL: false};

//   const {languageTag, isRTL} =
//     RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
//     fallback;

//   // clear translation cache
//   translate.cache.clear();
//   // update layout direction
//   I18nManager.forceRTL(isRTL);

//   // set i18n-js config
//   i18n.translations = {[languageTag]: translationGetters[languageTag]()};
//   i18n.locale = languageTag;
// };

// export default class SyncExample extends React.Component {
//   constructor(props) {
//     super(props);
//     setI18nConfig(); // set initial config
//   }

//   componentDidMount() {
//     RNLocalize.addEventListener('change', this.handleLocalizationChange);
//   }

//   componentWillUnmount() {
//     RNLocalize.removeEventListener('change', this.handleLocalizationChange);
//   }

//   handleLocalizationChange = () => {
//     setI18nConfig();
//     this.forceUpdate();
//   };

//   render() {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <Line
//             name="RNLocalize.getLocales()"
//             value={RNLocalize.getLocales()}
//           />
//           <Line
//             name="RNLocalize.getCurrencies()"
//             value={RNLocalize.getCurrencies()}
//           />
//           <Line
//             name="RNLocalize.getCountry()"
//             value={RNLocalize.getCountry()}
//           />
//           <Line
//             name="RNLocalize.getCalendar()"
//             value={RNLocalize.getCalendar()}
//           />
//           <Line
//             name="RNLocalize.getNumberFormatSettings()"
//             value={RNLocalize.getNumberFormatSettings()}
//           />
//           <Line
//             name="RNLocalize.getTemperatureUnit()"
//             value={RNLocalize.getTemperatureUnit()}
//           />
//           <Line
//             name="RNLocalize.getTimeZone()"
//             value={RNLocalize.getTimeZone()}
//           />
//           <Line
//             name="RNLocalize.uses24HourClock()"
//             value={RNLocalize.uses24HourClock()}
//           />
//           <Line
//             name="RNLocalize.usesMetricSystem()"
//             value={RNLocalize.usesMetricSystem()}
//           />

//           {Platform.OS === 'android' && (
//             <>
//               <Line
//                 name="RNLocalize.usesAutoDateAndTime()"
//                 value={RNLocalize.usesAutoDateAndTime()}
//               />
//               <Line
//                 name="RNLocalize.usesAutoTimeZone()"
//                 value={RNLocalize.usesAutoTimeZone()}
//               />
//             </>
//           )}

//           <Line
//             name="RNLocalize.findBestAvailableLanguage(['en-US', 'en', 'fr'])"
//             value={RNLocalize.findBestAvailableLanguage(['en-US', 'en', 'fr'])}
//           />

//           <Line name="Translation example" value={translate('hello')} />
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
// }

// const Line = (props) => (
//   <View style={styles.block}>
//     <Text style={styles.name}>{props.name}</Text>
//     <Text style={styles.value}>{JSON.stringify(props.value, null, 2)}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   container: {
//     padding: 16,
//     alignItems: 'flex-start',
//   },
//   block: {
//     marginBottom: 16,
//     alignItems: 'flex-start',
//   },
//   name: {
//     textDecorationLine: 'underline',
//     fontWeight: '500',
//     marginBottom: 8,
//   },
//   value: {
//     textAlign: 'left',
//   },
// });
