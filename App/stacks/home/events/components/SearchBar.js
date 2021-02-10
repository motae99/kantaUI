/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBarHieght = 54;
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 18,
        height: SearchBarHieght,
      }}>
      {/* <View
            style={{
              flex: 5,
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: 15,
              marginRight: 12,
              padding: 16,
              justifyContent: 'center',
            }}> */}
      <Searchbar
        style={{
          flex: 5,
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 15,
          marginRight: 12,
          // padding: 16,
          justifyContent: 'center',
          borderWidth: 0,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {/* <Ionicons name="filter" size={24} color="#000" style={{flex: 4}} /> */}
      {/* <Text style={{paddingLeft: 16, flex: 4}}>Search Events</Text> */}
      {/* </View> */}
      <View
        style={{
          flex: 1,
          borderRadius: 15,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          colors={['#55DAEA', '#219CAB']}
          style={StyleSheet.absoluteFillObject}
        />
        <Ionicons name="filter" size={24} color="#fff" />
      </View>
    </View>
  );
};
export default SearchBar;
