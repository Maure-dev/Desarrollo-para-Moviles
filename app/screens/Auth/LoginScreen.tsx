import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LoginScreenProps } from '../../entities/entities';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Debe ingresar un email válido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Debe ingresar una contraseña'),
});

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [loading, setLoading] = React.useState(false);
  const spinValue = React.useState(new Animated.Value(0))[0];
  const [showPassword, setShowPassword] = React.useState(false);

  const startSpin = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  React.useEffect(() => {
    if (loading) {
      startSpin();
    } else {
      spinValue.stopAnimation(() => spinValue.setValue(0));
    }
  }, [loading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async ({ email, password }) => {
          try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
          } catch (error) {
            Alert.alert("Ocurrió un error al iniciar sesión", error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

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

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={loading}>
              {loading ? (
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <Ionicons name="sync" size={20} color="#fff" />
                </Animated.View>
              ) : (
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Registrarse</Text>
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
  button: { backgroundColor: '#E63946', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: '#FFB4B4', fontSize: 12, marginBottom: 6 },
  placeholder: { color: '#9CA3AF', },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 100
  },
});
