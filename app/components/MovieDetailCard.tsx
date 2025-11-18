import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { MovieCardProps } from "../entities/entities";

export default function MovieDetailCard({ movie, onPress }: MovieCardProps) {

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
        >
            <Image source={{ uri: movie.poster }} style={styles.poster} />
            <View style={styles.info}>
                <Text style={styles.title}>{movie.title}</Text>
                {movie.rating !== undefined && (
                    <Text style={styles.rating}>⭐ {movie.rating.toFixed(1)}</Text>
                )}
                <Text numberOfLines={3} style={styles.description}>{movie.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#1F2937',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 8,
        elevation: 6,
    },
    poster: { width: 120, height: 180 },
    info: { flex: 1, padding: 12, justifyContent: 'space-between' },
    title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    rating: { color: '#FFD700', marginTop: 4, fontWeight: '600' },
    description: { color: '#ccc', marginTop: 6, fontSize: 14, lineHeight: 18 },
})