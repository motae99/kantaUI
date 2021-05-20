import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import * as geofirestore from 'geofirestore';
import {AuthContext} from 'context/authContext';
export const EventContext = createContext();

const EventContextProvider = (props) => {
  const GeoFirestore = geofirestore.initializeApp(firestore());
  const geocollection = GeoFirestore.collection('eventProviders');
  const {likes, currentLocation} = useContext(AuthContext);
  const [eventProviders, setEventProviders] = useState(null);
  const [selectedServices, setselectedServices] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('evening');
  const [filterQuery, setFilterQuery] = useState(geocollection);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [sortBy, setSortBy] = useState('low');
  const [eventsLoading, setEventsLoading] = useState(true);

  const nearQuery = (radius) => {
    const query = geocollection.near({
      center: new firestore.GeoPoint(
        currentLocation.latitude,
        currentLocation.longitude,
      ),
      radius: radius,
    });
    setFilterQuery(query);
    setCurrentFilter({near: radius});
  };

  useMemo(() => {
    setEventsLoading(true);

    if (sortBy === 'distance') {
      const query = geocollection.near({
        center: new firestore.GeoPoint(
          currentLocation.latitude,
          currentLocation.longitude,
        ),
        radius: 1000,
      });
      setFilterQuery(query);
    }

    if (sortBy === 'rate') {
      const query = firestore()
        .collection('eventProviders')
        .orderBy('totalRate', 'desc');
      setFilterQuery(query);
    }

    if (sortBy === 'low') {
      const query = firestore()
        .collection('eventProviders')
        .orderBy(selectedTime, 'asc');
      setFilterQuery(query);
    }

    if (sortBy === 'high') {
      const query = firestore()
        .collection('eventProviders')
        .orderBy(selectedTime, 'desc');
      setFilterQuery(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const priceRange = (min, max) => {
    const query = geocollection
      .where(`${selectedTime}`, '>=', min)
      .where(`${selectedTime}`, '<=', max)
      .orderBy(`${selectedTime}`, 'asc');
    setFilterQuery(query);
  };

  useEffect(() => {
    const subscriber = filterQuery.onSnapshot((querySnapshot) => {
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
          setEventsLoading(false);
        }
      }
    });

    return () => subscriber();
  }, [likes, filterQuery]);

  const creatBooking = (data) => {
    // const topic = data.providerType + data.providerName + data.date + data.time;
    const topic = data.providerId + data.date;
    console.log('topic', topic);

    return firestore()
      .collection('bookings')
      .add(data)
      .then(() => {
        messaging().subscribeToTopic(String(topic));
      });
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
        priceRange,
        nearQuery,
        sortBy,
        setSortBy,
        eventsLoading,
      }}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
