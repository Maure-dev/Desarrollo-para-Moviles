import React, { useEffect, useState } from 'react';
import { Image, Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { DetailsScreenProps } from '../entities/entities';
import { Ionicons } from '@expo/vector-icons';
import { getMovieVideos } from '../services/tmdbService';
import YoutubePlayer from "react-native-youtube-iframe";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const { id, movie } = route.params;
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const insets = useSafeAreaInsets();

  async function handleLoadVideos() {
    setLoadingTrailer(true);
    const videos = await getMovieVideos(id);
    const youtubeVideos = videos.filter((v) => v.site === 'YouTube');
    const ytTrailer =
      youtubeVideos.find((v) => v.type === 'Trailer')
      || youtubeVideos.find((v) => v.type === 'Teaser')
      || youtubeVideos[0];

    if (ytTrailer && ytTrailer.key) {
      setTrailerKey(ytTrailer.key);
    } else {
      setTrailerKey(null);
    }
    setLoadingTrailer(false);
  }

  useEffect(() => {
    handleLoadVideos();
  }, [id]);

  const { width } = Dimensions.get('window');
  const playerHeight = Math.round(width * (9 / 16));

  const ListHeader = () => (
    <React.Fragment>
      <View style={styles.headerRow}>
        <Image source={{ uri: movie.poster }} style={styles.poster} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{movie.title}</Text>
          <StarRating rating={movie.rating} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>{movie.description || "Sin descripción disponible."}</Text>

      <Text style={styles.sectionTitle}>Tráiler</Text>
      {loadingTrailer ? (
        <View style={styles.trailerContainer}>
          <ActivityIndicator size="small" color="#E63946" />
          <Text style={styles.trailerText}>Obteniendo tráiler</Text>
        </View>
      ) : trailerKey ? (
        <View style={{ height: playerHeight, borderRadius: 8, overflow: 'hidden', marginTop: 8, marginBottom: 24 + insets.bottom }}>
          <YoutubePlayer
            height={playerHeight}
            play={false}
            videoId={trailerKey}
          />
        </View>
      ) : (
        <View style={styles.trailerContainer}>
          <Text style={styles.trailerText}>Tráiler no disponible.</Text>
        </View>
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Volver al inicio</Text>
        </View>
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#071026' }}
        contentContainerStyle={{ padding: 16, paddingTop: 160, paddingBottom: 24 + insets.bottom }}
      >
        <ListHeader />
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071026', padding: 16 },
  headerRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12
  },
  headerText: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', marginTop: 16 },
  title: { color: '#fff', fontSize: 48, fontWeight: '700', marginBottom: 4 },
  sectionTitle: { color: '#fff', fontSize: 32, fontWeight: '700', marginTop: 32, marginBottom: 16 },
  description: { color: '#9ca3af', fontSize: 16, marginBottom: 32 },
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
    top: 70,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#252e44ff'
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16
  },
  trailerContainer: {
    backgroundColor: '#1F2937',
    gap: 16,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  trailerText: {
    color: '#9ca3af',
    textAlign: 'center',
    fontSize: 16
  },
});