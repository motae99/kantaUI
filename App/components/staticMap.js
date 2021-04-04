import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Map = ({item}) => {
  const region = {
    latitude: item.coordinate.latitude,
    longitude: item.coordinate.longitude,
    latitudeDelta: 0.0192,
    longitudeDelta: 0.0142,
  };
  return (
    <MapView
      style={{
        flex: 1,
      }}
      scrollEnabled={false}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      initialRegion={region}>
      <Marker title={item.name} description={item.address} coordinate={region}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <MaterialIcons name="my-location" size={30} color={'#219CAB'} />
        </View>
      </Marker>
    </MapView>
  );
};
export default Map;
