import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { NoResultsProps } from '../entities/entities';

export default function NoResults({ styles }: NoResultsProps) {
  return (
    <View style={styles}>
      <Image source={require("../assets/no-results.png")} style={stylesInt.logo} />
      <Text style={stylesInt.message}>No se encontraron resultados.</Text>
      <Text style={stylesInt.message}>Intenta ajustar los filtros de búsqueda.</Text>
    </View>
  )
}

const stylesInt = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  message: {
    color: '#9CA3AF',
    textAlign: 'center',
  }
});