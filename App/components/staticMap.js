import React from 'react';
import MapView, {Marker} from 'react-native-maps';

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
      <Marker
        title={item.name}
        description={item.address}
        coordinate={region}
      />
    </MapView>
  );
};
export default Map;
