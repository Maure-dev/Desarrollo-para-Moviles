import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Image, ScrollView, TouchableOpacity } from 'react-native';
import MovieCard from '../components/MovieCard';
import MapCinemas from '../components/MapCinemas';
import { HomeScreenProps } from '../entities/entities';
import NoResults from '../components/NoResults';
import { Ionicons } from '@expo/vector-icons';

const QUE_VER_HOY = [
  {
    id: '1',
    title: 'Relatos Salvajes',
    rating: 8.1,
    poster: 'https://pics.filmaffinity.com/relatos_salvajes-102488639-mmed.jpg',
    description: 'Seis historias cortas que exploran la violencia y la venganza en la sociedad argentina.',
    showtimes: [
      { time: '18:00', cinema: 'Hoyts Abasto' },
      { time: '20:45', cinema: 'Cinemark Palermo' },
      { time: '22:30', cinema: 'Village Recoleta' },
    ],
  },
  {
    id: '2',
    title: 'El secreto de sus ojos',
    rating: 8.2,
    poster: 'https://pics.filmaffinity.com/el_secreto_de_sus_ojos-483213496-mmed.jpg',
    description: 'Un oficial judicial retirado escribe una novela basada en un caso sin resolver.',
    showtimes: [
      { time: '19:00', cinema: 'Hoyts Unicenter' },
      { time: '21:30', cinema: 'Cinemark Córdoba' },
    ],
  },
  {
    id: '3',
    title: 'Nueve reinas',
    rating: 7.9,
    poster: 'https://pics.filmaffinity.com/nueve_reinas-171671850-mmed.jpg',
    description: 'Dos estafadores intentan vender unas estampillas falsas a un coleccionista.',
    showtimes: [
      { time: '17:00', cinema: 'Village Caballito' },
      { time: '20:00', cinema: 'Hoyts Abasto' },
    ],
  },
  {
    id: '4',
    title: 'Camila',
    rating: 7.0,
    poster: 'https://pics.filmaffinity.com/queen_camilla_the_wicked_stepmother-961434642-mmed.jpg',
    description: 'Historia de amor prohibido en la Argentina del siglo XIX.',
    showtimes: [
      { time: '18:30', cinema: 'Cinemark Palermo' },
      { time: '22:00', cinema: 'Village Recoleta' },
    ],
  },
  {
    id: '5',
    title: 'El Clan',
    rating: 7.3,
    poster: 'https://pics.filmaffinity.com/el_clan-608190306-mmed.jpg',
    description: 'Basada en hechos reales sobre una familia criminal en Buenos Aires.',
    showtimes: [
      { time: '19:15', cinema: 'Hoyts Unicenter' },
      { time: '21:45', cinema: 'Cinemark Córdoba' },
    ],
  },
  {
    id: '6',
    title: 'Carancho',
    rating: 7.1,
    poster: 'https://pics.filmaffinity.com/carancho-132970779-mmed.jpg',
    description: 'Un abogado corrupto se enamora de una médica mientras busca justicia.',
    showtimes: [
      { time: '20:00', cinema: 'Village Caballito' },
      { time: '22:30', cinema: 'Hoyts Abasto' },
    ],
  },
  // Reemplazar con datos reales de IMDB/API
];

const ESTRENOS = [
  {
    id: '7',
    title: 'Argentina, 1985',
    rating: 7.9,
    poster: 'https://pics.filmaffinity.com/argentina_1985-430372554-mmed.jpg',
    description: 'Un fiscal lleva adelante el histórico juicio a la junta militar argentina.',
    showtimes: [
      { time: '19:00', cinema: 'Cinemark Palermo' },
      { time: '21:30', cinema: 'Village Recoleta' },
    ],
  },
  {
    id: '8',
    title: 'El Robo del Siglo',
    rating: 7.3,
    poster: 'https://pics.filmaffinity.com/el_robo_del_siglo-683536953-mmed.jpg',
    description: 'Basada en el mayor robo bancario de la historia argentina.',
    showtimes: [
      { time: '18:45', cinema: 'Hoyts Abasto' },
      { time: '20:30', cinema: 'Cinemark Córdoba' },
    ],
  },
  {
    id: '9',
    title: 'La Odisea de los Giles',
    rating: 7.1,
    poster: 'https://pics.filmaffinity.com/la_odisea_de_los_giles-274529633-mmed.jpg',
    description: 'Un grupo de vecinos intenta recuperar su dinero tras una estafa financiera.',
    showtimes: [
      { time: '17:30', cinema: 'Village Caballito' },
      { time: '20:00', cinema: 'Hoyts Unicenter' },
    ],
  },
  {
    id: '10',
    title: 'Crímenes de Familia',
    rating: 6.8,
    poster: 'https://pics.filmaffinity.com/crimenes_de_familia-549018936-mmed.jpg',
    description: 'Un drama familiar que explora secretos y traiciones.',
    showtimes: [
      { time: '19:15', cinema: 'Cinemark Palermo' },
      { time: '21:00', cinema: 'Village Recoleta' },
    ],
  },
  {
    id: '12',
    title: 'Zama',
    rating: 6.5,
    poster: 'https://pics.filmaffinity.com/zama-204566076-mmed.jpg',
    description: 'Un funcionario colonial espera su traslado en una remota región del imperio.',
    showtimes: [
      { time: '18:00', cinema: 'Hoyts Unicenter' },
      { time: '20:45', cinema: 'Cinemark Córdoba' },
    ],
  },
  // Reemplazar con datos reales de IMDB/API
];

const CARTELERA = [
  { id: '1', title: 'El secreto de sus ojos', horario: '18:00', cine: 'Hoyts Abasto' },
  { id: '2', title: 'Relatos Salvajes', horario: '20:30', cine: 'Cinemark Palermo' },
  { id: '3', title: 'Nueve reinas', horario: '21:00', cine: 'Village Recoleta' },
  { id: '4', title: 'Argentina, 1985', horario: '19:45', cine: 'Hoyts Unicenter' },
  { id: '5', title: 'El Robo del Siglo', horario: '22:00', cine: 'Cinemark Córdoba' },
  { id: '6', title: 'La Odisea de los Giles', horario: '18:30', cine: 'Village Caballito' },
  // Reemplazar con datos reales de IMDB/API
];

const CINES_CERCANOS = [
  { id: '1', name: 'Hoyts Abasto', latitude: -34.603722, longitude: -58.410158 },
  { id: '2', name: 'Cinemark Palermo', latitude: -34.588192, longitude: -58.423731 },
  { id: '3', name: 'Village Recoleta', latitude: -34.588608, longitude: -58.393014 },
  { id: '4', name: 'Hoyts Unicenter', latitude: -34.494377, longitude: -58.610434 },
  { id: '5', name: 'Cinemark Córdoba', latitude: -31.4135, longitude: -64.1811 },
  { id: '6', name: 'Village Caballito', latitude: -34.623664, longitude: -58.441571 },
  // Reemplazar con datos reales de ubicación
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [searchText, setSearchText] = useState('');

  const filteredQueVerHoy = QUE_VER_HOY.filter(movie =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredEstrenos = ESTRENOS.filter(movie =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredCartelera = CARTELERA.filter(movie =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderListHeader = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.menuContainer}>
        <View style={styles.actionsContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Buscar película..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Qué ver hoy?</Text>
        {filteredQueVerHoy.length === 0 && (
          <NoResults />
        )}
        <FlatList
          data={filteredQueVerHoy}
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
        {filteredEstrenos.length === 0 && (
          <NoResults />
        )}
        <FlatList
          data={filteredEstrenos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={() => navigation.navigate('Details', { id: item.id, movie: item })} />
          )}
        />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Cartelera</Text>
        {filteredCartelera.length === 0 && (
          <NoResults styles={styles.noResults} />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 12 }}
        keyboardShouldPersistTaps="handled"
      >
        {renderListHeader()}

        {filteredCartelera.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.carteleraRow,
              index === filteredCartelera.length - 1 && { marginBottom: 50 }
            ]}
          >
            <Text style={styles.carteleraTitle}>{item.title}</Text>
            <Text style={styles.carteleraHoraText}>{item.horario}</Text>
            <Text style={styles.carteleraCinemaText}>{item.cine}</Text>
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cines cercanos</Text>
          <MapCinemas cinemas={CINES_CERCANOS} styles={styles.map} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071026', paddingTop: 60 },
  menuContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    width: '100%',
    height: 60,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    marginBottom: 32,
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
    marginHorizontal: 16,
    borderRadius: 12,
  },
  noResults: {
    marginBottom: 50
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E63946'
  },
});
