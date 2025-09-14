import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Debe ingresar un email válido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Debe ingresar una contraseña'),
});

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pochocleando</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={() => navigation.replace('Home')}
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

            <TextInput
              placeholder="Password"
              placeholderTextColor={styles.placeholder.color}
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
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
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0B1220' },
  title: { fontSize: 34, fontWeight: '700', color: '#FFD24C', alignSelf: 'center', marginBottom: 20 },
  form: { backgroundColor: '#0F1724', padding: 16, borderRadius: 12 },
  input: { backgroundColor: '#111827', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 },
  button: { backgroundColor: '#E63946', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: '#FFB4B4', fontSize: 12, marginBottom: 6 },
  placeholder: { color: '#9CA3AF', }
});
