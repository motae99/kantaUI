import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Sizing, Outlines, Colors, Typography} from 'styles';

const {width, height} = Dimensions.get('window');
const Sheet = ({selected, requestedAction, process}) => {
  const isServices = selected.additionalServices.length > 0 ? true : false;
  const services = selected.additionalServices;
  return (
    <View style={styles.contentContainer}>
      {requestedAction === 'confirm' ? (
        <TouchableOpacity
          onPress={process}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: width * 0.9,
            borderRadius: 5,
            backgroundColor: Colors.secondary.brand,
            alignSelf: 'center',
          }}>
          <Text style={{color: Colors.neutral.white, ...Typography.header.x30}}>
            Pay Now {selected.totalCost * 0.2}
          </Text>
        </TouchableOpacity>
      ) : null}

      {requestedAction === 'cancel' ? (
        <TouchableOpacity
          onPress={process}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: width * 0.9,
            borderRadius: 5,
            backgroundColor: Colors.primary.brand,
            alignSelf: 'center',
          }}>
          <Text style={{color: Colors.neutral.white, ...Typography.header.x30}}>
            Cancel Now
          </Text>
        </TouchableOpacity>
      ) : null}

      {isServices ? (
        <FlatList
          data={services}
          keyExtractor={(item) => item.name + item.data.price}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width,
            // marginHorizontal: 20,
            paddingTop: 10,
          }}
          renderItem={({item, index}) => {
            // console.log(item);
            // return <BookingCard {...{item, index, action}} />;
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: Colors.neutral.s100,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                  padding: 5,
                  borderRadius: 5,
                  width: '90%',
                  alignSelf: 'center',
                  height: 55,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 4,
                    padding: 10,
                  }}>
                  <Text style={{}}>{item.name}</Text>
                  <Text style={{}}>{item.data.price}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', padding: 10}}>
                  <Ionicons name="checkmark" color="green" size={20} />
                </View>
              </View>
            );
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Sheet;
