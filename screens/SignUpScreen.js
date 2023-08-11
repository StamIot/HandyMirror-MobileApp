import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { Color, Border, FontSize, FontFamily } from '../GlobalStyles';
import TextInputExample from '../Component/TextInputExample';

const SignUpScreen = () => {
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
            const response = await axios.post('http://192.168.1.12:3000/api/v1/signup', {
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
        <View style={styles.background}>
            <Text style={styles.bonjour}>{`Bonjour, `}</Text>
            <View style={styles.screen2Child}>
                <Text style={styles.welcomeSentence}>Bienvenue sur HandyMirror !</Text>
                <Text style={styles.welcomeSentence2}>Ensemble améliorons votre quotidien !</Text>
                <View style={styles.containerForm}>
                    <TextInputExample placeholder="Quel est votre prénom ?" value={firstname} onChangeText={setFirstname} />
                    <TextInputExample placeholder="Quel est votre nom ?" value={lastname} onChangeText={setLastname} />
                    <TextInputExample placeholder="Quel est votre adresse mail" value={email} onChangeText={setEmail} />
                    <TextInputExample placeholder="Saisissez un mot de passe" value={password} onChangeText={setPassword} />
                    <TextInputExample placeholder="Resaisissez votre mot de passe" value={confirmPassword} onChangeText={setConfirmPassword} />
                    <Pressable style={styles.registerButton} onPress={handleSignup}>
                        <Text style={[styles.senregistrer1, styles.seConnecterTypo]}>S'enregistrer</Text>
                    </Pressable>
                </View>

                <Pressable style={styles.ToSignUpContainer} onPress={() => navigation.navigate('SignInScreen')}>
                    <Text>
                        <Text style={styles.FirstPart}>{`On se connaît déjà ? `}</Text>
                        <Text style={styles.crimson}>Se connecter</Text>
                    </Text>
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
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: Color.dimgray,
        flex: 1,
    },
    containerForm: {
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
    },
    bonjour: {
        zIndex: 1,
        top: 40,
        left: 20,
        fontSize: 95,
        color: Color.antiquewhite,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: 0,
            height: 4,
        },
        textShadowRadius: 4,
        fontFamily: FontFamily.urbanistRegular,
        position: 'absolute',
    },
    screen2Child: {
        zIndex2: 2,
        top: 150,
        left: 20,
        borderRadius: Border.br_3xs,
        backgroundColor: Color.cadetblue_100,
        width: '90%',
        position: 'absolute',
    },
    welcomeSentence: {
        color: Color.antiquewhite,
        textAlign: 'center',
        marginTop: '10%',
        fontSize: FontSize.size_xl,
    },
    welcomeSentence2: {
        color: Color.antiquewhite,
        textAlign: 'center',
        marginBottom: '5%',
        fontSize: FontSize.size_xl,
    },
    registerButton: {
        borderRadius: Border.br_xl,
        backgroundColor: Color.lightgray,
        color: Color.dimgray,
        marginTop: '5%',
        width: '100%',
        height: 53,
    },
    FirstPart: {
        color: Color.gray_500,
        fontFamily: FontFamily.interMedium,
        fontWeight: '500',
    },
    SecondPart: {
        color: Color.gray_800,
    },
    seConnecterTypo: {
        fontFamily: FontFamily.interBold,
        fontWeight: '700',
    },
    senregistrer1: {
        fontSize: FontSize.titlePoppinsMedium_size,
        color: Color.dimgray,
        marginTop: '6%',
        textAlign: 'center',
        fontWeight: '700',
    },
    text: {
        width: '100%',
        height: 22,
        fontSize: FontSize.bodyMedium_size,
    },
    ToSignUpContainer: {
        bottom: '-8%',
        left: '22%',
        position: 'absolute',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '10%',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalTitle: {
        backgroundColor: 'rgb(169,0,0)',
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
    },
    modalTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.antiquewhite,
    },
    modalContent: {
        backgroundColor: Color.antiquewhite,
    },
    modalContentText: {
        backgroundColor: Color.antiquewhite,
        color: Color.black,
        paddingVertical: 20,
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    modalClose: {
        backgroundColor: Color.gray_100,
        padding: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        textTransform: 'uppercase',
    },
    modalCloseText: {
        color: Color.antiquewhite,
        textTransform: 'uppercase',
    },
});

export default SignUpScreen;
