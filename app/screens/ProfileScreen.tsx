import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { getUserProfile, saveUserProfile, uploadUserPhoto } from '../services/firebaseService';
import { ProfileScreenProps } from '../entities/entities';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
    const auth = getAuth();
    const user = auth.currentUser!;
    const uid = user.uid;
    const genderOptions = ["Masculino", "Femenino", "Otro"];

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        email: user.email,
        name: '',
        lastName: '',
        phone: '',
        birthdate: '',
        gender: '',
        photoUrl: '',
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getUserProfile(uid);
                if (data) setProfile(prev => ({ ...prev, ...data }));
            } catch (e) {
                console.warn(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function pickImageFromGallery() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso necesario', 'Habilitá acceso a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            await handleImageSelected(result.assets[0].uri);
        }
    }

    async function takePhotoWithCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso necesario', 'Habilitá acceso a la cámara.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            await handleImageSelected(result.assets[0].uri);
        }
    }

    async function handleImageSelected(uri: string) {
        try {
            setLoading(true);
            const filename = `profile_${uid}_${Date.now()}.jpg`.replace(/[^a-zA-Z0-9._-]/g, '');
            const photoUrl = await uploadUserPhoto(uid, uri, filename);
            setProfile(prev => ({ ...prev, photoUrl }));
            setLoading(false);
            await saveUserProfile(uid, { photoUrl });
        } catch (e) {
            console.error("Error uploading photo:", e.code, e.message);
            Alert.alert('Error', `No se pudo subir la foto: ${e.message}`);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        try {
            setLoading(true);
            Alert.alert('Listo', 'Perfil guardado con éxito.');
            setLoading(false);
            await saveUserProfile(uid, profile);
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'No se pudo guardar.');
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        await signOut(auth);
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
                <ActivityIndicator size="large" color="#E63946" />
                <Text style={styles.loadingTitle}>Cargando datos del perfil...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={28} color="#E63946" />
            </TouchableOpacity>

            <View style={styles.headerRow}>
                <Image source={require("../assets/logo.png")} style={styles.profileLogo} />

                <TouchableOpacity onPress={() => Alert.alert(
                    "Foto de perfil",
                    "Elegí una opción",
                    [
                        { text: "Tomar foto", onPress: takePhotoWithCamera },
                        { text: "Elegir de la galería", onPress: pickImageFromGallery },
                        { text: "Cancelar", style: "cancel" }
                    ]
                )} style={styles.photoClickableArea}>
                    {profile.photoUrl ? (
                        <Image source={{ uri: profile.photoUrl }} style={styles.photo} />
                    ) : (
                        <View style={styles.photoPlaceholder}><Text style={{ color: '#fff' }}>Sin foto</Text></View>
                    )}
                    <Ionicons name='brush-outline' size={20} color="'#E63946'" style={styles.photoChangeLabel}></Ionicons>
                </TouchableOpacity>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={profile.email} editable={false} />
            </View>

            <View style={styles.row}>
                <View style={[styles.field, { flex: 1 }]}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput style={styles.input} value={profile.name} onChangeText={t => setProfile(p => ({ ...p, name: t }))} />
                </View>
                <View style={[styles.field, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>Apellido</Text>
                    <TextInput style={styles.input} value={profile.lastName} onChangeText={t => setProfile(p => ({ ...p, lastName: t }))} />
                </View>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput style={styles.input} value={profile.phone} onChangeText={t => setProfile(p => ({ ...p, phone: t }))} keyboardType="phone-pad" />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Fecha de nacimiento</Text>
                <TextInput style={styles.input} value={profile.birthdate} placeholder="DD/MM/AAAA" placeholderTextColor="#9CA3AF" onChangeText={t => setProfile(p => ({ ...p, birthdate: t }))} />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Género</Text>
                <View style={styles.genderContainer}>
                    {genderOptions.map(option => (
                        <TouchableOpacity
                            key={option}
                            style={[styles.genderOption, profile.gender === option && styles.genderSelected]}
                            onPress={() => setProfile(p => ({ ...p, gender: option }))}
                        >
                            <Text style={styles.genderOptionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#071026', paddingTop: 72 },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 50
    },
    loading: { flex: 1, paddingTop: 120, alignItems: 'center', backgroundColor: '#071026' },
    loadingTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 16 },
    photoContainer: { alignItems: 'center' },
    photo: { width: 100, height: 100, borderRadius: 60 },
    photoPlaceholder: { width: 100, height: 100, borderRadius: 60, backgroundColor: '#1F2937', justifyContent: 'center', alignItems: 'center' },
    field: { marginBottom: 12 },
    row: { flexDirection: 'row' },
    label: { color: '#9CA3AF', marginBottom: 6 },
    input: { backgroundColor: '#1F2937', padding: 12, borderRadius: 8, color: '#fff' },
    saveButton: { marginTop: 16, backgroundColor: '#E63946', padding: 14, borderRadius: 8, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontWeight: '700' },
    genderContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    genderOption: {
        backgroundColor: '#1F2937',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    genderSelected: {
        backgroundColor: '#E63946',
    },
    genderOptionText: {
        color: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    profileLogo: {
        width: 100,
        height: 100,
        alignSelf: "center"
    },
    photoClickableArea: {
        alignItems: 'flex-start',
        position: 'relative',
        paddingLeft: 55,
        flex: 1
    },
    photoChangeLabel: {
        position: 'absolute',
        bottom: 4,
        left: 95,
        backgroundColor: '#E63946',
        color: '#fff',
        fontSize: 12,
        padding: 4,
        borderRadius: 60,
        textAlign: 'center'
    },
    logoutIcon: {
        position: 'absolute',
        top: 65,
        right: 25,
        zIndex: 10,
    },
});