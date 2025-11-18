import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { getNearbyCinemas } from '../../services/googleService';
import { useNavigation } from '@react-navigation/native';
import { CinemaDetailsScreenNavigationProp } from '../../entities/entities';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NearbyListScreen() {
    const navigation = useNavigation<CinemaDetailsScreenNavigationProp>();
    const [loading, setLoading] = useState(false);
    const [cinemas, setCinemas] = useState([]);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permiso denegado', 'Habilitá la ubicación para ver cines cercanos.');
                    setLoading(false);
                    return;
                }
                const loc = await Location.getCurrentPositionAsync({});
                setLocation(loc.coords);
                const results = await getNearbyCinemas(loc.coords.latitude, loc.coords.longitude);
                setCinemas(results || []);
            } catch (e) {
                console.warn(e);
                Alert.alert('Error', 'No se pudieron obtener cines.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    function renderItem({ item }) {
        return (
            <LinearGradient
                colors={['#1A1F3B', '#2A2F4B']}
                style={styles.cinemaCardGradient}
            >
                <TouchableOpacity
                    style={styles.cinemaCardTouchable}
                    onPress={() =>
                        navigation.navigate('CinemaDetails', {
                            placeId: item.id,
                            coords: { latitude: item.latitude, longitude: item.longitude },
                            name: item.name,
                        })
                    }
                >
                    {item.photoUrl ? (
                        <Image source={{ uri: item.photoUrl }} style={styles.cinemaImage} />
                    ) : (
                        <View style={styles.cinemaPlaceholder}>
                            <Ionicons name="film-outline" size={40} color="#fff" />
                        </View>
                    )}

                    <View style={styles.cinemaInfo}>
                        <Text style={styles.cinemaName}>{item.name}</Text>
                        {item.distance && (
                            <View style={styles.distanceContainer}>
                                <Ionicons name="location-outline" size={16} color="#9CA3AF" />
                                <Text style={styles.cinemaDistance}>
                                    {item.distance.toFixed(1)} km
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.goToCinemaButton}
                            onPress={() =>
                                navigation.navigate('CinemaDetails', {
                                    placeId: item.id,
                                    coords: { latitude: item.latitude, longitude: item.longitude },
                                    name: item.name,
                                    photoUrl: item.photoUrl,
                                    address: item.address,
                                    phone: item.phone,
                                    website: item.website,
                                })
                            }
                        >
                            <Text style={styles.goToCinemaButtonText}>Ir al cine</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
                <ActivityIndicator size="large" color="#E63946" />
                <Text style={styles.loadingTitle}>Cargando cines cercanos...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#071026', paddingTop: 72 }}>
            <View style={styles.menuContainer}>
                <Image source={require("../../assets/logo.png")} style={styles.logoHeader} />
                <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', flex: 1 }}>Cines cercanos a ti</Text>
            </View>
            <FlatList
                data={cinemas}
                keyExtractor={(i) => i.id}
                renderItem={renderItem}
                style={styles.flatListCinemas}
                ListEmptyComponent={<Text style={{ color: '#9CA3AF' }}>No se encontraron cines.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        marginBottom: 32,
        width: '100%',
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 50
    },
    logoHeader: {
        width: 100,
        height: 100,
        alignSelf: "center"
    },
    loading: { flex: 1, paddingTop: 120, alignItems: 'center', backgroundColor: '#071026' },
    loadingTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 16 },
    flatListCinemas: {
        marginBottom: 96
    },
    cinemaCardGradient: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    cinemaCardTouchable: {
        flexDirection: 'row',
        borderRadius: 12,
        overflow: 'hidden',
    },
    cinemaImage: {
        width: 80,
        height: 80,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    cinemaPlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#2A2F4B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cinemaInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    cinemaName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    cinemaDistance: {
        color: '#9CA3AF',
        fontSize: 14,
        marginLeft: 4,
    },
    goToCinemaButton: {
        marginTop: 10,
        backgroundColor: '#E63946',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    goToCinemaButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    }
})