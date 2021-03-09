import React, {createContext, useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import Toast from 'react-native-toast-message';
import I18n from 'utils/i18n';

export const AuthContext = createContext();

GoogleSignin.configure({
  scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '337309192499-n2cu8ljihpaim2lnjc074hdhtu5rojh1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const AuthContextProvider = (props) => {
  const [confirm, setConfirm] = useState(null);
  const [phoneNo, setPhoneNo] = useState('');
  const [User, setUser] = React.useState(null);
  const [dbUser, setDbUser] = React.useState(null);
  const [providerId, setProviderId] = React.useState(null);
  const [providerData, setProviderData] = React.useState(null);
  const [signUpData, setSignUpData] = React.useState(null);
  // const [signUp, setSignUp] = React.useState(false);

  function updateUserInfo(info) {
    console.log(info);
    // firestore()
    //       .collection('users')
    //       .doc(User.uid)
    //       .update(User)
  }

  async function createNewUser() {
    // switch (User) {
    //   case User.providerData[0].providerId === 'facebook.com':
    //     console.log('logged in with facebook');
    //     break;
    //   case User.providerData[0].providerId === 'google.com':
    //     console.log('logged in with google');
    //     break;
    //   case User.providerData[0].providerId === 'phone':
    //     console.log('logged in with phone');
    //     break;
    //   default:
    //     break;
    // }
    // userData={
    //   displayName: User.displayName,
    //   email: User.email,
    //   emailVerified: User.emailVerified,
    //   phoneNumber: User.phoneNumber,
    //   photoURL
    // }
    // firestore().collection('users').doc(User.uid).set(User);
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          updateUserInfo(documentSnapshot.data());
          setUser(user);
        } else {
          createNewUser();
        }
      });

    // setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
  //     webClientId:
  //       '337309192499-n2cu8ljihpaim2lnjc074hdhtu5rojh1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //   });
  //   console.log('running every');
  // }, []);

  const signIn = async ({data}) => {
    // try {
    //   // const response =
    //   await auth().createUserWithEmailAndPassword(email, password);
    //   // if (response.user.uid) {
    //   //   const {uid} = response.user;
    //   //   response.user.updateProfile({desplayName: name});
    //   //   const userData = {email, name, uid};
    //   //   await firestore().collection('users').doc(uid).set(userData);
    //   //   // this.props.navigation.navigate('App');
    //   // }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const googleSign = async () => {
    // Get the users ID token
    const GoogleUser = await GoogleSignin.signIn();

    console.log(GoogleUser);

    // Create a Google credential with the token
    const {idToken} = GoogleUser;
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // console.log(googleCredential);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);

    // dispatch({type: 'GOOGLE_SIGN', token: googleCredential});
  };

  const connectGoogle = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().currentUser.linkWithCredential(googleCredential);
  };

  const facebookSign = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    // console.log(data);

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().signInWithCredential(facebookCredential);

    // dispatch({type: 'FACEBOOK_SIGN', token: facebookCredential});
  };

  const connectFacebook = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth().currentUser.linkWithCredential(facebookCredential);
  };

  const connectPhone = async (phoneNumber) => {
    return auth()
      .verifyPhoneNumber(phoneNumber)
      .on(
        'state_changed',
        (phoneAuthSnapshot) => {
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log('code sent');
              setConfirm(phoneAuthSnapshot);
              Toast.show({
                text1: I18n.t('ToastSuccessCodeSentTitle'),
                text2: I18n.t('ToastSuccessCodeSentSubTitle'),
                // position: 'top | bottom',
                visibilityTime: 8000,
                autoHide: true,
                topOffset: 60,
                // bottomOffset: 40,
              });

              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              console.log('verification error');

              break;

            // ---------------------
            // ANDROID ONLY EVENTS
            // ---------------------
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log('auto verify on android timed out');

              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              console.log('auto verified on android');
              console.log(phoneAuthSnapshot);

              break;
          }
        },
        (error) => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: I18n.t('ToastErrorCodeSentTitle'),
            text2: error.message,
            // position: 'top | bottom',
            visibilityTime: 8000,
            autoHide: true,
            topOffset: 60,
            // bottomOffset: 40,
          });
        },
        (phoneAuthSnapshot) => {
          console.log(phoneAuthSnapshot);
          setConfirm(phoneAuthSnapshot);
        },
      );

    // setConfirm(snapshot);
  };

  const verifyConnectPhone = async (userCode) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      confirm.verificationId,
      userCode,
    );

    try {
      await auth().currentUser.updatePhoneNumber(credential);
      Toast.show({
        text1: I18n.t('ToastSuccessNumberConnectedTitle'),
        text2: I18n.t('ToastSuccessNumberConnectedSubTitle'),
        visibilityTime: 8000,
        autoHide: true,
        topOffset: 60,
      });

      setTimeout(() => {
        setConfirm(null);
        setPhoneNo('');
      }, 1000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: I18n.t('ToastErrorNumberConnectedTitle'),
        text2: error.message,
        visibilityTime: 8000,
        autoHide: true,
        topOffset: 60,
      });
    }
  };

  const phoneSign = async (phoneNumber) => {
    setPhoneNo(phoneNumber);

    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // console.log('confirmation', confirmation);
    Toast.show({
      text1: I18n.t('ToastSuccessNumberConnectedTitle'),
      text2: I18n.t('ToastSuccessNumberConnectedSubTitle'),
      visibilityTime: 8000,
      autoHide: true,
      topOffset: 60,
    });
    setConfirm(confirmation);
  };

  const phoneVerify = async (userCode) => {
    // console.log('Verifying', userCode);
    try {
      await confirm.confirm(userCode);

      setTimeout(() => {
        setConfirm(null);
        setPhoneNo('');
      }, 1000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: I18n.t('ToastErrorNumberConnectedTitle'),
        text2: error.message,
        visibilityTime: 8000,
        autoHide: true,
        topOffset: 60,
      });
    }
  };

  const signOut = async () => {
    if (User.providerData[0].providerId === 'google.com') {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        // setloggedIn(false);
        // setuserInfo([]);
      } catch (error) {
        console.error(error);
      }
    }
    if (User.providerData[0].providerId === 'facebook.com') {
      LoginManager.logOut();
    }

    return auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    // dispatch({type: 'SIGN_OUT'});
  };

  const signUp = async ({email, password, name, gender}) => {
    // return await auth().createUserWithEmailAndPassword(email, password);

    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      if (response.user) {
        const {uid} = response.user;
        response.user.updateProfile({displayName: name});
        const userData = {email, name, uid, gender};
        setSignUpData(userData);
        // await firestore().collection('users').doc(uid).set(userData);
        // this.props.navigation.navigate('App');
        Toast.show({
          text1: I18n.t('ToastSuccessSignUpTitle'),
          text2: I18n.t('ToastSuccessSignUpSubTitle'),
          visibilityTime: 8000,
          autoHide: true,
          topOffset: 60,
        });
      }
    } catch (error) {
      // console.log(error.message);
      Toast.show({
        type: 'error',
        text1: I18n.t('ToastErrorSignUpTitle'),
        text2: error.message,
        // position: 'top | bottom',
        visibilityTime: 8000,
        autoHide: true,
        topOffset: 60,
        // bottomOffset: 40,
      });
    }
  };

  // const verifyNumber = async (number) => {
  //   const requestedNo = await auth().verifyPhoneNumber(number)
  //           .on('state_changed', (phoneAuthSnapshot) => {
  //               console.log('State: ', phoneAuthSnapshot.state);
  //             }, (error) => {
  //               console.error(error);
  //             }, (phoneAuthSnapshot) => {
  //               console.log('Success');
  //             });
  // }

  // const credential = auth.PhoneAuthProvider.credential(snapshot.verificationId, code);
  // await auth().currentUser.updatePhoneNumber(credential);

  // // Successful login - onAuthStateChanged is triggered
  // auth().onAuthStateChanged( async (user) => {
  //     if (user) {
  //     // Stop the login flow / Navigate to next page
  //       // console.log('User info for provider: ', user);
  //       // console.log('+++++++++_____________========')
  //       this.setState({status: 'success'});
  //       const userData =  {
  //           uid: user.uid,
  //           timestamp: Date.now(),
  //           displayName: user.displayName,
  //           email: user.email,
  //           phoneNumber: user.phoneNumber,
  //           photoURL: user.photoURL,
  //         };
  //       try{
  //         await firestore()
  //         .collection('users')
  //         .doc(user.uid)
  //         .update(userData)
  //         setTimeout(() => { this.props.navigation.navigate('Initial') }, 1000)
  //       }
  //       catch(error){
  //         await firestore()
  //         .collection('users')
  //         .doc(user.uid)
  //         .set(userData)
  //         setTimeout(() => { this.props.navigation.navigate('Initial') }, 1000)
  //       }

  //     }
  //   });

  return (
    <AuthContext.Provider
      value={{
        confirm,
        signIn,
        googleSign,
        connectGoogle,
        facebookSign,
        connectFacebook,
        phoneSign,
        phoneVerify,
        connectPhone,
        verifyConnectPhone,
        signUp,
        signOut,
        setConfirm,
        phoneNo,
        User,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
