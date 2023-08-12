// Dépendances
import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Config from '../config/config';

// Styles
import { Color, FontFamily, FontSize } from '../GlobalStyles';

// Composants Créer
import TextInputExample from '../Component/TextInputExample';

const SignInScreen = () => {
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
            const response = await axios.post(`${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_REACT_NATIVE}/api/v1/signin`, {
                email,
                password,
            });

            if (response.status === 200) {
                // Redirection vers la page de profil
                navigation.navigate('CustomizeScreen');
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
        <>
            {/* SCREEN N°3 */}
            <View style={styles.screen3}>
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
                    <Image resizeMode="cover" source={require('../assets/maincoucou03-1.png')} />
                    <View style={styles.inputContainer}>
                        <TextInputExample placeholder={'Entrez votre adresse mail'} value={email} onChangeText={setEmail} />
                        <TextInputExample placeholder={'Entrez votre mot de passe'} value={password} onChangeText={setPassword} secureTextEntry={true} />
                    </View>
                    <Pressable style={styles.btnLogin} onPress={handleSignIn}>
                        <Text style={styles.btnLoginColor}>Se connecter</Text>
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

                {/* Pas de compte s'enregistrer */}
                <View style={styles.notAccountContainer}>
                    <Pressable style={styles.vousNavezPasContainer} onPress={() => navigation.navigate('SignUpScreen')}>
                        <View style={styles.textContainer}>
                            <View style={styles.textDarkContainer}>
                                <Text style={styles.textDark}>Vous n’avez pas de compte ?</Text>
                            </View>
                            <View style={styles.textWhiteContainer}>
                                <Text style={styles.textWhite}>S’enregistrer</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    screen3: {
        flex: 1,
        backgroundColor: Color.dimgray,
    },
    circlesContainer: {
        flex: 0.1,
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
    messageContainer: {
        flex: 0.1,
    },
    message: {
        textAlign: 'center',
        fontFamily: FontFamily.urbanistRegular,
        fontSize: FontSize.size_21xl,
        color: Color.antiquewhite,
        paddingTop: 20,
    },
    formContainer: {
        flex: 0.6,
        backgroundColor: Color.cadetblue_100,
        marginRight: 30,
        marginLeft: 30,
        padding: 20,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 25,
    },
    btnLogin: {
        backgroundColor: Color.antiquewhite,
        width: '50%',
        padding: 12,
        borderRadius: 12,
    },
    btnLoginColor: {
        color: Color.dimgray,
        fontWeight: '700',
        textAlign: 'center',
    },
    notAccountContainer: {
        flex: 0.2,
        justifyContent: 'center',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    textDark: {
        fontSize: 16,
        color: '#000',
    },
    textWhite: {
        fontSize: 16,
        color: Color.antiquewhite,
    },
    textContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    textDarkContainer: {
        paddingRight: 15,
    },
    textWhiteContainer: {
        paddingLeft: 15,
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

export default SignInScreen;
