import * as React from 'react';
import Navigator from './App/navigation/';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

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
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

// export default codePush(codePushOptions)(App);
export default App;
