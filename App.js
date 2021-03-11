/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// import {View, Text} from 'react-native';
import Navigator from './App/navigation/';

import codePush from 'react-native-code-push';
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

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

export default codePush(codePushOptions)(App);
// export default App;

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   Platform,
//   SafeAreaView,
//   Button,
// } from 'react-native';

// import * as ImagePicker from 'react-native-image-picker';

// export default function App() {
//   const [response, setResponse] = React.useState(null);

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <Button
//           title="Take image"
//           onPress={() =>
//             ImagePicker.launchCamera(
//               {
//                 mediaType: 'photo',
//                 includeBase64: false,
//                 maxHeight: 200,
//                 maxWidth: 200,
//               },
//               (response) => {
//                 setResponse(response);
//               },
//             )
//           }
//         />

//         <Button
//           title="Select image"
//           onPress={() =>
//             ImagePicker.launchImageLibrary(
//               {
//                 mediaType: 'photo',
//                 includeBase64: false,
//                 maxHeight: 200,
//                 maxWidth: 200,
//               },
//               (response) => {
//                 setResponse(response);
//               },
//             )
//           }
//         />

//         <Button
//           title="Take video"
//           onPress={() =>
//             ImagePicker.launchCamera({mediaType: 'video'}, (response) => {
//               setResponse(response);
//             })
//           }
//         />

//         <Button
//           title="Select video"
//           onPress={() =>
//             ImagePicker.launchImageLibrary({mediaType: 'video'}, (response) => {
//               setResponse(response);
//             })
//           }
//         />

//         <View style={styles.response}>
//           <Text>Res: {JSON.stringify(response)}</Text>
//         </View>

//         {response && (
//           <View style={styles.image}>
//             <Image
//               style={{width: 200, height: 200}}
//               source={{uri: response.uri}}
//             />
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   button: {
//     marginVertical: 24,
//     marginHorizontal: 24,
//   },
//   image: {
//     marginVertical: 24,
//     alignItems: 'center',
//   },
//   response: {
//     marginVertical: 16,
//     marginHorizontal: 8,
//   },
// });
