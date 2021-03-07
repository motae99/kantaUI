import * as React from 'react';
import Navigator from './App/navigation/';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import codePush from 'react-native-code-push';

const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
};

export default codePush(codePushOptions)(App);
// export default App;
