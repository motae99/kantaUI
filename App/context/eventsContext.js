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

  return (
    <EventContext.Provider
      value={{
        eventProviders,
      }}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
