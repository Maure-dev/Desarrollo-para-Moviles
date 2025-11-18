import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { getPopularSeries, getOnAirSeries, getTopRatedSeries, getUpcomingSeries } from '../services/tmdbService';
import { FilterOptions, SeriesScreenProps } from '../entities/entities';
import MovieDetailCard from '../components/MovieDetailCard';

export default function SeriesScreen({ navigation }: SeriesScreenProps) {
    const [series, setSeries] = useState([]);
    const [filter, setFilter] = useState<FilterOptions>({ id: 'popular', text: 'Populares' });
    const [loading, setLoading] = useState(true);
    const filterOptions: FilterOptions[] = [{ id: 'popular', text: 'Populares' }, { id: 'on_air', text: 'En emisión' }, { id: 'top_rated', text: 'Top Rated' }, { id: 'upcoming', text: 'Estrenos' }];

    useEffect(() => {
        loadSeries();
    }, [filter]);

    async function loadSeries() {
        try {
            setLoading(true);
            let data = [];
            switch (filter.id) {
                case 'popular':
                    data = await getPopularSeries();
                    break;
                case 'on_air':
                    data = await getOnAirSeries();
                    break;
                case 'top_rated':
                    data = await getTopRatedSeries();
                    break;
                case 'upcoming':
                    data = await getUpcomingSeries();
                    break;
            }
            setSeries(data);
        } catch (e) {
            console.error("Error cargando series:", e);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
                <ActivityIndicator size="large" color="#E63946" />
                <Text style={styles.loadingTitle}>Cargando series...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <Image source={require("../assets/logo.png")} style={styles.logoHeader} />
                <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', flex: 1 }}>Series</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
                {filterOptions.map((filterOption) => {
                    return (
                        <TouchableOpacity key={filterOption.id} onPress={() => setFilter(filterOption)} style={[styles.filterButton, filter.id === filterOption.id && styles.activeFilter]}>
                            <Text style={[styles.filterText, filter.id === filterOption.id && styles.activeFilterText]}>{filterOption.text}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            <FlatList
                data={series}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieDetailCard movie={item} onPress={() => navigation.navigate('Details', { id: item.id, movie: item })} />
                )}
                contentContainerStyle={{ paddingBottom: 96 }}
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
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
        width: '100%',
    },
    logoHeader: {
        width: 100,
        height: 100,
        alignSelf: "center"
    },
    filters: { flexDirection: 'row', marginBottom: 32, minHeight: 32 },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginLeft: 16,
        backgroundColor: '#1F2937',
    },
    activeFilter: {
        backgroundColor: '#E63946',
    },
    filterText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    activeFilterText: {
        color: '#fff',
    }
});