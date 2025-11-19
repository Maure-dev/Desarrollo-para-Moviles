import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Linking, Alert, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchCinemaDetails } from '../../services/googleService';
import { CinemaDetailsScreenProps } from '../../entities/entities';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GOOGLE_CLOUD_MAPS_API_KEY = Constants.expoConfig.extra.ENV_GOOGLE_CLOUD_MAPS_API_KEY;

export default function CinemaDetailsScreen({ route, navigation }: CinemaDetailsScreenProps) {
    const { placeId, coords, name, photoUrl, phone, website } = route.params;
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const d = await fetchCinemaDetails(placeId);
                setDetails(d);
            } catch (e) {
                console.warn(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [placeId]);

    function startNavigation() {
        const url = `https://www.google.com/maps/search/?api=1&query=${name}&query_place_id=${placeId}`;
        Linking.openURL(url).catch(() => Alert.alert('Error', 'No se pudo abrir la app de mapas'));
    }

    if (loading) {
        return (
            <LinearGradient colors={['#071026', '#1A1F3B']} style={{ flex: 1 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="chevron-back" size={20} color="#fff" />
                        <Text style={styles.backButtonText}>Volver a los cines</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.loading}>
                    <Image source={require("../../assets/logo.png")} style={styles.logo} />
                    <ActivityIndicator size="large" color="#3B82F6" />
                    <Text style={styles.loadingTitle}>Cargando datos del cine...</Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#071026', '#1A1F3B']} style={{ flex: 1 }}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="chevron-back" size={20} color="#fff" />
                    <Text style={styles.backButtonText}>Volver a los cines</Text>
                </View>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.photoCard}>
                    {photoUrl ? (
                        <Image source={{ uri: photoUrl }} style={styles.photo} resizeMode="cover" />
                    ) : (
                        <View style={styles.photoPlaceholder}>
                            <Ionicons name="image-outline" size={64} color="#6B7280" />
                            <Text style={styles.photoPlaceholderText}>Foto no disponible</Text>
                        </View>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cinemaName}>{details?.name || name}</Text>
                    {details?.formatted_address && (
                        <View style={styles.infoRow}>
                            <Ionicons name="location-outline" size={18} color="#9CA3AF" />
                            <Text style={styles.infoText}>{details.formatted_address}</Text>
                        </View>
                    )}
                    {/* Teléfono */}
                    {(phone || details?.formatted_phone_number) && (
                        <View style={styles.infoRow}>
                            <Ionicons name="call-outline" size={18} color="#9CA3AF" />
                            <TouchableOpacity
                                onPress={() => {
                                    const tel = (phone || details?.formatted_phone_number || '').replace(/\s/g, '');
                                    Linking.openURL(`tel:${tel}`).catch(() =>
                                        Alert.alert('Error', 'No se pudo realizar la llamada')
                                    );
                                }}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.infoText, { textDecorationLine: 'underline', color: '#3B82F6' }]}>
                                    {phone || details?.formatted_phone_number}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {/* Sitio web */}
                    {(website || details?.website) && (
                        <View style={styles.infoRow}>
                            <Ionicons name="globe-outline" size={18} color="#9CA3AF" />
                            <TouchableOpacity
                                onPress={() => {
                                    const url = website || details?.website;
                                    Linking.openURL(url).catch(() =>
                                        Alert.alert('Error', 'No se pudo abrir el sitio web')
                                    );
                                }}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[styles.infoText, { textDecorationLine: 'underline', color: '#3B82F6' }]}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {website || details?.website}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={styles.mapContainer}>
                        <MapView
                            style={{ flex: 1, borderRadius: 12 }}
                            initialRegion={{
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            pointerEvents="none"
                            provider={GOOGLE_CLOUD_MAPS_API_KEY}
                        >
                            <Marker coordinate={{ latitude: coords.latitude, longitude: coords.longitude }} />
                        </MapView>
                    </View>

                    <TouchableOpacity style={styles.navigateButton} onPress={startNavigation} activeOpacity={0.8}>
                        <Text style={styles.navigateButtonText}>Iniciar viaje</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    logo: { width: 200, height: 200, alignSelf: "center", marginBottom: 50 },
    loading: { flex: 1, paddingTop: 120, alignItems: 'center', justifyContent: 'center' },
    loadingTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 16 },
    backButton: { position: 'absolute', top: 70, left: 20, zIndex: 10, padding: 8, borderRadius: 8, backgroundColor: '#252e44ff' },
    backButtonText: { color: '#fff', fontSize: 16 },

    photoCard: {
        width: SCREEN_WIDTH,
        height: 220,
        backgroundColor: '#1A1F3B',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    photo: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    photoPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#374151',
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    photoPlaceholderText: {
        color: '#9CA3AF',
        marginTop: 8,
        fontSize: 16,
        fontWeight: '600',
    },

    card: {
        backgroundColor: '#1A1F3B',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    cinemaName: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 16 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    infoText: { color: '#9CA3AF', fontSize: 16, marginLeft: 6, flexShrink: 1 },

    mapContainer: {
        height: 250,
        marginTop: 20,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

    navigateButton: {
        marginTop: 30,
        backgroundColor: '#E63946',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#E63946',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 10,
    },
    navigateButtonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
});