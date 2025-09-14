import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const [region] = useState({
    latitude: -34.6037,
    longitude: -58.3816,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const CINEMAS = [
    { id: 'c1', name: 'Cine A', latitude: -34.601, longitude: -58.38 },
    { id: 'c2', name: 'Cine B', latitude: -34.605, longitude: -58.385 },
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {CINEMAS.map(c => (
          <Marker key={c.id} coordinate={{ latitude: c.latitude, longitude: c.longitude }} title={c.name} />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});
