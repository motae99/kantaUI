import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import {Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from 'context/authContext';
import Toast from 'react-native-toast-message';
import I18n from 'utils/i18n';

const {width, height} = Dimensions.get('window');

export const EventContext = createContext();

const EventContextProvider = (props) => {
  const {dbUser, likes} = React.useContext(AuthContext);
  const amountRef = useRef(null);

  const [eventProviders, setEventProviders] = useState(null);
  const [selectedServices, setselectedServices] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [selectedTime, setSelectedTime] = useState('evening');
  const [provider, setProvider] = useState(null);
  const [amount, setAmount] = useState(null);

  // const [cateringLoading, setCateringLoading] = useState(true);
  // const [catering, setCatering] = useState(false);

  const updateProvider = (item) => {
    setProvider(item);
  };

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
  //   // if (provider) {
  //   //   let current =
  //   //     selectedTime === 'evening' ? provider.evening : provider.night;
  //   //   console.log('current before', current);
  //   //   if (selectedServices[0]) {
  //   //     if (selectedServices[0].catering) {
  //   //       current = current + Number(selectedServices[0].catering.price);
  //   //       console.log('current catering', current);
  //   //     }
  //   //     if (selectedServices[0].weddingStage) {
  //   //       current = current + Number(selectedServices[0].weddingStage.price);
  //   //       console.log('current weddingStage', current);
  //   //     }
  //   //     if (selectedServices[0].photography) {
  //   //       current = current + Number(selectedServices[0].photography.price);
  //   //       console.log('current photography', current);
  //   //     }
  //   //   } else {
  //   //     console.log('we do not');
  //   //   }
  //   //   console.log('current after', current);
  //   //   setAmount(current);
  //   // }
  //   let total = 0;
  //   selectedServices.forEach((service) => {
  //     total += Number(service.data.price);
  //   });
  //   console.log('total', total);
  //   console.log('selectedServices', selectedServices);
  // }, [selectedServices, selectedTime, provider]);

  const updateAmount = () => {
    // console.log('amount Changed');
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
        amountRef,
        updateProvider,
        provider,
        setProvider,
      }}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
