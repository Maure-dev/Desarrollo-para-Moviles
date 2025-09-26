/*** Map Cinemas Interface ***/

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleProp, ViewStyle } from "react-native";

export type Cinema = {
    id: string | number;
    name: string;
    latitude: number;
    longitude: number;
};

export type MapCinemasProps = {
    cinemas: Cinema[];
    styles: StyleProp<ViewStyle>;
};

/*** Movie Card Interface ***/

export type Movie = {
    poster: string;
    title: string;
    rating?: number;
    description?: string;
    showtimes?: {
        time: string; cinema: string;
    }[];
};

export type MovieCardProps = {
    movie: Movie;
    onPress?: () => void;
};

/*** No Results Interface ***/

export type NoResultsProps = {
    styles?: StyleProp<ViewStyle>;
};

/*** Navigation ***/

export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    Home: undefined;
    Details: { id?: string, movie?: Movie };
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