import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

import {Sizing, Outlines, Colors, Typography} from 'styles';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: Sizing.x20,
    backgroundColor: Colors.neutral.white,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Sizing.x40,
    height: Sizing.x40,
  },
  header: {
    marginTop: Sizing.x30,
    ...Typography.header.x40,
  },
  textDesc: {
    marginTop: Sizing.x50,
    ...Typography.header.x20,
  },
  textArea: {
    marginTop: Sizing.x10,
    borderWidth: 0.7,
    borderColor: Colors.neutral.s500,
    borderRadius: Sizing.x5,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: Sizing.x50,
    height: 55,
    width: '100%',
    backgroundColor: Colors.primary.brand,
    borderRadius: Sizing.x5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: Colors.secondary.brand,
    ...Typography.header.x20,
  },
  textNote: {
    marginTop: Sizing.x60,
    color: Colors.neutral.s200,
    alignSelf: 'center',
    ...Typography.header.x20,
  },
});

const FeedBack = ({route, navigation}) => {
  const {item} = route.params;

  const [modalVisible, setModalVisible] = React.useState(false);

  const [review, setReview] = useState('');
  const [rate, setRate] = useState('3.3');

  const submit = () => {
    // console.log('rate', rate);
    // console.log('review', review);
    // console.log('item', item);

    const feedBackData = {
      bookingId: item.key,
      providerId: item.providerId,
      userId: item.userId,
      userDisplayName: item.userDisplayName,
      userPhotoURL: item.userPhotoURL,
      timeStame: Date.now(),
      rate: rate,
      review: review,
    };

    const bookingData = {
      ratedAt: Date.now(),
      rate: rate,
      review: review,
    };

    const snippetData = {
      bookingId: item.key,
      userId: item.userId,
      userDisplayName: item.userDisplayName,
      userPhotoURL: item.userPhotoURL,
      timeStame: Date.now(),
      rate: rate,
      review: review,
    };

    return firestore()
      .collection('feedBack')
      .doc(item.key)
      .set(feedBackData)
      .then(() => {
        firestore().collection('bookings').doc(item.key).update(bookingData);
      })
      .then(() => {
        firestore()
          .collection('eventProviders')
          .doc(item.providerId)
          .get()
          .then((documentSnapshot) => {
            const currentTotalRate = documentSnapshot.data().totalRate;
            const currentNumberOfRate = documentSnapshot.data().numberOfRate;
            const updateData = {
              totalRate: currentTotalRate ? currentTotalRate + rate : rate,
              numberOfRate: currentNumberOfRate ? currentNumberOfRate + 1 : 1,
              snippet: snippetData,
            };
            return firestore()
              .collection('eventProviders')
              .doc(item.providerId)
              .update(updateData);

            // console.log('Total users: ', querySnapshot.size);

            // querySnapshot.forEach(documentSnapshot => {
            //   console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          });
        setRate('3.3');
        setReview('');
        navigation.goBack();
      })
      .catch((error) => console.log(error));
  };
  return (
    // <FeedBack {...{setModalVisible, modalVisible, item, setSort}} />

    <View style={styles.centeredView}>
      {/* <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={Colors.secondary.brand} />
      </TouchableOpacity> */}
      <Text style={styles.header}>Give FeedBack</Text>
      <Text style={styles.textDesc}>How did we do ?</Text>
      <Rating
        showRating
        fractions={0}
        startingValue={rate}
        onFinishRating={(rating) => setRate(rating)}
      />
      <Text style={styles.textDesc}>Care to share more about it !</Text>
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={10}
        onChangeText={(text) => setReview(text)}
        value={review}
      />
      <TouchableOpacity onPress={submit} style={styles.submitButton}>
        <Text style={styles.submitText}>PUBLISH FEEDBACK</Text>
      </TouchableOpacity>
      <Text style={styles.textNote}>
        Your review will be posted to providers page
      </Text>
    </View>
  );
};
export default FeedBack;
