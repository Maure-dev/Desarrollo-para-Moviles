import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Animated, Easing } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RegisterScreenProps } from '../../entities/entities';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { saveUserProfile } from '../../services/firebaseService';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Mínimo 2 caracteres').required('Debe ingresar un nombre'),
    lastName: Yup.string().min(2, 'Mínimo 2 caracteres').required('Debe ingresar un apellido'),
    email: Yup.string().email('Email inválido').required('Debe ingresar un email válido'),
    password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Debe ingresar una contraseña'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
        .required('Debe confirmar la contraseña'),
    phone: Yup.string().nullable().notRequired(),
    birthdate: Yup.string().nullable().notRequired(),
    gender: Yup.string().nullable().notRequired(),
    customGender: Yup.string().nullable().notRequired(),
});

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const spinValue = useState(new Animated.Value(0))[0];
    const genderOptions = ["Masculino", "Femenino", "Otro"];

    React.useEffect(() => {
        if (loading) {
            startSpin();
        } else {
            spinValue.stopAnimation(() => spinValue.setValue(0));
        }
    }, [loading]);

    const startSpin = () => {
        spinValue.setValue(0);
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="chevron-back" size={20} color="#fff" />
                    <Text style={styles.backButtonText}>Volver al login</Text>
                </View>
            </TouchableOpacity>
            <Image source={require("../../assets/logo.png")} style={styles.logo} />
            <Formik
                initialValues={{
                    name: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    birthdate: '',
                    gender: '',
                    customGender: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={async ({ email, password, name, lastName, phone, birthdate, gender, customGender }) => {
                    try {
                        setLoading(true);
                        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                        const user = userCredential.user;

                        const finalGender = gender === 'Otro' ? (customGender || 'Otro') : gender || '';

                        await saveUserProfile(user.uid, {
                            name,
                            lastName,
                            email,
                            phone: phone || '',
                            birthdate: birthdate || '',
                            gender: finalGender
                        })
                    } catch (error) {
                        Alert.alert("Ocurrió un error al registarte", error.message || 'Error desconocido');
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <View style={styles.form}>
                        <TextInput
                            placeholder="Nombre"
                            placeholderTextColor={styles.placeholder.color}
                            style={styles.input}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                        <TextInput
                            placeholder="Apellido"
                            placeholderTextColor={styles.placeholder.color}
                            style={styles.input}
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />
                        {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={styles.placeholder.color}
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                        <TextInput
                            placeholder="Teléfono"
                            placeholderTextColor={styles.placeholder.color}
                            style={styles.input}
                            keyboardType="phone-pad"
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                        />
                        <TextInput
                            placeholder="Fecha de nacimiento (DD / MM / AAAA)"
                            placeholderTextColor={styles.placeholder.color}
                            style={styles.input}
                            onChangeText={handleChange('birthdate')}
                            onBlur={handleBlur('birthdate')}
                            value={values.birthdate}
                        />
                        <Text style={styles.label}>Género</Text>
                        <View style={styles.genderContainer}>
                            {genderOptions.map(option => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.genderOption,
                                        values.gender === option && styles.genderSelected
                                    ]}
                                    onPress={() => {
                                        setFieldValue('gender', option);
                                        if (option !== 'Otro') {
                                            setFieldValue('customGender', '');
                                        }
                                    }}
                                >
                                    <Text style={styles.genderOptionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {values.gender === 'Otro' && (
                            <TextInput
                                placeholder="Especificá tu género"
                                placeholderTextColor={styles.placeholder.color}
                                style={[styles.input, { marginBottom: 24 }]}
                                onChangeText={(t) => setFieldValue('customGender', t)}
                                onBlur={() => { }}
                                value={values.customGender}
                            />
                        )}
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                placeholder="Contraseña"
                                placeholderTextColor={styles.placeholder.color}
                                secureTextEntry={!showPassword}
                                style={styles.input}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <TouchableOpacity style={styles.iconButton} onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <View style={styles.inputWithIcon}>
                            <TextInput
                                placeholder="Confirmar contraseña"
                                placeholderTextColor={styles.placeholder.color}
                                secureTextEntry={!showConfirmPassword}
                                style={styles.input}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                            <TouchableOpacity style={styles.iconButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={styles.error}>{errors.confirmPassword}</Text>
                        )}

                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={loading}>
                            {loading ? (
                                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                                    <Ionicons name="sync" size={20} color="#fff" />
                                </Animated.View>
                            ) : (
                                <Text style={styles.buttonText}>Registrarse</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', padding: 20, paddingTop: 120, backgroundColor: '#0B1220' },
    form: { backgroundColor: '#151d2aff', padding: 16, borderRadius: 12, justifyContent: 'center' },
    input: { backgroundColor: '#252e44ff', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 },
    button: { backgroundColor: '#E63946', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
    buttonText: { color: '#fff', fontWeight: '600' },
    error: { color: '#FFB4B4', fontSize: 12, marginBottom: 6 },
    placeholder: { color: '#9CA3AF', },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 50
    },
    backButton: {
        position: 'absolute',
        top: 70,
        left: 20,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#252e44ff'
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16
    },
    passwordContainer: { flexDirection: 'row', alignItems: 'center' },
    inputWithIcon: {
        position: 'relative',
        justifyContent: 'center'
    },
    iconButton: {
        position: 'absolute',
        right: 12,
        bottom: 13,
        padding: 4
    },
    label: {
        color: '#fff',
        marginTop: 10,
        marginBottom: 6,
        fontSize: 16,
        fontWeight: '600',
    },
    genderContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    genderOption: {
        backgroundColor: '#252e44ff',
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
    }
});
