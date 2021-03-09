/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, Fragment} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Button, CheckBox, ButtonGroup} from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from 'auth/components/formInput';
import FormButton from 'auth/components/formButton';
import ErrorMessage from 'auth/components/errorMessage';
import {AuthContext} from 'context/authContext';
import I18n from 'utils/i18n';

const {width, height} = Dimensions.get('window');
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label(I18n.t('signUpNameLabel'))
    .required(I18n.t('signUpNameRequiredError'))
    .min(2, I18n.t('signUpNameError')),
  email: Yup.string()
    .label(I18n.t('signUpEmailLabel'))
    .email(I18n.t('signUpEmailError'))
    .required(I18n.t('signUpEmailRequiredError')),
  password: Yup.string()
    .label('Password')
    .required(I18n.t('signUpPasswordRequiredError'))
    .min(6, I18n.t('signUpPasswordError')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], I18n.t('signUpconfirmPasswordError'))
    .required(I18n.t('signUpconfirmPasswordRequiredError')),
  check: Yup.boolean().oneOf([true], I18n.t('signUpCheckBoxError')),
});

const SignUp = ({navigation}) => {
  const {signUp} = useContext(AuthContext);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true,
  );
  const [passwordIcon, setPasswordIcon] = useState('ios-eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('ios-eye');
  const [index, setIndex] = useState(0);
  const genders = ['Male', 'Female'];

  const handlePasswordVisibility = () => {
    passwordIcon === 'ios-eye'
      ? setPasswordIcon('ios-eye-off')
      : setPasswordIcon('ios-eye');
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    confirmPasswordIcon === 'ios-eye'
      ? setConfirmPasswordIcon('ios-eye-off')
      : setConfirmPasswordIcon('ios-eye');
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleOnSignup = async (values, actions) => {
    const {name, email, password} = values;
    const gender = genders[index];
    try {
      await signUp({name, email, password, gender});
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          height: height / 3.8,
          // backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          elevation={50}
          style={{
            height: height / 5,
            width: height / 5,
            borderRadius: height / 5,
            backgroundColor: 'green',
            borderStyle: 'dotted',
            borderWidth: 2,
            borderColor: 'red',
            // borderRadius: 1,
          }}
        />
        <View
          elevation={60}
          style={{
            height: 40,
            width: 40,
            borderRadius: 5,
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
          }}
        />
      </View>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          check: false,
        }}
        onSubmit={(values, actions) => {
          handleOnSignup(values, actions);
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Fragment>
            <FormInput
              name="name"
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder={I18n.t('signUpNamePlaceHolder')}
              iconName="md-person"
              iconColor="#2C384A"
              onBlur={handleBlur('name')}
            />
            <ErrorMessage errorValue={touched.name && errors.name} />

            <ButtonGroup
              onPress={(selectedIndex) => setIndex(selectedIndex)}
              selectedIndex={index}
              buttons={genders}
              buttonContainerStyle={{margin: 0}}
              containerStyle={{
                borderWidth: 1,
                borderRightWidth: 0,
              }}
              innerBorderStyle={{borderWidth: 0}}
              buttonStyle={{borderRadius: 5}}
              selectedButtonStyle={{
                borderRadius: 5,
                // padding: 20,
              }}
              selectedTextStyle={{}}
              textStyle={{}}
            />

            <FormInput
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder={I18n.t('signUpEmailPlaceHolder')}
              autoCapitalize="none"
              iconName="ios-mail"
              iconColor="#2C384A"
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <FormInput
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder={I18n.t('signUpPasswordPlaceHolder')}
              iconName="lock-closed"
              iconColor="#2C384A"
              onBlur={handleBlur('password')}
              secureTextEntry={passwordVisibility}
              rightIcon={
                <TouchableOpacity onPress={handlePasswordVisibility}>
                  <Ionicon name={passwordIcon} size={28} color="grey" />
                </TouchableOpacity>
              }
            />
            <ErrorMessage errorValue={touched.password && errors.password} />
            <FormInput
              name="password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              placeholder={I18n.t('signUpConfirmPasswordPlaceHolder')}
              iconName="lock-closed"
              iconColor="#2C384A"
              onBlur={handleBlur('confirmPassword')}
              secureTextEntry={confirmPasswordVisibility}
              rightIcon={
                <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                  <Ionicon name={confirmPasswordIcon} size={28} color="grey" />
                </TouchableOpacity>
              }
            />
            <ErrorMessage
              errorValue={touched.confirmPassword && errors.confirmPassword}
            />
            <CheckBox
              containerStyle={styles.checkBoxContainer}
              checkedIcon="check-box"
              iconType="material"
              uncheckedIcon="check-box-outline-blank"
              title="Agree to terms and conditions"
              checkedTitle={I18n.t('signUpCheckedTitle')}
              checked={values.check}
              onPress={() => setFieldValue('check', !values.check)}
            />
            <View style={styles.buttonContainer}>
              <FormButton
                // buttonType="outline"
                onPress={handleSubmit}
                title={I18n.t('signUpSubmitButtonTitle')}
                buttonColor="#F57C00"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>
            <ErrorMessage errorValue={errors.general} />
          </Fragment>
        )}
      </Formik>
      <Button
        title={I18n.t('signUpHaveAccountTitle')}
        onPress={() => navigation.navigate('Login')}
        titleStyle={{
          color: '#039BE5',
        }}
        type="clear"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    padding: 20,
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});
export default SignUp;
