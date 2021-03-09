/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, TouchableNativeFeedback, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Facebook from 'components/buttons/facebook';
import Phone from 'components/buttons/phone';
import Animated from 'react-native-reanimated';

import HomeStack from 'navigation/homeStack';
import {AuthContext} from 'context/authContext';

function Language() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Language Screen</Text>
    </View>
  );
}

function Vouchers() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Vouchers Screen</Text>
    </View>
  );
}

function CustomDrawerContent({progress, ...rest}) {
  const {signOut, User} = React.useContext(AuthContext);
  const ripple = TouchableNativeFeedback.Ripple('#55DAEA', false);

  // console.log('user', User.providerData[0].displayName);
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  // const googleLable = User?.providerData[0].providerId;
  // const googleLable = true;

  // // if (User.providerData[0].providerId === 'google.com') {
  // // const googleLabel = User?.providerData[0].displayName || 'Connect Google';
  // // }

  // const google = ({googleLable}) => {
  //   const colored = googleLable ? 'red' : 'green';
  //   return (
  //     <Text style={{color: colored}}>
  //       {focused ? 'Focused text' : 'Unfocused text'}
  //     </Text>
  //   );
  // };

  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{transform: [{translateX}]}}>
        <View style={{height: 200, backgroundColor: 'green'}} />
        <DrawerItemList {...rest} />
        {/* <DrawerItem label={google({googleLable})} onPress={() => signOut()} /> */}
        <DrawerItem label="Connect Facebook" onPress={() => signOut()} />
        <DrawerItem label="Verify Number" onPress={() => signOut()} />
        <DrawerItem label="SignOut" onPress={() => signOut()} />
        {/* <DrawerItem
        label="Privacy & Policy"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      /> */}
        <Facebook />
        <Phone {...rest} />
        <View
          // elevation={6}
          style={{
            backgroundColor: '#ffffff',
            marginHorizontal: 12,
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <TouchableNativeFeedback background={ripple}>
            <View style={{flexDirection: 'row', padding: 15}}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 15,
                }}
                source={require('img/googleColor.png')}
              />
              <Text style={{color: 'black', fontFamily: 'sans-serif-medium'}}>
                Google
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View
          // elevation={6}
          style={{
            backgroundColor: '#ffffff',
            marginHorizontal: 12,
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <TouchableNativeFeedback background={ripple}>
            <View style={{flexDirection: 'row', padding: 15}}>
              <Icon
                name="logout"
                type="simple-line-icon"
                size={24}
                color={'black'}
                style={{marginRight: 20}}
              />
              <Text style={{color: 'black', fontFamily: 'sans-serif-medium'}}>
                Logout
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View
          // elevation={6}
          style={{
            backgroundColor: '#ffffff',
            marginHorizontal: 12,
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <TouchableNativeFeedback background={ripple}>
            <View style={{flexDirection: 'row', padding: 15}}>
              <Icon
                name="logout"
                type="simple-line-icon"
                size={24}
                color={'black'}
                style={{marginRight: 20}}
              />
              <Text style={{color: 'black', fontFamily: 'sans-serif-medium'}}>
                Logout
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View
          // elevation={6}
          style={{
            backgroundColor: '#ffffff',
            marginHorizontal: 12,
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <TouchableNativeFeedback background={ripple}>
            <View style={{flexDirection: 'row', padding: 15}}>
              <Icon
                name="logout"
                type="simple-line-icon"
                size={24}
                color={'black'}
                style={{marginRight: 20}}
              />
              <Text style={{color: 'black', fontFamily: 'sans-serif-medium'}}>
                Logout
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerStyle={{
        backgroundColor: '#F8F8FD',
        width: 300,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="Language" component={Language} />
      <Drawer.Screen name="Vouchers" component={Vouchers} />
    </Drawer.Navigator>
  );
}

// class CustomDrawerContentComponent extends Component {
//   render() {
//     const { theme, user } = this.props;
//     const ripple = TouchableNativeFeedback.Ripple('#adacac', false);

//     return (
//       <View style={{ flex: 1 }}>

//         <ScrollView>
//           <SafeAreaView
//             style={styles.container}
//             forceInset={{ top: 'always', horizontal: 'never' }}
//           >
//             <View style={[ styles.containHeader, { backgroundColor: theme.pri700 }]}>
//               <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                 <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
//                 <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hi ${user.firstname}`}</Text>
//                 <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`${user.email}`}</Text>
//               </View>
//             </View>

//             <DrawerItems {...this.props} />

//             <View>
//               <View style={{ marginTop: '2%' }}>
//                 <Divider style={{ backgroundColor: '#777f7c90' }} />
//               </View>
//               <View style={{ marginTop: '3%' }}>
//                 <ColorPalette />
//               </View>
//               <View style={{ marginTop: '5%' }}>
//                 <Divider style={{ backgroundColor: '#777f7c90' }} />
//               </View>
//             </View>
//           </SafeAreaView>
//         </ScrollView>

//         <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
//           <TouchableNativeFeedback background={ripple}>
//             <View style={styles.containDrawerOption}>
//               <Icon
//                 name='logout'
//                 type='simple-line-icon'
//                 size={20}
//                 color={theme.pri700}
//                 containerStyle={{ marginRight: '10%' }}
//               />
//               <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Logout</Text>
//             </View>
//           </TouchableNativeFeedback>

//           <TouchableNativeFeedback background={ripple}>
//             <View style={styles.containDrawerOption}>
//               <Icon
//                 name='user-secret'
//                 type='font-awesome'
//                 size={24}
//                 color={theme.pri700}
//                 containerStyle={{ marginRight: '10%' }}
//               />
//               <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Developer</Text>
//             </View>
//           </TouchableNativeFeedback>
//         </View>

//       </View>
//     );
//   }
// }
