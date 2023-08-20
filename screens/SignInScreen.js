// Dépendances
import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Remplace dotenv
import configSingleton from '../config/Configuration';


// Utilitaire
import * as Utilities from '../src/utilities/utilities';

// Composant
import MyInputText from '../Component/MyInputText';

const SignInScreen = () => {
    // Singleton (Configuration)
    const Config = {
        ipRN: configSingleton.getMyIPLocal(),
        portAPI: configSingleton.getPortAPI(),
    };
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleSignIn = async () => {
        if (!password) {
            setErrorMessages('Veuillez saisir votre mot de passe.');
            setErrorModalVisible(true);
            return;
        }

        try {
            const response = await axios.post(`http://${Config.ipRN}:${Config.portAPI}/api/v1/signin`, {
                email,
                password,
            });

            // Si l'API renvoie une bonne requête alors celle-ci redirigera vers la page de profile
            if (response.status === 200) {
                // console.log(response.data.user._id);
                await AsyncStorage.setItem('userID', response.data.user._id);

                // Redirection vers la page de profil
                navigation.navigate('ProfileScreen');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                const responseError = error.response.data;
                setErrorMessages(responseError.error);
                setErrorModalVisible(true);
            } else {
                setErrorMessages("Le server n'est pas démarrer");
                setErrorModalVisible(true);
                console.log('Erreur inattendue :', error.message);
            }
        }
    };

    return (
        <View style={styles.signInContainer}>
            {/* CERCLES */}
            <View style={styles.circlesContainer}>
                <View style={[styles.circle, styles.circleOne]}></View>
                <View style={[styles.circle, styles.circleTwo]}></View>
            </View>

            {/* MESSAGE : Ravi de vous revoir */}
            <View style={styles.messageContainer}>
                <Text style={styles.message}>{`Ravi de vous revoir, `}</Text>
            </View>

            {/* Icone / Email / Password / Button */}
            <View style={styles.formContainer}>
                <Image style={styles.formImage} resizeMode="cover" source={require('../assets/images/maincoucou03-1.png')} />
                <View style={styles.inputContainer}>
                    <MyInputText placeholder={'Entrez votre adresse mail'} value={email} onChangeText={setEmail} />
                    <MyInputText placeholder={'Entrez votre mot de passe'} value={password} onChangeText={setPassword} secureTextEntry={true} />
                </View>
                <Pressable style={styles.btn} onPress={handleSignIn}>
                    <Text style={styles.btnText}>Se connecter</Text>
                </Pressable>
            </View>

            <Modal visible={errorModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleText}>Oups... Une erreur a été rencontrée</Text>
                    </View>
                    <View style={styles.modalContentText}>
                        <Text style={styles.modalContentText}>{errorMessages}</Text>
                    </View>
                    <View style={styles.modalClose}>
                        <Pressable onPress={() => setErrorModalVisible(false)}>
                            <Text style={styles.modalCloseText}>Fermer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Pas de compte s'enregistrer */}
            <View style={styles.ToSignUpContainer}>
                <Pressable style={styles.vousNavezPasContainer} onPress={() => navigation.navigate('SignUpScreen')}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textDark}>Vous n’avez pas de compte ?</Text>
                        <Text style={styles.textWhite}>S’enregistrer</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        backgroundColor: Utilities.color.dark.green,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
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

    /**
     * Ravi de vous revoir
     */
    messageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '30%',
        marginBottom: '5%',
    },
    message: {
        fontSize: Utilities.font.size.xxl,
        color: Utilities.color.light.antiquewhite,
    },

    /**
     * FORMULAIRE
     */
    formContainer: {
        alignSelf: 'center', // Pour centrer le block au milieu
        alignItems: 'center',
        paddingVertical: '10%',
        width: '90%',
        backgroundColor: Utilities.color.light.green,
        borderRadius: Utilities.border.sm,
        marginBottom: '15%',
    },
    formImage: {
        marginBottom: '5%',
    },
    inputContainer: {
        width: '90%',
        marginBottom: '5%',
    },

    /**
     * BUTTON
     */
    btn: {
        backgroundColor: Utilities.color.dark.green,
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginTop: '5%',
        borderRadius: Utilities.border.sm,
    },
    btnText: {
        color: Utilities.color.light.antiquewhite,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },

    /**
     * Pas encore de compte
     */
    ToSignUpContainer: {
        width: '80%',
        alignSelf: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textDark: {
        fontSize: 16,
        color: Utilities.color.black,
    },
    textWhite: {
        fontSize: 16,
        color: Utilities.color.dark.green,
        backgroundColor: Utilities.color.light.grey,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: Utilities.border.md,
    },

    /**
     * MODAL
     */
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '10%',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalTitle: {
        backgroundColor: Utilities.color.light.red,
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopStartRadius: Utilities.border.sm,
        borderTopEndRadius: Utilities.border.sm,
    },
    modalTitleText: {
        fontSize: Utilities.font.size.md,
        fontWeight: 'bold',
        color: Utilities.color.light.antiquewhite,
    },
    modalContent: {
        backgroundColor: Utilities.color.light.antiquewhite,
    },
    modalContentText: {
        backgroundColor: Utilities.color.light.antiquewhite,
        color: Utilities.color.black,
        fontSize: Utilities.font.size.sm,
        paddingVertical: 25,
        paddingHorizontal: 12.5,
        fontWeight: 'bold',
    },
    modalClose: {
        backgroundColor: Utilities.color.light.grey,
        padding: 10,
        alignItems: 'flex-end',
    },
    modalCloseText: {
        backgroundColor: Utilities.color.black,
        color: Utilities.color.light.antiquewhite,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: Utilities.border.sm,
        textTransform: 'uppercase',
    },
});

export default SignInScreen;
