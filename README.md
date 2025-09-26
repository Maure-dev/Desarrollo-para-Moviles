# Desarrollo-para-Moviles

### Trabajo Integrador - Desarrollo para Móviles (Pochocleando)

# Índice

1. [Integrantes del Proyecto](#integrantes-del-proyecto)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Objetivo](#objetivo)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Dependencias](#dependencias)
6. [Instalación y Configuración](#instalación-y-configuración)
7. [Uso del Proyecto](#uso-del-proyecto)
8. [Licencia](#licencia)

## Integrantes del Proyecto

- **Mauro Alejandro Gerardi**

- **Javier Ignacio Gerol**

- **Brian Leonel Retamar**

## Descripción del Proyecto

Este proyecto es una aplicación móvil desarrollada con **React Native** utilizando **Expo** como framework.  

Incluye integración con **React Navigation** para la navegación, **Formik** y **Yup** para la validación de formularios, y **react-native-maps** para la visualización de mapas.

**Pochocleando** será una aplicación móvil que permitirá a los usuarios explorar, buscar y descubrir películas y series de televisión utilizando la API de IMDb como fuente de información principal. La aplicación brindará acceso a datos completos y actualizados, incluyendo sinopsis detalladas, reparto, calificaciones, tráilers, imágenes y recomendaciones personalizadas según los intereses del usuario.

Además, integrará funcionalidades de geolocalización para que el usuario pueda encontrar los cines más cercanos a su ubicación en tiempo real, visualizar sus funciones disponibles y recibir notificaciones locales sobre estrenos relevantes.

## Objetivo

El objetivo es facilitar el acceso a **información completa, precisa y actualizada** sobre películas y series,
y ofrecer herramientas para que los usuarios puedan descubrir nuevos títulos, mantenerse
al día con los estrenos y planificar visitas a cines cercanos.

- Permitir la búsqueda de películas y series por título, género o popularidad.

- Mostrar detalles completos: sinopsis, reparto, calificación, tráilers e imágenes.

- Localizar cines cercanos y mostrar horarios de funciones mediante geolocalización y mapas.

- Guardar películas favoritas en una lista personalizada.

- Enviar notificaciones para estrenos, funciones cercanas y recomendaciones.

- Ofrecer reseñas y valoraciones personalizadas por parte de los usuarios.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

- `app/components/`: Contiene los archivos de los componentes utilizados en cada página.

- `app/navigation/`: Contiene los archivos de la configuración del ruteo de las páginas.

- `app/screens/`: Contiene los archivos de las páginas utilizadas por el ruteo.

- `app/services/`: Contiene los archivos de los servicios utilizados en las páginas.

## Dependencias

Este proyecto usa las siguientes librerías:

### Librerías para el usuario final

- **Expo**: Framework que simplifica el desarrollo de aplicaciones móviles con React Native, proporcionando herramientas y servicios listos para usar.
- **Expo-Status-Bar**: Componente que facilita la personalización y control de la barra de estado en aplicaciones móviles.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario de manera declarativa y eficiente.
- **React Native**: Framework que permite construir aplicaciones móviles nativas usando React.
- **React Native Maps**: Biblioteca que permite la integración de mapas en las aplicaciones móviles, soportando Google Maps y Apple Maps.
- **@react-navigation/native**: Librería principal para la navegación en aplicaciones React Native, gestionando el estado y la integración con el entorno nativo.
- **@react-navigation/native-stack**: Implementación de un stack navigator optimizado para React Native, utilizado para la navegación entre pantallas.
- **Formik**: Librería para gestionar formularios en React y React Native, simplificando la validación y el manejo del estado.
- **Yup**: Librería para la validación de esquemas, frecuentemente utilizada junto con Formik para validar formularios.

### Librerías de desarrollo

- **TypeScript**: Superconjunto de JavaScript que añade tipos estáticos y otras características avanzadas.
- **@types/react**: Tipos de TypeScript para React, que proporcionan soporte de tipos para el desarrollo con TypeScript.

## Instalación y Configuración

Para instalar y configurar el proyecto, sigue estos pasos:

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/Maure-dev/Desarrollo-para-Moviles.git
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor**

   ```bash
   npx expo start
   ```

## Uso del Proyecto

Una vez iniciado el proyecto, puedes acceder a la página principal escaneando el código QR generado en la terminal con la aplicación de la cámara nativa de su celular y la aplicación **Expo Go** previamente instalada desde la App Store o Play Store. Si haces cambios en el proyecto, el servidor se reiniciará automáticamente.

## Licencia

Este proyecto está bajo la Licencia MIT. Véase el archivo LICENSE.
