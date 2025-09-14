import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import MovieCard from '../components/MovieCard';

const MOCK = [
  { id: '1', title: 'Avatar: El Camino del Agua', rating: 8.2 },
  { id: '2', title: 'Película Ejemplo', rating: 7.4 },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Cartelera destacada</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={styles.searchLink}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={MOCK}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={() => navigation.navigate('Details', { id: item.id })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071026', paddingTop: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
  header: { color: '#fff', fontSize: 20, fontWeight: '700' },
  searchLink: { color: '#9CA3AF' },
});
