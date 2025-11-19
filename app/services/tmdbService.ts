import axios from 'axios';
import Constants from 'expo-constants';

const TMDB_API_KEY = Constants.expoConfig.extra.ENV_TMDB_API_KEY;
const TMDB_BASE_URL = Constants.expoConfig.extra.ENV_TMDB_BASE_URL;

export async function getWhatToSeeToday() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR', region: 'AR' }
        });
        return response.data.results.map((movie) => ({
            id: movie.id.toString(),
            title: movie.title,
            rating: movie.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            description: movie.overview,
        }));
    } catch (error) {
        console.error('Error fetching What To See Today:', error);
        return [];
    }
}

export async function getPremieres() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/upcoming`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR', region: 'AR' }
        });
        return response.data.results.map((movie) => ({
            id: movie.id.toString(),
            title: movie.title,
            rating: movie.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            description: movie.overview,
        }));
    } catch (error) {
        console.error('Error fetching Premieres:', error);
        return [];
    }
}

export async function getPopularMovies() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR', page: 1, region: 'AR' }
        });
        return response.data.results.map((movie) => ({
            id: movie.id.toString(),
            title: movie.title,
            rating: movie.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            description: movie.overview,
        }));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getTopRatedMovies() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR', page: 1, region: 'AR' }
        });
        return response.data.results.map((movie) => ({
            id: movie.id.toString(),
            title: movie.title,
            rating: movie.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            description: movie.overview,
        }));
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        return [];
    }
}

export async function getTrendingMovies() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR' }
        });
        return response.data.results.map((movie) => ({
            id: movie.id.toString(),
            title: movie.title,
            rating: movie.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            description: movie.overview,
        }));
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

export const getLatestMovie = async () => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/latest?api_key=${TMDB_API_KEY}`);
    return response.json();
};

export async function getMovieVideos(movieId: string | number) {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/videos`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR' }
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Error fetching movie videos:', error);
        return [];
    }
}

export async function getPopularSeries() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/tv/popular`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR', page: 1 }
        });
        return response.data.results.map((serie) => ({
            id: serie.id.toString(),
            title: serie.name,
            rating: serie.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
            description: serie.overview,
        }));
    } catch (error) {
        console.error('Error fetching popular series:', error);
        return [];
    }
}

export async function getOnAirSeries() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/tv/on_the_air`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR', page: 1 },
        });

        return response.data.results.map((serie) => ({
            id: serie.id,
            title: serie.name,
            rating: serie.vote_average,
            poster: serie.poster_path
                ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                : undefined,
            description: serie.overview,
        }));
    } catch (error) {
        console.error('Error fetching on air series:', error);
        return [];
    }
}

export async function getTopRatedSeries() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/tv/top_rated`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR', page: 1 },
        });

        return response.data.results.map((serie) => ({
            id: serie.id,
            title: serie.name,
            rating: serie.vote_average,
            poster: serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : undefined,
            description: serie.overview,
        }));
    } catch (error) {
        console.error('Error fetching top rated series:', error);
        return [];
    }
}

export async function getUpcomingSeries() {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/tv/airing_today`, {
            params: { api_key: TMDB_API_KEY, language: 'es-AR', page: 1 },
        });

        return response.data.results.map((serie) => ({
            id: serie.id,
            title: serie.name,
            rating: serie.vote_average,
            poster: serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : undefined,
            description: serie.overview,
        }));
    } catch (error) {
        console.error('Error fetching upcoming series:', error);
        return [];
    }
}
