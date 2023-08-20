/**
 * Créer le : 17/05/2023
 * Mis à jour le : 20/08/2023
 * Author: Guillon Alain
 * Version: 1.0.5
 * ------------------------------------------------------------------------------------------------------------
 * Ajout de la prise en charge de la photo par l'API
 */

// Dépendances
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    TextInput,
    Switch,
    Platform,
    ScrollView,
    Alert,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// Remplace dotenv
import configSingleton from '../config/settings/Configuration';

// Utilitaires
import Tools from '../utilities/Tools'; // charge index.js

const EditInformationScreen = () => {
    // Singleton (Configuration)
    const Config = {
        ipRN: configSingleton.getMyIPLocal(),
        portAPI: configSingleton.getPortAPI(),
    };

    // Navigation
    const navigation = useNavigation();

    // State Caméra
    const [galleryPhotoPermission, setGalleryPhotoPermission] = useState(null);
    const [photo, setPhoto] = useState('');
    // Sate User
    const [userID, setUserID] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [phone, setPhone] = useState('');
    const [genre, setGenre] = useState(false);
    const [addressAtHome, setAddressAtHome] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [compagnionLife, setCompagnionLife] = useState('');
    const [children, setChildren] = useState(false);
    const [contentForm, setContentForm] = useState({});

    // Gallery Permission
    useEffect(async () => {
        const galerryPhotoState =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        galerryPhotoState.granted
            ? setGalleryPhotoPermission(galerryPhotoState.status === 'granted')
            : setGalleryPhotoPermission(null);
    }, []);

    // Chargement de la photo sauvegarder si elle existe dans l'AsyncStorage
    useEffect(() => {
        const loadPhotoFromAsyncStorage = async () => {
            try {
                const savedPhotoAsync = await AsyncStorage.getItem(
                    'photoAsync',
                );
                if (savedPhotoAsync) {
                    setPhoto(savedPhotoAsync);
                }
            } catch (error) {
                console.log(
                    'Erreur lors du chargement de la photo depuis le stockage :',
                    error,
                );
            }
        };

        loadPhotoFromAsyncStorage();
    }, []);

    const takePhoto = async () => {
        // Lancement de la sélection de la photo
        let photoResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Autorise uniquement les images
            allowsEditing: true, // permet à l'utilisateur de redimentionner son image
            aspect: [1, 1], // 1,1 = carré - 4,3 = quatre tier - 16,9 = seize neuvième
            quality: 1, // 0,1 = bad quality - 1 = extra quality
        });

        // console.log({checkData: { photo: photoResult.assets[0].uri }});

        // Permission
        if (Platform.OS !== 'web') {
            if (!galleryPhotoPermission) {
                Alert.alert(
                    'Permission refusée',
                    "Désolé, vous n'avez pas accordé l'accès à vos photos.",
                );
            }
        }
        if (photoResult.canceled) {
            Alert.alert(
                'Annulation',
                "Vous venez d'annuler la saisie d'une photo pour votre profil",
            );
        }
        if (!photoResult.canceled) {
            setPhoto(photoResult.assets[0].uri);

            try {
                await AsyncStorage.setItem(
                    'photoAsync',
                    photoResult.assets[0].uri,
                );
            } catch (error) {
                console.log(
                    "Erreur lors de l'enregistrement de l'URI de la photo :",
                    error,
                );
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID');
                setUserID(userID);

                if (userID) {
                    const userResponse = await fetch(
                        `http://${Config.ipRN}:${Config.portAPI}/api/v1/users/${userID}`,
                    );
                    const userJson = await userResponse.json();

                    setContentForm({ ...userJson });
                    setFirstname(userJson.users.firstname);
                    setLastname(userJson.users.lastname);
                    setEmail(userJson.users.email);
                    setPseudo(userJson.users.pseudo);
                    setPhone(userJson.users.phone);
                    setGenre(userJson.users.genre);
                    setAddressAtHome(userJson.users.addressAtHome);
                    setCity(userJson.users.city);
                    setCountry(userJson.users.country);
                    setCompagnionLife(userJson.users.compagnionLife);
                    setChildren(userJson.users.children);
                    setPhoto(userJson.users.photoProfile);

                    console.log(contentForm.users);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // UPDATE
    const updateUserHandler = async () => {
        try {
            const updatedContentForm = {
                ...contentForm.users,
                firstname: firstname,
                lastname: lastname,
                email: email,
                pseudo: pseudo,
                phone: phone,
                genre: genre,
                addressAtHome: addressAtHome,
                city: city,
                country: country,
                compagnionLife: compagnionLife,
                children: children,
                photoProfile: photo,
            };
            console.log(
                '\n\n ------------------ contentForm ',
                updatedContentForm,
                '\n\n',
            );

            // Mettez à jour les données locales dans AsyncStorage
            await AsyncStorage.setItem(
                'userData',
                JSON.stringify(updatedContentForm),
            );

            // Envoyez à l'API pour validation (à implémenter)

            const validationResponse = await fetch(
                `http://${Config.ipRN}:${Config.portAPI}/api/v1/users/${userID}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedContentForm),
                },
            );

            const validationJson = await validationResponse.json();
            console.log(
                '\n\n ------------------ users ',
                validationJson,
                '\n\n',
            );
            console.log('REDIRECCCCCCCCCCCCCCCCCCT');
            navigation.navigate('ProfileScreen', {
                refresh: true,
            });
            //navigation.goBack({ refresh: true }); // Indiquez à ProfileScreen de rafraîchir ses données
            // navigation.navigate('ProfileScreen');
        } catch (error) {
            console.log('Error updating data:', error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.EditInformationScreen}>
                {/* CERCLES */}
                <View style={styles.circlesContainer}>
                    <View style={[styles.circle, styles.circleOne]}></View>
                    <View style={[styles.circle, styles.circleTwo]}></View>
                </View>

                {/* Ajouter votre photo */}
                <View style={styles.titleContainer}>
                    <Pressable
                        style={styles.goBack}
                        onPress={() => navigation.goBack({ refresh: true })}
                    >
                        <View style={styles.iconContainer}>
                            <Entypo
                                name="arrow-with-circle-left"
                                size={64}
                                color={Tools.color.dark.green}
                            />
                        </View>
                    </Pressable>

                    <Pressable style={styles.goBack} onPress={takePhoto}>
                        <View style={styles.photoCircleContainer}>
                            {photo ? (
                                <Image
                                    style={styles.photoCircleText}
                                    source={{ uri: photo }}
                                />
                            ) : (
                                <Text style={styles.photoCircleText}>
                                    Ajouter votre photo
                                </Text>
                            )}
                        </View>
                    </Pressable>
                </View>

                {/* Formulaire */}
                <View style={styles.formulaireContainer}>
                    {/* Firstname + Lastname */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Firstname */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { flex: 0.5, marginRight: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Prénom
                            </Text>
                            <TextInput
                                style={styles.inputTextSaisie}
                                onChangeText={setFirstname}
                                value={firstname}
                                placeholder="Votre prénom"
                            />
                        </View>

                        {/* Lastname */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { flex: 0.5, marginLeft: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>Nom</Text>
                            <TextInput
                                style={styles.inputTextSaisie}
                                onChangeText={setLastname}
                                value={lastname}
                                placeholder="Votre nom"
                            />
                        </View>
                    </View>

                    {/* Pseudo */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Pseudo</Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={setPseudo}
                            value={pseudo}
                            placeholder="Votre Pseudo"
                        />
                    </View>

                    {/* Email */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>
                            Email - Attention il s'agit de l'identifiant de
                            connexion
                        </Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Votre email de connexion"
                        />
                    </View>

                    {/* phone */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>
                            Téléphone
                        </Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={setPhone}
                            value={phone}
                            placeholder="Votre n° de téléphone"
                        />
                    </View>

                    {/* Country + Genre */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Country */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { flex: 0.4, marginRight: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Pays
                            </Text>
                            <TextInput
                                style={styles.inputTextSaisie}
                                onChangeText={setCountry}
                                value={country}
                                placeholder="Votre Pays"
                            />
                        </View>

                        {/* Genre */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { flex: 0.6, marginLeft: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Genre
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ marginRight: 2 }}>Féminin</Text>
                                <Switch
                                    onValueChange={setGenre}
                                    value={genre}
                                />
                                <Text style={{ marginLeft: 2 }}>Masculin</Text>
                            </View>
                        </View>
                    </View>

                    {/* AddressAtHome */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Adresse</Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={setAddressAtHome}
                            value={addressAtHome}
                            placeholder="Ton adresse"
                        />
                    </View>

                    {/* City */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Ville</Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={setCity}
                            value={city}
                            placeholder="La ville sera utilisé pour le module de localisation"
                        />
                    </View>

                    {/* Compagnon Name */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Compagnon Name */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { flex: 0.4, marginRight: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Nom du partenaire
                            </Text>
                            <TextInput
                                style={styles.inputTextSaisie}
                                onChangeText={setCompagnionLife}
                                value={compagnionLife}
                                placeholder="Son nom ici"
                            />
                        </View>

                        {/* Children */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { flex: 0.6, marginLeft: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Avez-vous des enfants
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ marginRight: 10 }}>Non</Text>
                                <Switch
                                    onValueChange={setChildren}
                                    value={children}
                                />
                                <Text style={{ marginLeft: 10 }}>Oui</Text>
                            </View>
                        </View>
                    </View>

                    <Pressable style={styles.btn} onPress={updateUserHandler}>
                        <Text style={styles.btnText}>
                            Enregistrer les modifications
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    EditInformationScreen: {
        flex: 1,
        backgroundColor: Tools.color.dark.green,
    },

    /**
     * CIRCLES
     */
    circlesContainer: {
        backgroundColor: Tools.color.light.antiquewhite,
    },
    circle: {
        opacity: 0.8,
        width: 100,
        height: 100,
        backgroundColor: Tools.color.light.antiquewhite,
        borderRadius: 50,
    },
    circleOne: {
        position: 'absolute',
        top: -20,
        left: -10,
        zIndex: 2,
    },
    circleTwo: {
        position: 'absolute',
        top: 20,
        left: -60,
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 85,
        marginBottom: 60,
    },
    photoCircleContainer: {
        backgroundColor: Tools.color.light.green,
        padding: 10,
        borderRadius: 100,
        width: 160,
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 50,
    },
    photoCircleText: {
        backgroundColor: Tools.color.light.antiquewhite,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        width: '100%',
        borderRadius: 100,
        fontSize: 18,
        fontWeight: '700',
    },
    goBack: {
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        backgroundColor: Tools.color.light.grey,
        padding: 5,
        borderRadius: 50,
    },

    /**
     * Formulaire
     */
    formulaireContainer: {
        borderRadius: Tools.border.size.sm,
        paddingHorizontal: 20,
        paddingVertical: 25,
        marginBottom: '10%',
    },
    inputTextContainer: {
        backgroundColor: Tools.color.light.antiquewhite,
        padding: 4,
        paddingLeft: 12,
        borderRadius: 5,
        marginBottom: 10,
    },
    inputSmallTextContainer: {},
    inputTextPlaceholder: {
        fontSize: 12,
        color: Tools.color.light.grey,
        fontStyle: 'italic',
    },
    inputTextSaisie: {
        fontSize: 15,
    },

    /**
     * BUTTON
     */
    btn: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Tools.color.light.grey,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: '2%',
        borderRadius: Tools.border.size.sm,
    },
    btnText: {
        color: Tools.color.black,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});

export default EditInformationScreen;
