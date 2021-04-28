import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import Searchbar from 'events/components/Searchbar';

import Add from 'assets/svg/Add';
import Menu from 'assets/svg/Menu';
import Search from 'assets/svg/Search';

const Header = (props) => {
  const navigation = useNavigation();
  const {headerHeight} = props;
  console.log(headerHeight);
  return (
    <>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 2,
            backgroundColor: '#1c1c1c',
          },
        ]}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Menu />
        </TouchableOpacity>
        <Text style={styles.conversation}>Events</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}>
          <Add />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 2,
            backgroundColor: 'green',
          },
        ]}>
        <View style={styles.searchBox}>
          <Search />
          <Text style={styles.searchText}>Search for messages or users</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    paddingHorizontal: 10,
    // backgroundColor: '#1c1c1c',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversation: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  searchText: {
    color: '#8B8B8B',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
  },
  searchBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  touchable: {},
});
export default Header;
