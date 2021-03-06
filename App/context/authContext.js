import React, {createContext, useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [confirm, setConfirm] = useState(null);
  const [phoneNo, setPhoneNo] = useState('');
  const [User, setUser] = React.useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    // get Provider ID
    // user.providerData[0].providerId
    // google.com
    // facebook.com
    // phone

    // console.log(user.providerData[0].displayName);
    setUser(user);

    //       const userData =  {
    //         uid: user.uid,
    //         timestamp: Date.now(),
    //         displayName: user.displayName,
    //         email: user.email,
    //         phoneNumber: user.phoneNumber,
    //         photoURL: user.photoURL,
    //       };
    //     try{
    //       await firestore()
    //       .collection('users')
    //       .doc(user.uid)
    //       .update(userData)
    //       setTimeout(() => { this.props.navigation.navigate('Initial') }, 1000)
    //     }
    //     catch(error){
    //       await firestore()
    //       .collection('users')
    //       .doc(user.uid)
    //       .set(userData)
    //       setTimeout(() => { this.props.navigation.navigate('Initial') }, 1000)
    //     }

    //   }
    // });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '337309192499-n2cu8ljihpaim2lnjc074hdhtu5rojh1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const signIn = async (data) => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `AsyncStorage`
    // In the example, we'll use a dummy token
    // dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
  };

  const googleSign = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // console.log(googleCredential);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);

    // dispatch({type: 'GOOGLE_SIGN', token: googleCredential});
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

  const phoneSign = async (phoneNumber) => {
    setPhoneNo(phoneNumber);

    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // console.log('confirmation', confirmation);
    setConfirm(confirmation);
  };

  const phoneVerify = async (userCode) => {
    // console.log('Verifying', userCode);
    try {
      await confirm.confirm(userCode);
      setConfirm(null);
      setPhoneNo('');
    } catch (error) {
      console.log('Invalid code.');
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

  const signUp = async (data) => {
    // In a production app, we need to send user data to server and get a token
    // We will also need to handle errors if sign up failed
    // After getting token, we need to persist the token using `AsyncStorage`
    // In the example, we'll use a dummy token
    // dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
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
        facebookSign,
        phoneSign,
        phoneVerify,
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
