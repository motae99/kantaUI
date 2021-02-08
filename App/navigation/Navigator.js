// import React, {useState} from 'react';
// import {Button, TextInput} from 'react-native';
// import auth from '@react-native-firebase/auth';

// function PhoneSignIn() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={(text) => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import Phone from '../stacks/auth/Phone';
import Verify from '../stacks/auth/Verify';
import Intro from '../stacks/auth/Intro';
import Category from '../stacks/home/Category';
import Events from '../stacks/home/Events';
import Beauty from '../stacks/home/Beauty';
import beautyList from '../stacks/home/beautyList';

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

const bottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Beauty" component={Beauty} />
        <Tab.Screen name="Intro" component={Intro} />
        <Tab.Screen name="Phone" component={Phone} />
        <Tab.Screen name="Verify" component={Verify} />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="Events" component={Events} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const BeautyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Home" component={Beauty} />
        <Stack.Screen name="beautyList" component={beautyList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default BeautyStack;
