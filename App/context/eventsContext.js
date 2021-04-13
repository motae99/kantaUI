import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const EventContext = createContext();

const EventContextProvider = (props) => {
  const [eventProviders, setEventProviders] = useState(null);
  const [selectedServices, setselectedServices] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [selectedTime, setSelectedTime] = useState('evening');

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

  const creatBooking = (data) => {
    // console.log(data.time);
    return firestore().collection('bookings').add(data);
  };
  return (
    <EventContext.Provider
      value={{
        eventProviders,
        selectedServices,
        setselectedServices,
        date,
        setDate,
        selectedTime,
        setSelectedTime,
        creatBooking,
      }}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
