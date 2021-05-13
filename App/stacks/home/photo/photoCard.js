import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  useTransition,
  useSpringTransition,
} from 'react-native-redash/lib/module/v1';
import Toast from 'react-native-toast-message';
import I18n from 'utils/i18n';
import FirstNest from 'photo/components/FirstNest';
import {
  cardWidth,
  cardHeigh,
  perspective,
  fHeight,
  sHeight,
} from 'photo/components/FoldingStyle';
import Base from 'photo/components/Base';
import FrontFace from 'photo/components/FrontFace';
import BackFace from 'photo/components/BackFace';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from 'context/authContext';

const {concat, interpolate, Extrapolate} = Animated;

const styles = StyleSheet.create({
  container: {width: cardWidth, alignSelf: 'center', marginBottom: 10},
  content: {
    width: cardWidth,
    height: cardHeigh,
    alignSelf: 'center',
  },
  backFace: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontFace: {...StyleSheet.absoluteFillObject, backfaceVisibility: 'hidden'},
});

const FoldView = ({item}) => {
  const {dbUser} = useContext(AuthContext);

  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState('');
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());

  const [open, setOpen] = useState(false);
  const animation = useTransition(open, {duration: 700});
  // const animation = useSpringTransition(open);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const book = () => {
    const dateCondition =
      moment(date).format('YYYY-MM-DD') >=
      moment(Date.now()).format('YYYY-MM-DD');
    const time =
      moment(toTime).format('hh:mm A') > moment(fromTime).format('hh:mm A');
    if (selected && dateCondition && time) {
      const additionalServices = [
        {name: 'photography', data: {price: selected}},
      ];
      const data = {
        userId: dbUser.uid,
        userDisplayName: dbUser.displayName,
        userPhotoURL: dbUser.photoURL,
        userPhoneNumber: dbUser.phoneNumber,
        providerType: 'photo',
        providerUserId: item.ownerId,
        providerId: item.key,
        providerName: item.name,
        providerPhoneNumber: dbUser.phoneNumber,
        providerNamePhotoURL: item.files[0].uri,
        date: moment(date).format('YYYY-MM-DD'),
        timeStamp: Date.now(),
        fromtTime: moment(fromTime).format('hh:mm A'),
        toTime: moment(toTime).format('hh:mm A'),
        basicCost: selected,
        additionalServices,
        totalCost: selected,
        bookingStatus: 'booked',
      };
      firestore()
        .collection('bookings')
        .add(data)
        .then(() => {
          setTimeout(() => {
            setOpen((prev) => !prev);
          }, 100);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Select valid options',
        text2: 'Valid date And time range',
        // text1: I18n.t('Select valid options'),
        // text2: I18n.t('Valid date or time range'),
        // position: 'top | bottom',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        // bottomOffset: 40,
      });
      setTimeout(() => {
        setOpen((prev) => !prev);
      }, 100);
    }
  };

  const height = interpolate(animation, {
    inputRange: [0, 0.8],
    outputRange: [cardHeigh, cardHeigh * 2 + fHeight + sHeight + 5],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateXAsDegBack = interpolate(animation, {
    inputRange: [0, 0.4],
    outputRange: [0, -180],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateX = concat(rotateXAsDegBack, 'deg');

  const transformBackFace = [
    {perspective},
    {translateY: cardHeigh / 2},
    {rotateX},
    {translateY: -cardHeigh / 2},
    {rotateX: '180deg'},
  ];

  const transformFrontFace = [
    {perspective},
    {translateY: cardHeigh / 2},
    {rotateX},
    {translateY: -cardHeigh / 2},
  ];

  return (
    <Animated.View style={[styles.container, {height}]}>
      <Animated.View style={styles.content}>
        <Base {...{toggle, animation, item}} />

        <Animated.View
          style={[
            styles.backFace,
            {transform: transformBackFace, borderRadius: 20},
          ]}>
          <BackFace
            {...{
              animation,
              item,
              fromTime,
              setFromTime,
              toTime,
              setToTime,
              setSelected,
              selected,
            }}
          />

          <FirstNest {...{animation, toggle, date, setDate, selected, book}} />
        </Animated.View>

        <Animated.View
          style={[
            styles.frontFace,
            {transform: transformFrontFace, borderRadius: 20},
          ]}>
          <FrontFace {...{toggle, item}} />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default FoldView;
