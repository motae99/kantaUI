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
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {SharedElement} from 'react-navigation-shared-element';

import MapView, {Marker} from 'react-native-maps';

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
  const {selectedItem, selectedImageIndex} = route.params;

  const [current, setCurrent] = React.useState(selectedImageIndex);
  const list = React.useRef();
  const onViewRef = React.useRef(({viewableItems, changed}) => {
    setCurrent(viewableItems[0]?.index + 1);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  // React.useEffect(() => {
  //   if (list.current) {
  //     list.current.initialScrollIndex({selectedImageIndex});
  //   }
  // }, [selectedImageIndex]);

  return (
    <View style={{backgroundColor: '#E5E5E5', flex: 1}}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="transparent"
      />

      <ScrollView contentContainerStyle={{paddingHorizontal: 18}}>
        <View
          style={{
            width,
            height: headerImageHeight,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            overflow: 'hidden',
          }}>
          <FlatList
            ref={list}
            horizontal
            snapToInterval={width}
            showsHorizontalScrollIndicator={false}
            // initialScrollIndex={selectedImageIndex}
            data={selectedItem.files}
            keyExtractor={(item) => item.key}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            renderItem={({item, index}) => {
              return (
                <View>
                  <SharedElement
                    id={`item.${selectedItem.key}.image.${item.key}`}
                    style={{
                      width,
                      height: headerImageHeight,
                    }}>
                    <Image
                      style={{
                        width,
                        height: headerImageHeight,
                        resizeMode: 'cover',
                        borderBottomRightRadius: 25,
                        borderBottomLeftRadius: 25,
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
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              // list.current.scrollToIndex({
              //   animated: true,
              //   index: selectedImageIndex,
              // });
              // setTimeout(() => {
              //   navigation.goBack();
              // }, 300);
              navigation.goBack();
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
          </TouchableOpacity>
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
        <View style={{marginTop: 24}}>
          <Text
            style={{fontFamily: 'Montserrat', fontSize: 18, fontWeight: '800'}}>
            {selectedItem.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignItems: 'center',
              marginTop: 8,
              marginBottom: 16,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="md-location-outline" size={18} color="#2B3449" />
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'rgba(43,52,73,1)',
                  paddingLeft: 4,
                }}>
                {selectedItem.address}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="star" size={18} color="#219CAB" />
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'rgba(43,52,73,1)',
                  paddingLeft: 4,
                }}>
                {selectedItem.rate}(2.2K review)
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 14,
              fontWeight: '500',
              marginBottom: 18,
            }}>
            Get Directions
          </Text>
          <View
            style={{borderRadius: 16, overflow: 'hidden', height: height / 5}}>
            <MapView
              style={{
                flex: 1,
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

Detail.sharedElements = (route, otherRoute, showing) => {
  const {selectedItem} = route.params;
  return selectedItem.files.map(
    (item) => `item.${selectedItem.key}.image.${item.key}`,
  );
};

export default Detail;
