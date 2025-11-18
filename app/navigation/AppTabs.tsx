import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import HomeStack from './HomeStack';
import CinemasStack from './CinemasStack';
import MoviesStack from './MoviesStack';
import SeriesStack from './SeriesStack';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: any = 'home-outline';
                    if (route.name === 'Profile') iconName = 'person-outline';
                    if (route.name === 'Cinemas') iconName = 'film-outline';
                    if (route.name === 'Movies') iconName = 'videocam-outline';
                    if (route.name === 'Series') iconName = 'tv-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    height: 82,
                    borderTopWidth: 0,
                    paddingBottom: 24,
                    backgroundColor: '#1F2937',
                },
                tabBarActiveTintColor: '#E63946',
                tabBarInactiveTintColor: '#9CA3AF',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{ tabBarLabel: 'Inicio' }}
            />
            <Tab.Screen
                name="Cinemas"
                component={CinemasStack}
                options={{ tabBarLabel: 'Cines' }}
            />
            <Tab.Screen
                name="Movies"
                component={MoviesStack}
                options={{ tabBarLabel: 'Películas' }}
            />
            <Tab.Screen
                name="Series"
                component={SeriesStack}
                options={{ tabBarLabel: 'Series' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Perfil' }}
            />
        </Tab.Navigator>
    );
}