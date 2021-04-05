import React, {createContext, useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from 'context/authContext';
import Toast from 'react-native-toast-message';
import I18n from 'utils/i18n';

const {width, height} = Dimensions.get('window');

export const EventContext = createContext();

const EventContextProvider = (props) => {
  const {dbUser, likes} = React.useContext(AuthContext);

  const [eventProviders, setEventProviders] = useState(null);
  // const [provider, setProvider] = useState('');
  // const [cateringLoading, setCateringLoading] = useState(true);
  // const [catering, setCatering] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('eventProviders')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const events = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              // isHearted: false,
            };
          });
          if (events && events.length > 0) {
            setEventProviders(events);
          }
        }
      });

    return () => subscriber();
  }, []);

  // useEffect(() => {
  //   const services = provider.services;
  //   if (services) {
  //     if (services.includes('jane')) {
  //       console.log('search Catering');
  //     }
  //   }
  //   // const subscriber = firestore()
  //   //   .collection('eventProviders')
  //   //   .doc(`${provider.key}`)
  //   //   .collection('catering')
  //   //   .onSnapshot((querySnapshot) => {
  //   //     if (querySnapshot) {
  //   //       const events = querySnapshot.docs.map((documentSnapshot) => {
  //   //         return {
  //   //           ...documentSnapshot.data(),
  //   //           key: documentSnapshot.id,
  //   //           // isHearted: false,
  //   //         };
  //   //       });
  //   //       if (events && events.length > 0) {
  //   //         setEventProviders(events);
  //   //       }
  //   //     }
  //   //   });

  //   // return () => subscriber();
  // }, [provider]);

  // const useProvider = (item) => {
  //   setProvider(item);
  //   console.log(provider);
  //   // const services = item.services;
  //   // if (services) {
  //   //   if (services.includes('catering')) {
  //   //     setCatering(true);
  //   //   }
  //   // }
  // };

  return (
    <EventContext.Provider
      value={{
        eventProviders,
        // provider,
        // setProvider,
      }}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
