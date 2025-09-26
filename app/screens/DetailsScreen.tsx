import React from 'react';
import { Image, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { DetailsScreenProps } from '../entities/entities';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating / 2));
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
      <Text style={styles.descriptionRating}>{rating}/10</Text>
      {stars.map((filled, index) => (
        <Text key={index} style={{ color: filled ? '#FFD700' : '#555', fontSize: 18 }}>
          ★
        </Text>
      ))}
    </View>
  );
};

export default function DetailsScreen({ route, navigation }: DetailsScreenProps) {
  const { movie } = route.params;

  const ListHeader = () => (
    <React.Fragment>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Volver al inicio</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.headerRow}>
        <Image source={{ uri: movie.poster }} style={styles.poster} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{movie.title}</Text>
          <StarRating rating={movie.rating} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>{movie.description || "Sin descripción disponible."}</Text>

      <Text style={styles.sectionTitle}>Próximas funciones</Text>
    </React.Fragment>
  );

  return (
    <FlatList
      data={movie.showtimes || []}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.showtimeRow}>
          <Text style={styles.showtimeText}>{item.time}</Text>
          <Text style={styles.showtimeText}>{item.cinema}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={{ flex: 1, padding: 16, backgroundColor: '#071026', paddingTop: 160 }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071026', padding: 16 },
  headerRow: { flexDirection: 'row', marginBottom: 60 },
  poster: { width: 120, height: 180, borderRadius: 12, marginRight: 12 },
  headerText: { flex: 1, justifyContent: 'flex-end' },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginVertical: 12 },
  description: { color: '#9ca3af', fontSize: 16, marginBottom: 60 },
  descriptionRating: { color: '#9ca3af', fontSize: 16, marginRight: 8 },
  showtimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
  },
  showtimeText: { color: '#9ca3af', fontSize: 16 },
  backButton: {
    position: 'absolute',
    top: -80,
    left: 0,
    zIndex: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#252e44ff'
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16
  }
});