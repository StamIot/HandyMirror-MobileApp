# HandyMirror MobileApp

## Listes Dépendences

```sh
# Navigation (https://reactnavigation.org/docs/getting-started/)
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler
npx expo install @react-native-masked-view/masked-view

# SUR MAC RAJOUTER
npx pod-install ios

# ICONS (https://github.com/oblador/react-native-vector-icons)
npm install --save react-native-vector-icons

# STATUS BAR EXPO (https://docs.expo.dev/versions/latest/sdk/status-bar/)
npx expo install expo-status-bar

# AsyncStorage Deprecated (https://reactnative.dev/docs/asyncstorage)
# /!\ A VOIR POUR un Projet Communautaire compatible (https://reactnative.directory/?search=storage)
npm install @react-native-async-storage/async-storage

# IMAGE PICKER (https://docs.expo.dev/versions/latest/sdk/imagepicker/)
npx expo install expo-image-picker

# CAMERA ()
npx expo install expo-camera

# Font ()
npx expo install expo-font

# Expo App Loading ()
npx expo install expo-app-loading
```

## How start this application

```sh
# 1. Suppression des dépendences et installation
npm run install

# 2. Run doctor for check your compatibility
npm run doctor
```
