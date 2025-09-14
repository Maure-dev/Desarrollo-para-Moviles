import React from 'react';
import { ScrollView, Image, Text, StyleSheet } from 'react-native';

type DetailsScreenProps = {
  route: {
    params: {
      id: string | number;
    };
  };
};

export default function DetailsScreen({ route }: DetailsScreenProps) {
  const { id } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/800x1200' }} style={styles.poster} />
      <Text style={styles.title}>Película de ejemplo (id: {id})</Text>
      <Text style={styles.meta}>Dirección · Reparto · 2h 12m · 2025</Text>
      <Text style={[styles.title, styles.synopsisTitle]}>Sinopsis</Text>
      <Text style={styles.meta}>Esta es la sinopsis de la película.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#071026',
    padding: 16,
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  meta: {
    color: '#9ca3af',
    marginTop: 6,
  },
  synopsisTitle: {
    fontSize: 18,
    marginTop: 14,
  },
});
