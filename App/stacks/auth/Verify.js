/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
const App = () => {
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const codeInputRef = useRef(null);

  const onFulfill = (code) => {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef.clear()
    if (code === 123456) {
      Alert.alert('Confirmation Code', 'Successful!', [{text: 'OK'}], {
        cancelable: false,
      });
    } else {
      Alert.alert('Confirmation Code', 'Code not match!', [{text: 'OK'}], {
        cancelable: false,
      });

      codeInputRef.clear();
    }
  };

  const onFinishCheckingCode = (isValid, code) => {
    console.log(isValid);
    if (!isValid) {
      Alert.alert('Confirmation Code', 'Code not match!', [{text: 'OK'}], {
        cancelable: false,
      });
    } else {
      setCode(code);
      Alert.alert('Confirmation Code', 'Successful!', [{text: 'OK'}], {
        cancelable: false,
      });
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </View>

        <SafeAreaView style={styles.wrapper}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Verify phone</Text>
            <Text style={styles.subtitle}>
              Please enter 4-digit code sent to
            </Text>
            <Text style={{color: '#219CAB'}}>+00 123 456 789</Text>
          </View>
          <View style={{height: 70}}>
            <CodeInput
              ref={codeInputRef}
              keyboardType="numeric"
              codeLength={6}
              compareWithCode="123456"
              autoFocus={false}
              ignoreCase={true}
              inputPosition="center"
              size={46}
              space={9}
              onFulfill={(isValid) => onFinishCheckingCode(isValid)}
              containerStyle={{marginTop: 44, width: '100%'}}
              codeInputStyle={{
                borderWidth: 1.5,
                borderRadius: 10,
                fontSize: 19,
                fontWeight: 'bold',
              }}
              activeColor="#7A18BB"
              inactiveColor="rgba(0,0,0,0.2)"
              onCodeChange={(code) => {
                setCode(code);
              }}
            />
          </View>

          <TouchableOpacity style={styles.sendCodeButton} onPress={() => {}}>
            <LinearGradient
              colors={['#55DAEA', '#219CAB']}
              style={styles.sendCodeButton}>
              <Text style={styles.sendCodeText}>VERIFY</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.subtitle}>if you didn't recieve a code</Text>
            <Text
              style={{
                marginLeft: 10,
                justifyContent: 'flex-end',
                alignSelf: 'center',
                color: '#219CAB',
                marginTop: 10,
                fontSize: 14,
                lineHeight: 18,
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
              }}>
              Resend
            </Text>
          </View>
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
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'normal',
    fontFamily: 'Montserrat',
    color: '#3B3C53',
  },

  sendCodeButton: {
    height: 65,
    width: '100%',
    borderRadius: 100,
    marginTop: 46,
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
});

export default App;
