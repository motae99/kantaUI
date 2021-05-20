/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Alert, Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from 'utils/navigationService';
import * as RootNavigation from 'navigation';

const Services = () => {
  const [localToken, setLocalToken] = useState(null);

  function handleDynamicLink(link) {
    console.log('link', link);
    const testUrl = 'https://kantaui.page.link/HomeStack/EventList';
    Linking.openURL(testUrl);
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  const processNotification = async (remoteMessage, fromBackground) => {
    // await AsyncStorage.setItem('booking', JSON.stringify(8));

    let title = '';
    let body = '';
    let timeStamp = null;
    let alertBtns = [];

    // Update a users messages list using AsyncStorage
    // const currentMessages = await AsyncStorage.getItem('notifications');

    // const messageArray = currentMessages ? JSON.parse(currentMessages) : [];
    // console.log('before messages in storage', JSON.stringify(messageArray));
    // const messageData = remoteMessage.data;
    // console.log('new message', JSON.stringify(messageData));

    // let notificationType = null;
    // if (messageData.type === 'booking') {
    //   notificationType = 'booking';
    // }
    // if (messageData.type === 'offer') {
    //   notificationType = 'offer';
    // }
    // if (messageData.type === 'social') {
    //   notificationType = 'social';
    // }
    // const badge = await AsyncStorage.getItem(notificationType);
    // // eslint-disable-next-line radix
    // const count = badge ? parseInt(badge) + 1 : 1;
    // await AsyncStorage.setItem('booking', toString(count));
    // messageArray.push(messageData);
    // await AsyncStorage.setItem('notifications', JSON.stringify(messageArray));
    // console.log(
    //   'after messages added to storage',
    //   JSON.stringify(messageArray),
    // );

    if (remoteMessage) {
      // handle message with no data
      console.log('processing Notification RemoteMessage', remoteMessage);
      if (remoteMessage.notification) {
        title = remoteMessage.notification.title;
        body = remoteMessage.notification.body;
      }
      // timeStamp = remoteMessage.sentTime;

      if (remoteMessage.data) {
        // handle message data adding them to notifications array
        const currentMessages = await AsyncStorage.getItem('notifications');
        const messageArray = currentMessages ? JSON.parse(currentMessages) : [];
        const messageData = remoteMessage.data;
        messageArray.push(messageData);
        await AsyncStorage.setItem(
          'notifications',
          JSON.stringify(messageArray),
        );

        if (fromBackground && remoteMessage.data.msgType) {
          switch (remoteMessage.data.msgType) {
            case 'Event':
              // NavigationService.navigate('Phone');
              console.log('you should navigate now to a a page of search');
              return; // terminate the method here

            // More cases in when app get bigger
          }
        }

        // Notification arrive while the app is running in foreground
        if (!fromBackground && remoteMessage.data.msgType) {
          switch (remoteMessage.data.msgType) {
            case 'Search':
              alertBtns = [
                {
                  text: 'View',
                  onPress: () => {
                    console.log(
                      'you should navigate now to a a page of search',
                    );

                    // this.forwardToSearchPage(remoteMessage.data.word);
                  },
                },
                {
                  text: 'Close',
                  onPress: () => console.log('Close Pressed'),
                  style: 'cancel',
                },
              ];
              break;

            // More cases in when app get bigger
          }
        }
      }

      if (!fromBackground) {
        // This Happens if message arrives while using the app in the for_ground
        if (title.length > 0 && body.length > 0) {
          Alert.alert(
            title,
            body,
            alertBtns.length > 0 ? alertBtns : undefined,
          );
        }
      }
    }
  };

  const storageToken = async () => {
    try {
      await AsyncStorage.getItem('fcmToken').then((token) => {
        // console.log('getToken from Storage and set It in State', token);
        setLocalToken(token);
      });
    } catch (error) {
      console.log('we dont have Token in Storage', error);
      requestUserPermission();
    }
  };

  useEffect(() => {
    // const storageToken = async () => {
    //   const tokenStorage = await AsyncStorage.getItem('fcmToken')
    //     .then((token) => setLocalToken(token)) //setLocalToken(token)
    //     .catch((error) => console.log(error));
    //   return tokenStorage;
    // };

    storageToken();

    // if (!localToken) {
    //   console.log('we dont have');
    //   requestUserPermission();
    // }

    messaging().onTokenRefresh(async (token) => {
      await AsyncStorage.setItem('fcmToken', token);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      processNotification(remoteMessage, true);
      //this.forwardToSearchPage(remoteMessage.data.word);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // happens when App is closed but opened with Notification
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          processNotification(remoteMessage, true);
          // this.forwardToSearchPage(remoteMessage.data.word);
        }
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // happens in the forGround
      console.log('A new FCM message arrived! ForGround', remoteMessage);
      processNotification(remoteMessage, false);
      // this.forwardToSearchPage(remoteMessage.data.word);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) {
          handleDynamicLink(link);
        }
      });
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    };
  }, []);

  return null;
};

export default Services;
