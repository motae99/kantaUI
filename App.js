import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import {View, Text} from 'react-native';
// import Navigator from './App/navigation/';
// import Services from 'utils/services';

import codePush from 'react-native-code-push';
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = ({props}) => {
  React.useEffect(() => {
    console.log('splashHide');
    SplashScreen.hide();
  });
  return (
    <SafeAreaProvider>
      {/* <Services />
      <Navigator /> */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
          flex: 1,
        }}>
        <Text style={{color: 'white'}}>
          Update Now this is a simple fix for now
        </Text>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

export default codePush(codePushOptions)(App);
// export default App;
