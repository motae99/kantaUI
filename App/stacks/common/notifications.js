import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {Colors} from 'styles';
import NoticationItem from 'components/notificationItem';
import AsyncStorage from '@react-native-community/async-storage';

const notifications = [
  {
    timeStamp: 2237832672,
    title: 'something',
    description: 'somekdfj adfkl ksldfjla fkljsdf kladfjlka dfkljsdfl adfklj ',
    image: 'https://www.sitepronews.com/wp-content/uploads/2016/06/notify.jpg',
    actionText: 'book Now',
    action: 'navigate to something',
  },
  {
    timeStamp: 2231132672,
    title: 'no imageelse',
    description:
      ' adfkl ksldfjla fkljsdf kladfjlka dfkljsdfl adfklj adfkl ksldfjla fkljsdf kladfjlka dfkljsdfl adfklj adfkl ksldfjla fkljsdf kladfjlka dfkljsdfl adfklj ',
    actionText: 'try Now',
    action: 'navigate to something',
  },
  {
    timeStamp: 2231132672,
    title: 'else',
    description: ' adfkl ksldfjla fkljsdf kladfjlka dfkljsdfl adfklj ',
    image: 'https://www.sitepronews.com/wp-content/uploads/2016/06/notify.jpg',
    actionText: 'try Now',
    action: 'navigate to something',
  },
];
const Notification = () => {
  // const [notifications, setNotifications] = useState(null);
  // useEffect={}
  // if (!notifications) {
  //   return null; // create placeHolder screen for empty notifications
  // }

  return (
    <FlatList
      data={notifications}
      style={{backgroundColor: Colors.neutral.s200}}
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.key}
      renderItem={({item, index}) => <NoticationItem {...{item}} />}
    />
  );
};
export default Notification;
