/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import {AuthContext} from 'context/authContext';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from 'utils/i18n';

export default function ({navigation}) {
  const ripple = TouchableNativeFeedback.Ripple(Colors.secondary.s200, false);
  const {User, connectPhone} = React.useContext(AuthContext);

  // console.log('User ', User);
  let connected = false;
  // let Number = User?.providerData[1].displayName || 'Facebook';

  return (
    <View
      // elevation={6}
      style={{
        backgroundColor: Colors.neutral.white,
        marginHorizontal: Sizing.x10,
        marginVertical: Sizing.x5,
        borderRadius: Outlines.borderRadius.base,
      }}>
      <TouchableNativeFeedback
        background={ripple}
        onPress={
          // () => connectPhone('+249999099148')
          () =>
            connected
              ? null
              : navigation.navigate('HomeStack', {screen: 'Phone'})
        }>
        <View style={{flexDirection: 'row', padding: Sizing.x10 + Sizing.x5}}>
          <Icon
            name="mobile1"
            type="simple-line-icon"
            size={Sizing.x20}
            color={connected ? Colors.primary.s200 : Colors.neutral.black}
            style={{marginRight: Sizing.x10 + Sizing.x5}}
          />
          <Text
            style={{
              ...Typography.body.x10,
              color: Colors.neutral.black,
              letterSpacing: 2,
            }}>
            {connected ? connected : I18n.t('drawerPhoneNumber')}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
