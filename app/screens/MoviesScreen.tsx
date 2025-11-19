import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { getWhatToSeeToday, getPremieres, getPopularMovies, getTopRatedMovies, getTrendingMovies } from '../services/tmdbService';
import { FilterOptions, MoviesScreenProps } from '../entities/entities';
import MovieDetailCard from '../components/MovieDetailCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MoviesScreen({ navigation }: MoviesScreenProps) {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState<FilterOptions>({ id: 'now_playing', text: 'En Cines' });
    const [loading, setLoading] = useState(true);
    const insets = useSafeAreaInsets();
    const filterOptions: FilterOptions[] = [
        { id: 'now_playing', text: 'En Cines' },
        { id: 'upcoming', text: 'Estrenos' },
        { id: 'popular', text: 'Populares' },
        { id: 'top_rated', text: 'Mejor valoradas' },
        { id: 'trending', text: 'Tendencias' }
    ];

    useEffect(() => {
        loadMovies();
    }, [filter]);

    async function loadMovies() {
        try {
            setLoading(true);
            let data = [];
            switch (filter.id) {
                case 'now_playing':
                    data = await getWhatToSeeToday();
                    break;
                case 'upcoming':
                    data = await getPremieres();
                    break;
                case 'popular':
                    data = await getPopularMovies();
                    break;
                case 'top_rated':
                    data = await getTopRatedMovies();
                    break;
                case 'trending':
                    data = await getTrendingMovies();
                    break;
            }
            setMovies(data);
        } catch (e) {
            console.error("Error cargando películas:", e);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
                <ActivityIndicator size="large" color="#E63946" />
                <Text style={styles.loadingTitle}>Cargando películas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <Image source={require("../assets/logo.png")} style={styles.logoHeader} />
                <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', flex: 1 }}>Películas</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
                {filterOptions.map((filterOption) => (
                    <TouchableOpacity
                        key={filterOption.id}
                        onPress={() => setFilter(filterOption)}
                        style={[styles.filterButton, filter.id === filterOption.id && styles.activeFilter]}
                    >
                        <Text style={[styles.filterText, filter.id === filterOption.id && styles.activeFilterText]}>
                            {filterOption.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieDetailCard movie={item} onPress={() => navigation.navigate('Details', { id: item.id, movie: item })} />
                )}
                contentContainerStyle={{ paddingBottom: 24 + insets.bottom }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loading: { flex: 1, paddingTop: 120, alignItems: 'center', backgroundColor: '#071026' },
    logo: { width: 200, height: 200, alignSelf: "center", marginBottom: 50 },
    loadingTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 16 },
    container: { flex: 1, backgroundColor: '#071026', paddingHorizontal: 16, paddingTop: 72 },
    menuContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 32, width: '100%' },
    logoHeader: { width: 100, height: 100, alignSelf: "center" },
    filters: { flexDirection: 'row', marginBottom: 32, minHeight: 32 },
    filterButton: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, marginLeft: 16, backgroundColor: '#1F2937' },
    activeFilter: { backgroundColor: '#E63946' },
    filterText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    activeFilterText: { color: '#fff' }
});