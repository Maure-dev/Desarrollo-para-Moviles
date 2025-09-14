import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovieCard({ movie, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: 'https://via.placeholder.com/120x180' }} style={styles.poster} />
      <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
      <Text style={styles.rating}>⭐ {movie.rating}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 140, marginRight: 12, backgroundColor: '#0E1720', borderRadius: 10, padding: 8 },
  poster: { width: '100%', height: 180, borderRadius: 8, marginBottom: 8 },
  title: { color: '#fff', fontSize: 14, fontWeight: '600' },
  rating: { color: '#9CA3AF', marginTop: 4 }
});
