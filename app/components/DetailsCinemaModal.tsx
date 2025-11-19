import React from 'react';
import { DetailsCinemaProps } from "../entities/entities";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailsCinemaModal(props: DetailsCinemaProps) {

    const { cinemaDetails, onSetCinemaDetails } = props;
    const insets = useSafeAreaInsets();

    async function handleOpenLink(url: string) {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert('Error', 'No se puede abrir el enlace: ' + url);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al intentar abrir el enlace.');
        }
    };

    return (
        <View style={[styles.cinemaDetailsContainer, { bottom: 112 + insets.bottom }]}>
            <Text style={styles.cinemaDetailsTitle}>
                {cinemaDetails.name}
            </Text>

            {cinemaDetails.formatted_address && (
                <Text style={{ color: '#ccc', marginTop: 24 }}>
                    📍 {cinemaDetails.formatted_address}
                </Text>
            )}

            {cinemaDetails.rating && (
                <Text style={{ color: '#ccc', marginTop: 16 }}>
                    ⭐ {cinemaDetails.rating}
                </Text>
            )}

            {cinemaDetails.formatted_phone_number && (
                <TouchableOpacity
                    onPress={() => handleOpenLink(`tel:${cinemaDetails.formatted_phone_number}`)}
                    style={{ marginTop: 16 }}
                >
                    <Text style={{ color: '#4DA6FF' }}>
                        ☎ {cinemaDetails.formatted_phone_number}
                    </Text>
                </TouchableOpacity>
            )}

            {cinemaDetails.website && (
                <TouchableOpacity
                    onPress={() => handleOpenLink(cinemaDetails.website)}
                    style={{ marginTop: 16 }}
                >
                    <Text style={{ color: '#4DA6FF' }}>
                        🌐 {cinemaDetails.website}
                    </Text>
                </TouchableOpacity>
            )}

            {cinemaDetails.user_ratings_total && (
                <Text style={{ color: '#ccc', marginTop: 16 }}>
                    👥 {cinemaDetails.user_ratings_total} reseñas
                </Text>
            )}

            {cinemaDetails.reviews && cinemaDetails.reviews.length > 0 && (
                <Text style={{ color: '#ccc', marginTop: 16 }}>
                    📝 "{cinemaDetails.reviews[0].text}"
                </Text>
            )}

            <TouchableOpacity
                onPress={() => onSetCinemaDetails && onSetCinemaDetails(null)}
                style={styles.closeCinemaButton}
            >
                <Text style={styles.closeCinemaButtonText}>
                    Cerrar información del cine
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cinemaDetailsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#1F2937',
        padding: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    cinemaDetailsTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    closeCinemaButton: {
        marginTop: 40,
        marginBottom: 20,
        alignSelf: 'center'
    },
    closeCinemaButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#E63946'
    },
})