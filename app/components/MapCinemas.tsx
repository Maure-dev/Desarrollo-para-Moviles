import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapCinemasProps } from '../entities/entities';
import { View, Text } from 'react-native';
import Constants from 'expo-constants';

export default function MapCinemas(props: MapCinemasProps) {
  const { cinemas, styles, onSelectCinema } = props;
  const GOOGLE_CLOUD_MAPS_API_KEY = Constants.expoConfig.extra.ENV_GOOGLE_CLOUD_MAPS_API_KEY;

  return (
    <MapView
      style={styles}
      provider={GOOGLE_CLOUD_MAPS_API_KEY}
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