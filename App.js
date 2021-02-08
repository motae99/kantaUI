import * as React from 'react';
import Navigator from './App/navigation/Navigator';
// import codePush from 'react-native-code-push';

// const codePushOptions = {
//   updateDialog: true,
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };

const App = () => {
  return <Navigator />;
};

// export default codePush(codePushOptions)(App);
export default App;
