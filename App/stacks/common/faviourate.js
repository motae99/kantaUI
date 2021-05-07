/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {Sizing, Outlines, Colors, Typography} from 'styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from 'context/authContext';
import EventCard from 'stacks/common/components/eventFaviourate';
import {useNavigation} from '@react-navigation/native';

const PreviousList = () => {
  const {likes} = React.useContext(AuthContext);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'title',
    });
  }, [navigation]);
  // console.log('likes', likes);
  if (!likes) {
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Add items to your wishList</Text>
    </View>;
  }
  return (
    <SafeAreaView
      mode="margin"
      style={{flex: 1, backgroundColor: Colors.neutral.s200}}>
      <FlatList
        data={likes}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        contentContainerStyle={{
          marginHorizontal: Sizing.x20,
          paddingTop: Sizing.x10,
        }}
        renderItem={({item, index}) => {
          const data = item.item;
          const type = item.type;
          return type === 'events' ? <EventCard {...{data}} /> : null;
          // return <BookingCard {...{item}} />;
        }}
      />
    </SafeAreaView>
  );
};
export default PreviousList;
