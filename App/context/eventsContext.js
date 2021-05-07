import React, {createContext, useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import * as geofirestore from 'geofirestore';
import {AuthContext} from 'context/authContext';
export const EventContext = createContext();

const EventContextProvider = (props) => {
  // const GeoFirestore = geofirestore.initializeApp(firestore());
  // const geocollection = GeoFirestore.collection('eventProviders');

  const {likes} = useContext(AuthContext);
  const [eventProviders, setEventProviders] = useState(null);
  const [selectedServices, setselectedServices] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('evening');
  // const [filterQuery, setFilterQuery] = useState(geocollection);

  // const nearQuery = (radius) => {
  //   const query = geocollection.near({
  //     center: new firestore.GeoPoint(15.5863, 32.5426),
  //     radius: radius,
  //   });
  // };

  useEffect(() => {
    const GeoFirestore = geofirestore.initializeApp(firestore());
    const geocollection = GeoFirestore.collection('eventProviders');
    // const query = geocollection.near({
    //   center: new firestore.GeoPoint(15.5863, 32.5426),
    //   radius: 500,
    // });
    // .orderBy('night', 'desc');
    // query.get().then((value) => {
    //   // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    //   console.log(value.docs);
    // });
    const subscriber = geocollection.onSnapshot((querySnapshot) => {
      if (querySnapshot) {
        const events = querySnapshot.docs.map((documentSnapshot) => {
          if (likes && likes.length > 0) {
            const existed = likes.filter(
              (item) => item.providerId === documentSnapshot.id,
            );
            var hearted = existed.length > 0 ? true : false;
          }
          // console.log(value.docs);
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
    console.log('hearted', hearted);
    item.isHearted = hearted;
    console.log('item', item);

    const newEvents = eventProviders;
    const index = newEvents.findIndex((event) => event.key === item.key);
    newEvents[index] = item;
    // newEvents[index].isHearted = hearted;
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
