// Dépendances
import { StyleSheet, View, Text, Pressable, TextInput, Switch, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Config from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Styles
import { Color, FontFamily } from '../GlobalStyles';

const EditProfileScreen = () => {
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

    useEffect(() => {});

    useEffect(() => {
        const fetchData = async () => {
            const userID = await AsyncStorage.getItem('userID');
            setUserID(userID);

            try {
                if (userID) {
                    const userResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_REACT_NATIVE}/api/v1/users/${userID}`);
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

    return (
        <>
            {/* SCREEN N°8 */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.screen8}>
                    {/* CERCLES */}
                    <View style={styles.circlesContainer}>
                        <View style={[styles.circle, styles.circleOne]}></View>
                        <View style={[styles.circle, styles.circleTwo]}></View>
                    </View>

                    {/* Ajouter votre photo */}
                    <View style={styles.titleContainer}>
                        <Pressable style={styles.goBack} onPress={() => navigation.goBack({ refresh: true })}>
                            <View style={styles.iconContainer}>
                                <Entypo name="arrow-with-circle-left" size={64} color={Color.dimgray} />
                            </View>
                        </Pressable>
                        <Pressable
                            style={styles.goBack}
                            onPress={() => {
                                console.log('à éditer');
                                {
                                    /* navigation.goBack({ refresh: true } */
                                }
                            }}
                        >
                            <View style={styles.photoCircleContainer}>
                                <Text style={styles.photoCircleText}>{'Ajouter votre photos'}</Text>
                            </View>
                        </Pressable>
                    </View>

                    {/* Formulaire */}
                    <View style={styles.formulaireContainer}>
                        {/* Firstname + Lastname */}
                        <View
                            style={{
                                flex: 0.4,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/* Firstname */}
                            <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { marginRight: 5 }]}>
                                <Text style={styles.inputTextPlaceholder}>Prénom</Text>
                                <TextInput style={styles.inputTextSaisie} onChangeText={setFirstname} value={firstname} placeholder="Votre prénom" />
                            </View>

                            {/* Lastname */}
                            <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { marginLeft: 5 }]}>
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
                            <Text style={styles.inputTextPlaceholder}>Adresse Email - ( Attention il s'agit de l'identifiant de connexion )</Text>
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
                                flex: 0.4,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/* Country */}
                            <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { marginRight: 5 }]}>
                                <Text style={styles.inputTextPlaceholder}>Pays</Text>
                                <TextInput style={styles.inputTextSaisie} onChangeText={setCountry} value={country} placeholder="Votre Pays" />
                            </View>

                            {/* Genre */}
                            <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { marginLeft: 5 }]}>
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
                            <Text style={styles.inputTextPlaceholder}>Adresse de ton domicile</Text>
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
                                flex: 0.4,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/* Compagnon Name */}
                            <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { marginRight: 5 }]}>
                                <Text style={styles.inputTextPlaceholder}>Nom du compagnon de vie</Text>
                                <TextInput style={styles.inputTextSaisie} onChangeText={setCompagnionLife} value={compagnionLife} placeholder="Son nom ici" />
                            </View>

                            {/* Children */}
                            <View style={[styles.inputTextContainer, styles.inputSmallTextContainer, { marginLeft: 5 }]}>
                                <Text style={styles.inputTextPlaceholder}>Avez-vous des enfants</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ marginRight: 10 }}>Non</Text>
                                    <Switch onValueChange={setChildren} value={children} />
                                    <Text style={{ marginLeft: 10 }}>Oui</Text>
                                </View>
                            </View>
                        </View>

                        <Pressable
                            style={styles.btnLogin}
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
                                    const validationResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_REACT_NATIVE}/api/v1/users/${userID}`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(updatedContentForm),
                                    });

                                    const validationJson = await validationResponse.json();
                                    console.log('\n\n ------------------ users ', validationJson, '\n\n');
                                    console.log('REDIRECCCCCCCCCCCCCCCCCCT');
                                    navigation.navigate('CustomizeScreen', { refresh: true });
                                    //navigation.goBack({ refresh: true }); // Indiquez à CustomizeScreen de rafraîchir ses données
                                    // navigation.navigate('CustomizeScreen');
                                } catch (error) {
                                    console.log('Error updating data:', error);
                                }
                            }}
                        >
                            <Text style={styles.btnLoginColor}>Enregistrer</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    screen8: {
        flex: 1,
        backgroundColor: Color.dimgray,
    },
    circlesContainer: {
        flex: 0.05,
    },
    circle: {
        opacity: 0.8,
        width: 75,
        height: 75,
        backgroundColor: Color.antiquewhite,
        borderRadius: 50,
    },
    circleOne: {
        position: 'absolute',
        top: -10,
        left: 0,
    },
    circleTwo: {
        position: 'absolute',
        top: '35%',
        left: -35,
    },
    titleContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 25,
    },
    photoCircleContainer: {
        backgroundColor: Color.cadetblue_100,
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
        backgroundColor: Color.antiquewhite,
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
        backgroundColor: Color.gray_600,
        padding: 5,
        borderRadius: 50,
    },
    formulaireContainer: {
        flex: 0.8,
        padding: 20,
        marginTop: 15,
    },
    inputTextContainer: {
        backgroundColor: Color.snow_100,
        padding: 4,
        paddingLeft: 12,
        borderRadius: 5,
        marginBottom: 10,
    },
    inputSmallTextContainer: {
        flex: 1,
    },
    inputTextPlaceholder: {
        fontSize: 12,
        color: Color.gray_400,
    },
    inputTextSaisie: {
        fontSize: 15,
    },
    btnLogin: {
        backgroundColor: Color.antiquewhite,
        width: '100%',
        padding: 12,
        borderRadius: 8,
    },
    btnLoginColor: {
        color: Color.dimgray,
        fontWeight: '700',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

export default EditProfileScreen;
