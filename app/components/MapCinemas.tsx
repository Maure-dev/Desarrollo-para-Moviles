import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapCinemasProps } from '../entities/entities';
import { View, Text } from 'react-native';

export default function MapCinemas(props: MapCinemasProps) {
  const { cinemas, styles, onSelectCinema } = props;

  return (
    <MapView
      style={styles}
      showsUserLocation={true}
    >
      {cinemas.map((cine) => (
        <Marker
          key={cine.id}
          coordinate={{ latitude: cine.latitude, longitude: cine.longitude }}
          onPress={() => onSelectCinema && onSelectCinema(cine.id)}
        >
          <Callout>
            <View style={{ width: 180 }}>
              <Text style={{ fontWeight: 'bold' }}>{cine.name}</Text>
              <Text>Tocar para ver más</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}