import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NearbyListScreen from '../screens/Cinemas/NearbyListScreen';
import CinemaDetailsScreen from '../screens/Cinemas/CinemaDetailsScreen';

const Stack = createNativeStackNavigator();

export default function CinemasStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NearbyList" component={NearbyListScreen} />
            <Stack.Screen name="CinemaDetails" component={CinemaDetailsScreen} />
        </Stack.Navigator>
    );
}