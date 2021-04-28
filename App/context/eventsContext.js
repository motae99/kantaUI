import React, {createContext, useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from 'context/authContext';
export const EventContext = createContext();

const EventContextProvider = (props) => {
  const {likes} = useContext(AuthContext);
  const [eventProviders, setEventProviders] = useState(null);
  const [selectedServices, setselectedServices] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('evening');

  useEffect(() => {
    const subscriber = firestore()
      .collection('eventProviders')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const events = querySnapshot.docs.map((documentSnapshot) => {
            if (likes && likes.length > 0) {
              const existed = likes.filter(
                (item) => item.providerId === documentSnapshot.id,
              );
              var hearted = existed.length > 0 ? true : false;
            }

            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              isHearted: hearted,
            };
          });
          if (events && events.length > 0) {
            setEventProviders(events);
          }
        }
      });

    return () => subscriber();
  }, [likes]);

  const creatBooking = (data) => {
    // console.log(data.time);
    return firestore().collection('bookings').add(data);
  };

  const unHeart = (item, hearted) => {
    const newEvents = eventProviders;
    const index = newEvents.findIndex((event) => event.key === item.key);

    newEvents[index] = item;
    newEvents[index].isHearted = hearted;
    setEventProviders(newEvents);
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
        unHeart,
      }}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
