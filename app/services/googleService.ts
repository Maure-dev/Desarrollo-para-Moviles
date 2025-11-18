import Constants from 'expo-constants';

const GOOGLE_API_KEY = Constants.expoConfig.extra.ENV_GOOGLE_API_KEY;

export async function getNearbyCinemas(lat: number, lng: number) {
    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50000&type=movie_theater&keyword=cine&key=${GOOGLE_API_KEY}`;

    try {
        const response = await fetch(nearbyUrl);
        const data = await response.json();

        if (data && Array.isArray(data.results) && data.results.length > 0) {
            return data.results.map((cine) => ({
                id: cine.place_id,
                name: cine.name,
                latitude: cine.geometry.location.lat,
                longitude: cine.geometry.location.lng,
                photoUrl: cine.photos?.length
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cine.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                    : null,
                rating: cine.rating ?? null,
                user_ratings_total: cine.user_ratings_total ?? null,
                vicinity: cine.vicinity ?? '',
                opening_hours: cine.opening_hours?.open_now ?? null,
                phone: cine.international_phone_number ?? null,
                types: cine.types,
                icon: cine.icon,
                website: cine.website ?? null,
            }));
        }

        const textUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cine&location=${lat},${lng}&radius=50000&key=${GOOGLE_API_KEY}`;

        const response2 = await fetch(textUrl);
        const data2 = await response2.json();

        if (data2 && Array.isArray(data2.results) && data2.results.length > 0) {
            return data2.results.map((cine) => ({
                id: cine.place_id,
                name: cine.name,
                latitude: cine.geometry.location.lat,
                longitude: cine.geometry.location.lng,
                photoUrl: cine.photos?.length
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cine.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                    : null,
                rating: cine.rating ?? null,
                user_ratings_total: cine.user_ratings_total ?? null,
                vicinity: cine.vicinity ?? '',
                opening_hours: cine.opening_hours?.open_now ?? null,
                phone: cine.international_phone_number ?? null,
                types: cine.types,
                icon: cine.icon,
                website: cine.website ?? null,
            }));
        }

        return [];
    } catch (err) {
        console.error("Error fetching Google Places:", err);
        return [];
    }
}

export async function fetchCinemaDetails(placeId: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address,formatted_phone_number,opening_hours,website,reviews&key=${GOOGLE_API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.result ?? null;
    } catch (e) {
        console.error("DETAILS ERROR", e);
        return null;
    }
}