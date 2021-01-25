import React from 'react';
import {View, Text} from 'react-native';
// import {LoginButton, AccessToken} from 'react-native-fbsdk';
import codePush from 'react-native-code-push';

const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: '28', fontWeight: 'bold'}}>
        KantaUI Starting Point
      </Text>
    </View>
  );
};
export default codePush(codePushOptions)(App);
// export default App;
