import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Image, ScrollView, ActivityIndicator, Animated } from 'react-native';
import MovieCard from '../components/MovieCard';
import MapCinemas from '../components/MapCinemas';
import { HomeScreenProps } from '../entities/entities';
import NoResults from '../components/NoResults';
import * as Location from "expo-location";
import { getPremieres, getWhatToSeeToday } from '../services/tmdbService';
import { getNearbyCinemas, fetchCinemaDetails } from "../services/googleService";
import DetailsCinemaModal from '../components/DetailsCinemaModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { getLatestMovie } from '../services/tmdbService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [whatToSeeToday, setWhatToSeeToday] = useState([]);
  const [premieres, setPremieres] = useState([]);
  const [location, setLocation] = useState(null);
  const [nearbyCinemas, setNearbyCinemas] = useState([]);
  const [cinemaDetails, setCinemaDetails] = useState(null);
  const [mapOpacity] = useState(new Animated.Value(0));
  const insets = useSafeAreaInsets();

  const filteredWhatToSeeToday = whatToSeeToday.filter(movie =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredPremieres = premieres.filter(movie =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  async function handleFetchCinemaDetails(id: string) {
    const data = await fetchCinemaDetails(id);
    setCinemaDetails(data);
  }

  async function handleSetCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  }

  async function handleGetPremieres() {
    const data = await getPremieres();
    setPremieres(data);
  }

  async function handleGetWhatToSeeToday() {
    const data = await getWhatToSeeToday();
    setWhatToSeeToday(data);
  }

  async function handleGetNearbyCinemas(lat: number, lng: number) {
    const data = await getNearbyCinemas(lat, lng);
    setNearbyCinemas(data);
  }

  function handleLoadingMap() {
    Animated.timing(mapOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }

  async function handleCheckNewMovies() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permitinos enviarte notificaciones para mantenerte al tanto de las nuevas películas.');
    }
    const latest = await getLatestMovie();
    const lastSavedId = await AsyncStorage.getItem('last_movie_id');

    if (latest.id.toString() !== lastSavedId) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Nueva película disponible 🎬',
          body: latest.title,
        },
        trigger: null,
      });
      await AsyncStorage.setItem('last_movie_id', latest.id.toString());
    }
  }

  function onInitHome() {
    handleGetPremieres();
    handleGetWhatToSeeToday();
    handleSetCurrentLocation();
    handleCheckNewMovies();
  }

  useEffect(onInitHome, [])

  useEffect(() => {
    if (location) {
      handleLoadingMap();
      handleGetNearbyCinemas(location.latitude, location.longitude);
    }
  }, [location]);

  const renderListHeader = () => (
    <View style={styles.listHeaderContainer}>
      <View style={styles.menuContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Buscar película o serie..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Qué ver hoy?</Text>
        {filteredWhatToSeeToday.length === 0 && (
          <NoResults />
        )}
        <FlatList
          data={filteredWhatToSeeToday}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={() => navigation.navigate('Details', { id: item.id, movie: item })} />
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estrenos</Text>
        {filteredPremieres.length === 0 && (
          <NoResults />
        )}
        <FlatList
          data={filteredPremieres}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={() => navigation.navigate('Details', { id: item.id, movie: item })} />
          )}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 112 + insets.bottom }}
        keyboardShouldPersistTaps="handled"
      >
        {renderListHeader()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cines cercanos</Text>
          {location === null ? (
            <View style={styles.mapLoadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingLocationText}>Obteniendo ubicación...</Text>
            </View>
          ) : (
            <Animated.View style={{ opacity: mapOpacity }}>
              <MapCinemas
                cinemas={nearbyCinemas}
                styles={styles.map}
                onSelectCinema={handleFetchCinemaDetails}
              />
            </Animated.View>
          )}
        </View>
        {cinemaDetails && (
          <DetailsCinemaModal cinemaDetails={cinemaDetails} onSetCinemaDetails={setCinemaDetails} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071026', paddingTop: 60 },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 32,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    height: 60,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
  },
  section: {
    marginBottom: 50,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  carteleraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    padding: 12,
  },
  carteleraTitle: {
    color: '#fff',
    width: '50%',
    fontWeight: '600',
  },
  carteleraHoraText: {
    color: '#9CA3AF',
    width: '20%',
    textAlign: 'center',
  },
  carteleraCinemaText: {
    color: '#9CA3AF',
    width: '30%',
    textAlign: 'right',
  },
  map: {
    height: 300,
    marginTop: 16,
    borderRadius: 12,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },
  listHeaderContainer: {
    flex: 1
  },
  mapLoadingContainer: {
    height: 300,
    marginHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  loadingLocationText: {
    color: '#fff',
    marginTop: 10
  }
});
