import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeriesScreen from '../screens/SeriesScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function SeriesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SeriesList" component={SeriesScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}