// import LocationView from './src/LocationView';

// export default LocationView;

// import { sha256 } from 'react-native-sha256';

// sha256("Test").then( hash => {
//  console.log(hash);
// })

// <WebView
//   source={{ uri: 'https://reactnative.dev' }}
//   startInLoadingState={true}
//   renderLoading={() => <Loading />}
//   onError={(syntheticEvent) => {
//    const { nativeEvent } = syntheticEvent;
//    console.warn('WebView error: ', nativeEvent);
//  }}

//  onLoad={(syntheticEvent) => {
//   const { nativeEvent } = syntheticEvent;
//   this.url = nativeEvent.url;
// }} // finished loading
// onLoadEnd={(syntheticEvent) => {
//  // update component to be aware of loading status
//  const { nativeEvent } = syntheticEvent;
//  this.isLoading = nativeEvent.loading;
// }} //success load or failed ones

// onLoadProgress={({ nativeEvent }) => {
//  this.loadingProgress = nativeEvent.progress;
// }}

// onHttpError={(syntheticEvent) => {
//  const { nativeEvent } = syntheticEvent;
//  console.warn(
//    'WebView received error status code: ',
//    nativeEvent.statusCode,
//  );
// }}

// renderError={(errorName) => <Error name={errorName} />}
// containerStyle={{ marginTop: 20 }}
// />
