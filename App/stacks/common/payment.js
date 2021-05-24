/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {sha256} from 'react-native-sha256';
import WebView from 'react-native-webview';
import {
  REQUEST_URL,
  CURRENCY,
  APPLICATION_ID,
  SERVICE_ID,
  APPLICATION_SALT,
  APPLICATION_KEY,
  PAYEE_ID,
} from 'constants/apiConstants';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const Payment = (props) => {
  const {amount, booking} = props.route.params;
  const [pUrl, setUrl] = React.useState(null);
  const [requestHash, setHash] = React.useState(null);
  const [tId, setTransactionId] = React.useState(null);

  const costumerRef = booking.userId;
  const accountNo = booking.UserId;
  const customerName = booking.userDisplayName;
  const serviceType = 'testing'; //booking.providerType;

  const request_sha = `${APPLICATION_KEY}|${APPLICATION_ID}|${SERVICE_ID}|${amount}|${CURRENCY}|${costumerRef}|${APPLICATION_SALT}`;

  const requestPaymentUrl = async () => {
    try {
      const generatedHash = await sha256(request_sha).then((hash) => {
        setHash(hash);
        return hash;
      });
      const body = JSON.stringify({
        applicationId: APPLICATION_ID,
        payeeId: PAYEE_ID,
        serviceId: SERVICE_ID,
        customerRef: costumerRef,
        currency: CURRENCY,
        amount: amount,
        paymentInfo: {
          accountNo: accountNo,
          customerName: customerName,
          serviceType: serviceType,
        },
        hash: generatedHash,
      });

      const data = await fetch(REQUEST_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });
      const returned = await data.json();
      const {
        transactionId,
        paymentUrl,
        responseMessage,
        responseCode,
        tranTimestamp,
        status,
      } = returned;
      if (responseCode !== 1) {
        console.log('error happed please handle it');
      }
      if (responseMessage === 'Approved') {
        firestore()
          .collection('payments')
          .doc(transactionId)
          .set({
            userId: costumerRef,
            timeStamp: tranTimestamp,
            amount: amount,
            userName: customerName,
            accountNo: accountNo,
            serviceType: serviceType,
            bookingId: booking.key,
            providerId: booking.providerId,
            status: status,
          })
          .then(() => {
            setUrl(paymentUrl);
            setTransactionId(transactionId);
          })
          .catch((error) => {
            console.log('saving to database erre', error);
          });
      }

      console.log('returned', returned);
      return returned;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const requestPayment = requestPaymentUrl();
    return () => requestPayment;
  }, []);

  const Loading = () => {
    return (
      <View
        style={{
          width,
          height,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 38}}>
          loading ...
        </Text>
      </View>
    );
  };

  if (pUrl && tId) {
    console.log(tId);
    return (
      <View style={{flex: 1}}>
        {/* <View
          style={{
            position: 'absolute',
            top: 15,
            left: 15,
            width: 30,
            height: 30,
            zIndex: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Ionicons name="menu" size={25} color="black" />
          </TouchableOpacity>
        </View> */}

        <WebView
          source={{uri: 'https://www.google.com'}}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
          containerStyle={{marginTop: 10}}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>first load</Text>
    </View>
  );
};
export default Payment;
