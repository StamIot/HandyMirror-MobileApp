// Dépendances
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, View, Text, Pressable, TextInput, Switch, Platform, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// Remplace dotenv
import configSingleton from '../config/Configuration';

// Utilitaires
import * as Utilities from '../src/utilities/utilities';

const EditInformationScreen = () => {
    // Singleton (Configuration)
    const Config = {
        ipRN: configSingleton.getMyIPLocal(),
        portAPI: configSingleton.getPortAPI(),
    };
    const navigation = useNavigation();

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
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const userID = await AsyncStorage.getItem('userID');
            setUserID(userID);

            try {
                if (userID) {
                    const userResponse = await fetch(`http://${Config.ipRN}:${Config.portAPI}/api/v1/users/${userID}`);
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

                    console.log(contentForm.users);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const onPressPickerHandler = async () => {
        // Permission
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission refusée', "Désolé, vous n'avez pas accordé l'accès à vos photos.");
            }
        }

        // Ouvrir la fenetre
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Autorise uniquement les images
            allowsEditing: true, // permet à l'utilisateur de redimentionner son image
            aspect: [1, 1], // [1,1] un carré - [4,3] 4 tiers - [16,9] 16 neuvième
            quality: 1, // 0 qualité moche et 1 parfaite résolution
            base64: true,
        });

        // console.log({
        //     base64: result.base64,
        // });

        if (result.cancelled) {
            Alert.alert("Impossible d'ajouter une image", 'Vous avez annulé la sélection');
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
                    <Pressable style={styles.goBack} onPress={() => navigation.goBack({ refresh: true })}>
                        <View style={styles.iconContainer}>
                            <Entypo name="arrow-with-circle-left" size={64} color={Utilities.color.dark.green} />
                        </View>
                    </Pressable>
                    <Pressable style={styles.goBack} onPress={onPressPickerHandler}>
                        <View style={styles.photoCircleContainer}>{selectedImage ? <Image style={styles.photoCircleText} source={{ uri: selectedImage }} /> : <Text style={styles.photoCircleText}>Ajouter votre photo</Text>}</View>
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
                        <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { flex: 0.5, marginRight: 5 }]}>
                            <Text style={styles.inputTextPlaceholder}>Prénom</Text>
                            <TextInput style={styles.inputTextSaisie} onChangeText={setFirstname} value={firstname} placeholder="Votre prénom" />
                        </View>

                        {/* Lastname */}
                        <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { flex: 0.5, marginLeft: 5 }]}>
                            <Text style={styles.inputTextPlaceholder}>Nom</Text>
                            <TextInput style={styles.inputTextSaisie} onChangeText={setLastname} value={lastname} placeholder="Votre nom" />
                        </View>
                    </View>

                    {/* Pseudo */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Pseudo</Text>
                        <TextInput style={styles.inputTextSaisie} onChangeText={setPseudo} value={pseudo} placeholder="Votre Pseudo" />
                    </View>

                    {/* Email */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Email - Attention il s'agit de l'identifiant de connexion</Text>
                        <TextInput style={styles.inputTextSaisie} onChangeText={setEmail} value={email} placeholder="Votre email de connexion" />
                    </View>

                    {/* phone */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Téléphone</Text>
                        <TextInput style={styles.inputTextSaisie} onChangeText={setPhone} value={phone} placeholder="Votre n° de téléphone" />
                    </View>

                    {/* Country + Genre */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Country */}
                        <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { flex: 0.4, marginRight: 5 }]}>
                            <Text style={styles.inputTextPlaceholder}>Pays</Text>
                            <TextInput style={styles.inputTextSaisie} onChangeText={setCountry} value={country} placeholder="Votre Pays" />
                        </View>

                        {/* Genre */}
                        <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { flex: 0.6, marginLeft: 5 }]}>
                            <Text style={styles.inputTextPlaceholder}>Genre</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginRight: 2 }}>Féminin</Text>
                                <Switch onValueChange={setGenre} value={genre} />
                                <Text style={{ marginLeft: 2 }}>Masculin</Text>
                            </View>
                        </View>
                    </View>

                    {/* AddressAtHome */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Adresse</Text>
                        <TextInput style={styles.inputTextSaisie} onChangeText={setAddressAtHome} value={addressAtHome} placeholder="Ton adresse" />
                    </View>

                    {/* City */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Ville</Text>
                        <TextInput style={styles.inputTextSaisie} onChangeText={setCity} value={city} placeholder="La ville sera utilisé pour le module de localisation" />
                    </View>

                    {/* Compagnon Name */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Compagnon Name */}
                        <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { flex: 0.4, marginRight: 5 }]}>
                            <Text style={styles.inputTextPlaceholder}>Nom du partenaire</Text>
                            <TextInput style={styles.inputTextSaisie} onChangeText={setCompagnionLife} value={compagnionLife} placeholder="Son nom ici" />
                        </View>

                        {/* Children */}
                        <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { flex: 0.6, marginLeft: 5 }]}>
                            <Text style={styles.inputTextPlaceholder}>Avez-vous des enfants</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginRight: 10 }}>Non</Text>
                                <Switch onValueChange={setChildren} value={children} />
                                <Text style={{ marginLeft: 10 }}>Oui</Text>
                            </View>
                        </View>
                    </View>

                    <Pressable
                        style={styles.btn}
                        onPress={async () => {
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
                                };
                                console.log('\n\n ------------------ contentForm ', updatedContentForm, '\n\n');

                                // Mettez à jour les données locales dans AsyncStorage
                                await AsyncStorage.setItem('userData', JSON.stringify(updatedContentForm));

                                // Envoyez à l'API pour validation (à implémenter)
                                const validationResponse = await fetch(`http://${Config.ipRN}:${Config.portAPI}/api/v1/users/${userID}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(updatedContentForm),
                                });

                                const validationJson = await validationResponse.json();
                                console.log('\n\n ------------------ users ', validationJson, '\n\n');
                                console.log('REDIRECCCCCCCCCCCCCCCCCCT');
                                navigation.navigate('ProfileScreen', { refresh: true });
                                //navigation.goBack({ refresh: true }); // Indiquez à ProfileScreen de rafraîchir ses données
                                // navigation.navigate('ProfileScreen');
                            } catch (error) {
                                console.log('Error updating data:', error);
                            }
                        }}
                    >
                        <Text style={styles.btnText}>Enregistrer les modifications</Text>
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
        backgroundColor: Utilities.color.dark.green,
    },

    /**
     * CIRCLES
     */
    circlesContainer: {
        backgroundColor: Utilities.color.light.antiquewhite,
    },
    circle: {
        opacity: 0.8,
        width: 100,
        height: 100,
        backgroundColor: Utilities.color.light.antiquewhite,
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
        backgroundColor: Utilities.color.light.green,
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
        backgroundColor: Utilities.color.light.antiquewhite,
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
        backgroundColor: Utilities.color.light.grey,
        padding: 5,
        borderRadius: 50,
    },

    /**
     * Formulaire
     */
    formulaireContainer: {
        borderRadius: Utilities.border.sm,
        paddingHorizontal: 20,
        paddingVertical: 25,
        marginBottom: '10%',
    },
    inputTextContainer: {
        backgroundColor: Utilities.color.light.antiquewhite,
        padding: 4,
        paddingLeft: 12,
        borderRadius: 5,
        marginBottom: 10,
    },
    inputSmallTextContainer: {},
    inputTextPlaceholder: {
        fontSize: 12,
        color: Utilities.color.light.grey,
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
        backgroundColor: Utilities.color.light.grey,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: '2%',
        borderRadius: Utilities.border.sm,
    },
    btnText: {
        color: Utilities.color.black,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});

export default EditInformationScreen;
