export default {
    expo: {
        name: "Pochocleando",
        slug: "pochocleando",
        version: "1.0.0",
        projectId: "e5ab5937-3629-494d-aa98-93708c5a3fdd",
        icon: "./app/assets/logo.png",

        plugins: [
            [
                "expo-location",
                {
                    locationAlwaysAndWhenInUsePermission:
                        "Permitimos acceder a tu ubicación para mostrar cines cercanos.",
                },
            ],
            [
                "expo-camera",
                {
                    cameraPermission:
                        "La app necesita acceder a la cámara para tomar tu foto de perfil.",
                },
            ],
            [
                "expo-image-picker",
                {
                    photosPermission:
                        "Permitimos acceder a tus fotos para seleccionar una imagen de perfil.",
                },
            ],
            [
                "expo-font"
            ]
        ],

        android: {
            package: "com.uner.pochocleando",
            adaptiveIcon: {
                foregroundImage: "./app/assets/logo.png",
                backgroundColor: "#ffffff"
            },
            permissions: [
                "READ_EXTERNAL_STORAGE",
                "WRITE_EXTERNAL_STORAGE",
                "READ_MEDIA_IMAGES",
                "POST_NOTIFICATIONS",
                "ACCESS_FINE_LOCATION",
                "ACCESS_COARSE_LOCATION",
                "ACCESS_BACKGROUND_LOCATION",
                "FOREGROUND_SERVICE"
            ],
            config: {
                googleMaps: {
                    apiKey: process.env.ENV_GOOGLE_CLOUD_MAPS_API_KEY
                }
            }
        },

        ios: {
            bundleIdentifier: "com.uner.pochocleando",
            icon: "./app/assets/logo.png",
            infoPlist: {
                NSLocationWhenInUseUsageDescription:
                    "Usamos tu ubicación para mostrar cines cercanos.",
                NSCameraUsageDescription:
                    "Necesitamos acceder a la cámara para tomar tu foto de perfil.",
                NSPhotoLibraryUsageDescription:
                    "Necesitamos acceder a tus fotos para seleccionar una imagen de perfil.",
                NSUserNotificationUsageDescription:
                    "Necesitamos enviarte notificaciones sobre nuevas películas.",
            },
        },

        extra: {
            ENV_TMDB_API_KEY: process.env.ENV_TMDB_API_KEY || "SIN CONFIGURAR",
            ENV_TMDB_BASE_URL: process.env.ENV_TMDB_BASE_URL || "SIN CONFIGURAR",
            ENV_GOOGLE_API_KEY: process.env.ENV_GOOGLE_API_KEY || "SIN CONFIGURAR",
            ENV_FIREBASE_API_KEY:
                process.env.ENV_FIREBASE_API_KEY || "SIN CONFIGURAR",
            ENV_FIREBASE_AUTH_DOMAIN:
                process.env.ENV_FIREBASE_AUTH_DOMAIN || "SIN CONFIGURAR",
            ENV_FIREBASE_PROJECT_ID:
                process.env.ENV_FIREBASE_PROJECT_ID || "SIN CONFIGURAR",
            ENV_FIREBASE_STORAGE_BUCKET:
                process.env.ENV_FIREBASE_STORAGE_BUCKET || "SIN CONFIGURAR",
            ENV_FIREBASE_MESSAGING_SENDER_ID:
                process.env.ENV_FIREBASE_MESSAGING_SENDER_ID || "SIN CONFIGURAR",
            ENV_FIREBASE_APP_ID:
                process.env.ENV_FIREBASE_APP_ID || "SIN CONFIGURAR",
            ENV_FIREBASE_MEASUREMENT_ID:
                process.env.ENV_FIREBASE_MEASUREMENT_ID || "SIN CONFIGURAR",
            eas: {
                projectId: "e5ab5937-3629-494d-aa98-93708c5a3fdd"
            }
        },
    },
};