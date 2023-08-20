// Dépendances
import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Remplace dotenv
import configSingleton from '../config/Configuration';


// Utilitaire
import * as Utilities from '../src/utilities/utilities';

// Composants
import MyInputText from '../Component/MyInputText';

const SignUpScreen = () => {
    // Singleton (Configuration)
    const Config = {
        ipRN: configSingleton.getMyIPLocal(),
        portAPI: configSingleton.getPortAPI(),
    };
    const navigation = useNavigation();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleSignup = async () => {
        try {
            const response = await axios.post(`http://${Config.ipRN}:${Config.portAPI}/api/v1/signUp`, {
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
            });

            if (response.status === 201) {
                // Redirection vers la page de connexion
                navigation.navigate('SignInScreen');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                const responseError = error.response.data;
                setErrorMessages(responseError.error);
                setErrorModalVisible(true);
            } else {
                console.log('Erreur inattendue :', error.message);
            }
        }
    };

    return (
        <View style={styles.signUpContainer}>
            {/* CERCLES */}
            <View style={styles.circlesContainer}>
                <View style={[styles.circle, styles.circleOne]}></View>
                <View style={[styles.circle, styles.circleTwo]}></View>
            </View>

            {/* BONJOUR */}
            <Text style={styles.bonjour}>{`Bonjour, `}</Text>

            {/* FORULAIRE */}
            <View style={styles.formContainer}>
                <Text style={styles.welcomeSentence}>Bienvenue sur HandyMirror !</Text>
                <Text style={styles.welcomeSentence}>Ensemble améliorons votre quotidien !</Text>
                <View style={styles.form}>
                    <MyInputText placeholder="Quel est votre prénom ?" value={firstname} onChangeText={setFirstname} />
                    <MyInputText placeholder="Quel est votre nom ?" value={lastname} onChangeText={setLastname} />
                    <MyInputText placeholder="Quel est votre adresse mail" value={email} onChangeText={setEmail} />
                    <MyInputText placeholder="Saisissez un mot de passe" value={password} onChangeText={setPassword} />
                    <MyInputText placeholder="Resaisissez votre mot de passe" value={confirmPassword} onChangeText={setConfirmPassword} />
                    <Pressable style={styles.btn} onPress={handleSignup}>
                        <Text style={styles.btnText}>S'enregistrer</Text>
                    </Pressable>
                </View>

                <Modal visible={errorModalVisible} animationType="slide" transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Oups...</Text>
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
            </View>

            {/* Déjà inscrit */}
            <View style={styles.ToSignInScreenContainer}>
                <Pressable style={styles.accountExistContainer} onPress={() => navigation.navigate('SignInScreen')}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textDark}>On se connaît déjà ?</Text>
                        <Text style={styles.textWhite}>Connexion</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    signUpContainer: {
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
     * BONJOUR
     */
    bonjour: {
        position: 'absolute',
        zIndex: 2,
        top: 40,
        left: 20,
        fontSize: 95,
        color: Utilities.color.light.antiquewhite,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: 0,
            height: 4,
        },
        textShadowRadius: 4,
        fontFamily: Utilities.font.family.urbanist.regular,
    },

    /**
     * FORMULAIRE
     */
    formContainer: {
        backgroundColor: Utilities.color.light.green,
        position: 'absolute',
        zIndex: 1,
        top: 150,
        left: 20,
        width: '90%',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 25,
        borderRadius: Utilities.border.sm,
    },
    welcomeSentence: {
        color: Utilities.color.light.antiquewhite,
        textAlign: 'center',
        fontSize: Utilities.font.size.md,
    },
    form: {
        marginTop: '10%',
        marginBottom: '10%',
    },

    /**
     * BUTTON
     */
    btn: {
        width: '65%',
        alignSelf: 'center',
        backgroundColor: Utilities.color.dark.green,
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginTop: '10%',
        borderRadius: Utilities.border.sm,
    },
    btnText: {
        color: Utilities.color.light.antiquewhite,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },

    /**
     *
     */
    ToSignInScreenContainer: {
        width: '80%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30,
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

export default SignUpScreen;
