import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { MapCinemasProps } from '../entities/entities';

export default function MapCinemas({ cinemas, styles }: MapCinemasProps) {

  return (
    <MapView
      style={styles}
      initialRegion={{
        latitude: -34.603722,
        longitude: -58.410158,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {cinemas.map((cine) => (
        <Marker
          key={cine.id}
          coordinate={{ latitude: cine.latitude, longitude: cine.longitude }}
          title={cine.name}
        />
      ))}
    </MapView>
  );
}
