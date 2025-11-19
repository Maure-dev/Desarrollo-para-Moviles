import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// @ts-expect-error: getReactNativePersistence
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.ENV_FIREBASE_API_KEY,
    authDomain: Constants.expoConfig.extra.ENV_FIREBASE_AUTH_DOMAIN,
    projectId: Constants.expoConfig.extra.ENV_FIREBASE_PROJECT_ID,
    storageBucket: Constants.expoConfig.extra.ENV_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Constants.expoConfig.extra.ENV_FIREBASE_MESSAGING_SENDER_ID,
    appId: Constants.expoConfig.extra.ENV_FIREBASE_APP_ID,
    measurementId: Constants.expoConfig.extra.ENV_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});;
export const db = getFirestore(app);
export const storage = getStorage(app);