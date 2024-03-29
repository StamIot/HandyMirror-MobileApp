/**
 * Date: 17/08/2023
 * Author: Guillon Alain
 * Version: 1.0.0
 * ------------------------------------------------------------------------------------------------------------
 *
 */

// Dépendances
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Remplace dotenv
import configSingleton from '../config/settings/Configuration';

// Utilitaire
import Tools from '../utilities/Tools'; // charge index.js
import { Alert } from 'react-native';

const DetectePhotoStatusScreen = () => {
    // Singleton (Configuration)
    const Config = {
        ipRN: configSingleton.getMyIPLocal(),
        portAPI: configSingleton.getPortAPI(),
    };

    // Navigation
    const navigation = useNavigation();

    // State
    const [userData, setUserData] = useState({
        userID: '',
        photos: {
            face: '',
            left: '',
            right: '',
        },
    });

    // console.log(userData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID');
                if (userID) {
                    // si Photo existe dans async storage
                    // sinon récuperer via un apel api

                    const userPhotosResponse = await fetch(
                        `http://${Config.ipRN}:${Config.portAPI}/api/v1/users/${userID}/photos`,
                    );
                    const userJson = await userPhotosResponse.json();

                    if (userJson) {
                        console.log(userJson.users);

                        setUserData({
                            ...userData,
                            userID: userJson.users._id,
                            photos: {
                                face: userJson.users.photos.face,
                                left: userJson.users.photos.left,
                                right: userJson.users.photos.right,
                            },
                        });
                    }
                }
            } catch (error) {
                console.log("Erreur lors de la récupération de l'ID:", error);
            }
        };
        fetchData();
    }, []);

    // UPDATE
    const updateUserPhotosHandler = async () => {
        try {
            const userID = await AsyncStorage.getItem('userID');
            const { face, left, right } = userData.photos;

            console.log(face);

            if (face === '' || left === '' || right === '') {
                return Alert.alert(
                    'Mise à jour impossible',
                    'Vous devez renseigner une image pour chacune des positions demandé',
                );
            } else {
                const updatedUserData = {
                    ...userData.users,
                    photos: {
                        face: userData.photos.face,
                        left: userData.photos.left,
                        right: userData.photos.right,
                    },
                };
                console.log(
                    '\n\n ------------------ contentForm ',
                    updatedUserData,
                    '\n\n',
                );

                // Envoyez à l'API pour validation (à implémenter)
                const validationResponse = await fetch(
                    `http://${Config.ipRN}:${Config.portAPI}/api/v1/users/${userID}/photos`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedUserData),
                    },
                );

                const validationJson = await validationResponse.json();
                console.log(
                    '\n\n ------------------ users ',
                    validationJson,
                    '\n\n',
                );
                console.log('REDIRECCCCCCCCCCCCCCCCCCT');
                Alert.alert(
                    'Oh tu viens de réussir',
                    'Mise à jour réussi avec succès',
                );
                //navigation.goBack({ refresh: true }); // Indiquez à ProfileScreen de rafraîchir ses données
                // navigation.navigate('ProfileScreen');
            }
        } catch (error) {
            console.log('Error updating data:', error);
        }
    };

    return (
        <ScrollView style={styles.DetectePhotoStatusScreenContainer}>
            {/* CERCLES */}
            <View style={styles.circlesContainer}>
                <View style={[styles.circle, styles.circleOne]}></View>
                <View style={[styles.circle, styles.circleTwo]}></View>
            </View>

            {/* FaceID */}
            <View style={styles.titleContainer}>
                <Pressable
                    style={styles.goBack}
                    onPress={() => navigation.goBack()}
                >
                    <View style={styles.iconContainer}>
                        <Entypo
                            name="arrow-with-circle-left"
                            size={64}
                            color={Tools.color.dark.green}
                        />
                    </View>
                </Pressable>
                <Text style={styles.title}>Statut Photo</Text>
            </View>

            {/* Options */}
            <View style={styles.faceIDContainer}>
                <Text
                    style={{
                        color: Tools.color.light.antiquewhite,
                        marginBottom: '20%',
                    }}
                >
                    Vous trouverez ci-dessous un ensemble de photo prise qui
                    seront analysé par votre miroir afin de vous détecter.
                </Text>

                {/* DETECTION */}
                <View style={styles.bgcDetection}>
                    {/* PHOTO DE FACE */}

                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 1 / 3,
                        }}
                    >
                        <Text>Photo de Face: </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('DetectePhotoFaceScreen')
                            }
                        >
                            {userData.photos.face ? (
                                <Image
                                    style={styles.photoCircleText}
                                    source={{ uri: userData.photos.face }}
                                />
                            ) : (
                                <Text style={styles.photoCircleText}>
                                    Ajouter votre photo
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* PHOTO DE PROFILE CÔTE GAUCHE */}
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 1 / 3,
                        }}
                    >
                        <Text>Photo de Profile côté gauche : </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(
                                    'DetectePhotoLeftProfileScreen',
                                )
                            }
                        >
                            {userData.photos.left ? (
                                <Image
                                    style={styles.photoCircleText}
                                    source={{ uri: userData.photos.left }}
                                />
                            ) : (
                                <Text style={styles.photoCircleText}>
                                    Ajouter votre photo
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* PHOTO DE PROFILE CÔTE DROIT */}
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 1 / 3,
                        }}
                    >
                        <Text>Photo de Profile côté droit : </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(
                                    'DetectePhotoRightProfileScreen',
                                )
                            }
                        >
                            {userData.photos.right ? (
                                <Image
                                    style={styles.photoCircleText}
                                    source={{ uri: userData.photos.right }}
                                />
                            ) : (
                                <Text style={styles.photoCircleText}>
                                    Ajouter votre photo
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* BTN */}
            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.btn}
                    onPress={() =>
                        navigation.navigate('DetectePhotoFaceScreen')
                    }
                >
                    <Text style={styles.btnText}>Démarrer</Text>
                </Pressable>
                <Pressable
                    style={{
                        ...styles.btn,
                        backgroundColor: Tools.color.dark.red,
                    }}
                    onPress={updateUserPhotosHandler}
                >
                    <Text style={styles.btnText}>Enregistrer</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    DetectePhotoStatusScreenContainer: {
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
        marginTop: 60,
    },
    title: {
        fontFamily: Tools.font.family.urbanist.medium,
        fontSize: 35,
        color: Tools.color.light.antiquewhite,
        textAlign: 'center',
        marginRight: 40,
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
    faceIDContainer: {
        marginVertical: 20,
        marginHorizontal: 20,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textContainer: {
        color: Tools.color.light.green,
        paddingBottom: 15,
        paddingHorizontal: 10,
    },
    bgcDetection: {
        backgroundColor: Tools.color.light.antiquewhite,
        borderRadius: Tools.border.size.sm,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 400,
        width: 350,
    },
    photoCircleText: {
        backgroundColor: Tools.color.light.grey,
        color: Tools.color.black,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 100,
        width: 100,
        borderRadius: Tools.border.size.sm,
        fontSize: 12,
        fontWeight: '700',
    },

    /**
     * BUTTON
     */
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: '10%',
    },
    btn: {
        flex: 0.48,
        backgroundColor: Tools.color.light.yellow,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: '10%',
        borderRadius: Tools.border.size.sm,
        alignSelf: 'center',
    },
    btnText: {
        color: Tools.color.black,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DetectePhotoStatusScreen;
