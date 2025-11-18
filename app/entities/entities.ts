/*** Map Cinemas Interface ***/

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleProp, ViewStyle } from "react-native";

export type Cinema = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};

export type MapCinemasProps = {
    cinemas: Cinema[];
    styles: StyleProp<ViewStyle>;
    onSelectCinema?: (id: string) => void;
};

/*** Movie Card Interface ***/

export type Movie = {
    poster: string;
    title: string;
    rating?: number;
    description?: string;
};

export type MovieCardProps = {
    movie: Movie;
    onPress?: () => void;
};

/*** No Results Interface ***/

export type NoResultsProps = {
    styles?: StyleProp<ViewStyle>;
};

/*** Details Cinema Interface ***/

export type DetailsCinemaProps = {
    cinemaDetails: {
        name: string;
        formatted_address?: string;
        rating?: number;
        formatted_phone_number?: string;
        website?: string;
        user_ratings_total?: number;
        reviews?: { text: string }[];
    };
    onSetCinemaDetails?: (id: string | null) => void;
}

/*** Navigation ***/

export type RootStackParamList = {
    Main: undefined
    Register: undefined;
    Login: undefined;
    Home: undefined;
    Profile: undefined;
    Cinemas: undefined;
    CinemaDetails: {
        placeId: string,
        coords: { latitude: number; longitude: number },
        name: string,
        photoUrl?: string,
        address?: string,
        phone?: string,
        website?: string
    };
    Details: { id?: string, movie?: Movie };
    MoviesList: undefined;
    SeriesList: undefined;
};

/*** Login Screen ***/

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type LoginScreenProps = {
    navigation: LoginScreenNavigationProp;
};

/*** Home Screen ***/

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
};

/*** Register Screen ***/

export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export type RegisterScreenProps = {
    navigation: RegisterScreenNavigationProp;
};

/*** Details Screen ***/

export type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

export type DetailsScreenProps = {
    route: {
        params: {
            movie: Movie;
            id: string | number;
        };
    };
    navigation: DetailsScreenNavigationProp;
};

/*** Profile Screen ***/

export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export type ProfileScreenProps = {
    navigation: ProfileScreenNavigationProp;
};

/*** Cinemas Screen ***/

export type CinemasScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cinemas'>;

export type CinemasScreenProps = {
    navigation: CinemasScreenNavigationProp;
};


/*** Cinema Details Screen ***/

export type CinemaDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CinemaDetails'>;

export type CinemaDetailsScreenProps = {
    route: {
        params: {
            placeId: string,
            coords: { latitude: number; longitude: number },
            name: string,
            photoUrl?: string,
            address?: string,
            phone?: string,
            website?: string
        };
    };
    navigation: CinemaDetailsScreenNavigationProp;
};

/*** Movies Screen ***/

export type MoviesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MoviesList'>;
export type MoviesScreenProps = { navigation: MoviesScreenNavigationProp };

/*** Series Screen ***/

export type SeriesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SeriesList'>;
export type SeriesScreenProps = { navigation: SeriesScreenNavigationProp };

export type FilterOptions = {
    id: string;
    text: string;
};