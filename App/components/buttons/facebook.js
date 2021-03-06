import React from 'react';
import {View, Image, Text, TouchableNativeFeedback} from 'react-native';
// import {AuthContext} from '../../context/authContext';
export default function () {
	const ripple = TouchableNativeFeedback.Ripple('#55DAEA', false);
	// const {signOut, User} = React.useContext(AuthContext);
	return (
		<View
			// elevation={6}
			style={{
				backgroundColor: '#ffffff',
				marginHorizontal: 12,
				marginVertical: 5,
				borderRadius: 10,
			}}>
			<TouchableNativeFeedback background={ripple} onPress={}>
				<View style={{flexDirection: 'row', padding: 15}}>
					<Image
						style={{
							width: 20,
							height: 20,
							marginRight: 15,
							backgroundColor: 'red',
						}}
						source={require('assets/img/facebookColor.png')}
					/>
					<Text style={{color: 'black', fontFamily: 'sans-serif-medium'}}>
						Facebook
					</Text>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}
