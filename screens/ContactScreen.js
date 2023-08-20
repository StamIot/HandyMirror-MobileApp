/**
 * Date: 18/05/2023
 * Author: Guillon Alain
 * Version: 1.0.0
 * ------------------------------------------------------------------------------------------------------------
 * 
 */

// Dépendances
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Utilitaires
import Tools from '../utilities/Tools'; // charge index.js

const ContactScreen = () => {
    const navigation = useNavigation();
    const [value, onChangeText] = useState('');
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    return (
        <ScrollView style={styles.ContactScreenContainer}>
            {/* CERCLES */}
            <View style={styles.circlesContainer}>
                <View style={[styles.circle, styles.circleOne]}></View>
                <View style={[styles.circle, styles.circleTwo]}></View>
            </View>

            {/* Contactez-nous */}
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
                <View>
                    <Text style={styles.title}>{'Contactez'}</Text>
                    <Text style={styles.title}>{'Nous'}</Text>
                </View>
            </View>

            {/* Options */}
            <View style={styles.contactContainer}>
                <Text style={styles.textContainer}>
                    Posez nous vos questions, nous vous répondrons sous peu.
                </Text>

                {/* Nom */}
                <TextInput
                    style={styles.textOneLine}
                    placeholder="Nom: exemple 'patrick'"
                />

                {/* Email */}
                <TextInput
                    style={styles.textOneLine}
                    placeholder="Email: ex 'patpat@gmail.com'"
                />

                {/* Message */}
                <TextInput
                    editable
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => onChangeText(text)}
                    value={value}
                    placeholder="Racontez nous votre histoire ou posez nous une question."
                    style={[styles.textOneLine, styles.textMultiLines]}
                />

                {/* BTN */}
                <Pressable
                    style={styles.btn}
                    onPress={() => setInfoModalVisible(true)}
                >
                    <Text style={styles.btnText}>Envoyer</Text>
                </Pressable>

                {/* Modal Informative */}
                <Modal
                    visible={infoModalVisible}
                    animationType="slide"
                    transparent
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>
                                Information
                            </Text>
                        </View>
                        <View style={styles.modalContentText}>
                            <Text style={styles.modalContentText}>
                                Désolé, cette feature est à développer..
                            </Text>
                        </View>
                        <View style={styles.modalClose}>
                            <Pressable
                                onPress={() => setInfoModalVisible(false)}
                            >
                                <Text style={styles.modalCloseText}>
                                    Fermer
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    ContactScreenContainer: {
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
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 40,
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
    contactContainer: {
        margin: 20,
    },
    textContainer: {
        color: Tools.color.light.antiquewhite,
        paddingBottom: 25,
    },
    textOneLine: {
        backgroundColor: Tools.color.light.antiquewhite,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 25,
    },
    textMultiLines: {
        backgroundColor: Tools.color.light.antiquewhite,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 25,
        height: 250,
        width: '100%',
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
        backgroundColor: Tools.color.light.blue,
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopStartRadius: Tools.border.size.sm,
        borderTopEndRadius: Tools.border.size.sm,
    },
    modalTitleText: {
        fontSize: Tools.font.size.md,
        fontWeight: 'bold',
        color: Tools.color.light.antiquewhite,
    },
    modalContent: {
        backgroundColor: Tools.color.light.antiquewhite,
    },
    modalContentText: {
        backgroundColor: Tools.color.light.antiquewhite,
        color: Tools.color.black,
        fontSize: Tools.font.size.sm,
        paddingVertical: 25,
        paddingHorizontal: 12.5,
        fontWeight: 'bold',
    },
    modalClose: {
        backgroundColor: Tools.color.light.grey,
        padding: 10,
        alignItems: 'flex-end',
    },
    modalCloseText: {
        backgroundColor: Tools.color.black,
        color: Tools.color.light.antiquewhite,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: Tools.border.size.sm,
        textTransform: 'uppercase',
    },
});

export default ContactScreen;
