/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {firebase} from '@react-native-firebase/auth';
import Video from 'react-native-video';
import InkinWater from 'assets/InkinWater.mp4';
import auth from '@react-native-firebase/auth';
import {Sizing, Outlines, Colors, Typography} from 'styles';

const {width, height} = Dimensions.get('window');
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '337309192499-n2cu8ljihpaim2lnjc074hdhtu5rojh1.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
  }

  _firebaseGoogleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('google user info ', userInfo);
      this.setState({userInfo: userInfo, loggedIn: true});
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      const user = auth().currentUser;
      console.log('we have user', user);

      // if (user.phoneNumber) {
      //   console.log('good to go');
      //   console.log('has phone', user.phoneNumber);
      //   this.props.navigation.navigate('App');
      // } else {
      //   // console.log('no phone #')
      //   // this.props.navigation.navigate('Phone')
      //   this.props.navigation.navigate('App');
      // }
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('some other error happened', error);
      }
    }
  };

  faceBookLogin = async (data) => {
    console.log('you here', data);
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    await firebase.auth().signInWithCredential(credential);

    const user = auth().currentUser;
    console.log('we have user', user);

    // if (user.phoneNumber) {
    //   console.log('good to go');
    //   console.log('has phone', user.phoneNumber);
    //   this.props.navigation.navigate('HomeStack');
    // } else {
    //   console.log('no phone #');
    //   this.props.navigation.navigate('Phone');
    // }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({loggedIn: false});
      } else {
        // some other error
        this.setState({loggedIn: false});
      }
    }
  };

  render() {
    const {passwordVisibility, rightIcon} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <Video
          repeat
          source={InkinWater}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.socialButton}>
            <GoogleSigninButton
              style={{
                width: '100%',
                height: '100%',
              }}
              // buttonType={'outline'}
              size={GoogleSigninButton.Size.Wide}
              // size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Light}
              onPress={this._firebaseGoogleLogin}
              disabled={this.state.isSigninInProgress}
            />
          </View>

          <View style={[styles.socialButton, {height: Sizing.x70 - 7}]}>
            <LoginButton
              style={{
                width: '100%',
                height: '100%',
              }}
              // buttonType={'outline'}
              logInWithPermissions={['publish_actions']}
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  console.log(result);
                  AccessToken.getCurrentAccessToken().then((data) => {
                    console.log('logged in Facebook', data);
                    this.setState({
                      loggedIn: true,
                      userID: data.userID,
                    });
                    this.faceBookLogin(data);
                    // console.log(data, data.accessToken.toString())
                  });
                }
              }}
              onLogoutFinished={() =>
                this.setState({
                  loggedIn: false,
                  userID: '',
                })
              }
            />
          </View>
        </View>

        {/* <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        /> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    width,
    position: 'absolute',
    bottom: Sizing.x80,
  },
  socialButton: {
    height: Sizing.x70,
    marginHorizontal: Sizing.x20,
    marginVertical: Sizing.x10,
    borderRadius: Outlines.borderRadius.base,
    overflow: 'hidden',
  },
});

// do this after successful login to sync contacts
// PermissionsAndroid.request(
//   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//   {
//     'title': 'Contacts',
//     'message': 'This app would like to view your contacts.',
//     'buttonPositive': 'Please accept bare mortal'
//   }
// ).then(() => {
//   Contacts.getAll((err, contacts) => {
//     if (err === 'denied'){
//       // error
//       console.log('error denied');
//     } else {
//       // contacts returned in Array
//       console.log('allowed');

//       contacts.forEach(contact => {
//         console.log('--------------------------------------')
//         console.log(contact.givenName)
//         console.log(contact.phoneNumbers)
//         console.log('--------------------------------------')

//       });
//       // console.log(contacts);

//     }
//   })
// })
