/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {SharedElement} from 'react-navigation-shared-element';

// import MapView, {Marker} from 'react-native-maps';

const {width, height} = Dimensions.get('window');

const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const headerImageHeight = height * 0.65;
const headerHieght = height / 6;

const Detail = ({navigation, route}) => {
  const {selectedItem} = route.params;

  const [current, setCurrent] = React.useState(1);
  const onViewRef = React.useRef(({viewableItems, changed}) => {
    setCurrent(viewableItems[0]?.index + 1);
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <View style={{backgroundColor: '#E5E5E5', flex: 1}}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="transparent"
      />
      <View
        style={{
          width,
          height: headerImageHeight,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          overflow: 'hidden',
        }}>
        <FlatList
          horizontal
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          data={selectedItem.files}
          keyExtractor={(item) => item.key}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({item, index}) => {
            return (
              <View>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={{width, height: headerImageHeight}}>
                  <Image
                    style={{
                      width,
                      height: headerImageHeight,
                      resizeMode: 'cover',
                    }}
                    source={item.image}
                  />
                </SharedElement>
              </View>
            );
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 18,
            right: 18,
            width: 50,
            height: 24,
            backgroundColor: 'rgba(34,40,42,.7)',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            // opacity: 0.6,
          }}>
          <Text style={{color: 'white'}}>
            {current}/{selectedItem.files.length}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height: headerHieght,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 18,
        }}>
        <View
          style={{
            height: 32,
            width: 32,
            backgroundColor: 'white',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="arrow-back" size={20} color="#2B3449" />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
            <Ionicons name="heart" size={20} color="#2B3449" />
          </View>
          <View
            style={{
              height: 32,
              width: 32,
              backgroundColor: 'white',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Fontisto name="share-a" size={18} color="#2B3449" />
          </View>
        </View>
      </View>
      {/* <ScrollView
        contentContainerStyle={{alignItems: 'center', marginHorizental: 18}}>
        <View style={{height: 50, width}} />
        <MapView
          style={{
            width: width * 0.9,
            height: 200,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          initialRegion={region}>
          <Marker
            title={'paryHall name'}
            description={'partyHall address'}
            coordinate={region}
          />
        </MapView>
      </ScrollView> */}
    </View>
  );
};

Detail.sharedElements = (route, otherRoute, showing) => {
  const {selectedItem} = route.params;
  return [
    {
      id: `item.${selectedItem.key}.image`,
    },
  ];
};

export default Detail;
