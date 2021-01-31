import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import codePush from 'react-native-code-push';
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
  return (
    <>
      <StatusBar translucent={true} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </View>

        <SafeAreaView style={styles.wrapper}>
          {/* {showMessage && (
            <View style={styles.message}>
              <Text>Country Code : {countryCode}</Text>
              <Text>Value : {value}</Text>
              <Text>Formatted Value : {formattedValue}</Text>
              <Text>Valid : {valid ? 'true' : 'false'}</Text>
            </View>
          )} */}

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Verify phone</Text>
            <Text style={styles.subtitle}>
              Please enter your country & your mobile number
            </Text>
          </View>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.textContainer}
            flagButtonStyle={styles.flagButton}
            textInputStyle={styles.textInputStyle}
            countryPickerButtonStyle={styles.countryPickerButtonStyle}
            defaultCode="SA"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
            }}
            countryPickerProps={{withAlphaFilter: true}}
            disabled={disabled}
            disableArrowIcon
            withShadow
            autoFocus
          />

          <TouchableOpacity
            style={styles.sendCodeButton}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
              let getNumberAfterPossiblyEliminatingZero = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
              console.log(getNumberAfterPossiblyEliminatingZero);
            }}>
            <LinearGradient
              colors={['#55DAEA', '#219CAB']}
              style={styles.sendCodeButton}>
              <Text style={styles.sendCodeText}>SEND CODE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 28,
    marginTop: 140,
  },
  backButton: {
    position: 'absolute',
    top: 59,
    left: 20,
    backgroundColor: '#fff',
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  infoContainer: {
    width: 230,
  },
  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#3B3C53',
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'normal',
    fontFamily: 'Montserrat',
    color: '#3B3C53',
  },
  phoneContainer: {
    width: '100%',
    borderRadius: 15,
    height: 70,
    marginTop: 40,
  },
  textContainer: {
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagButton: {
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderRightWidth: 1,
  },
  textInputStyle: {
    // justifyContent: 'center',
    // alignItems: 'center'
    letterSpacing: 2,
  },
  countryPickerButtonStyle: {},
  sendCodeButton: {
    height: 65,
    width: '100%',
    borderRadius: 100,
    marginTop: 36,
    // backgroundColor: '#55DAEA',
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: rgba(73, 204, 220, 0.4),
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // elevation: 5,
  },
  sendCodeText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
    fontFamily: 'Gilroy',
    letterSpacing: 3,
    color: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    height: 40,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default codePush(codePushOptions)(App);
