// Dépendances
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, View, Text, Pressable, TextInput, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Utilitaires
import { Color, FontFamily } from '../GlobalStyles';
import * as Utilities from '../src/utilities/utilities';

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
                <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
                    <View style={styles.iconContainer}>
                        <Entypo name="arrow-with-circle-left" size={64} color={Color.dimgray} />
                    </View>
                </Pressable>
                <View>
                    <Text style={styles.title}>{'Contactez'}</Text>
                    <Text style={styles.title}>{'Nous'}</Text>
                </View>
            </View>

            {/* Options */}
            <View style={styles.contactContainer}>
                <Text style={styles.textContainer}>Posez nous vos questions, nous vous répondrons sous peu.</Text>

                {/* Nom */}
                <TextInput style={styles.textOneLine} placeholder="Nom: exemple 'patrick'" />

                {/* Email */}
                <TextInput style={styles.textOneLine} placeholder="Email: ex 'patpat@gmail.com'" />

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
                <Pressable style={styles.btn} onPress={() => setInfoModalVisible(true)}>
                    <Text style={styles.btnText}>Envoyer</Text>
                </Pressable>

                {/* Modal Informative */}
                <Modal visible={infoModalVisible} animationType="slide" transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>Information</Text>
                        </View>
                        <View style={styles.modalContentText}>
                            <Text style={styles.modalContentText}>Désolé, cette feature est à développer..</Text>
                        </View>
                        <View style={styles.modalClose}>
                            <Pressable onPress={() => setInfoModalVisible(false)}>
                                <Text style={styles.modalCloseText}>Fermer</Text>
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
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 40,
        color: Utilities.color.light.antiquewhite,
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
        backgroundColor: Utilities.color.light.grey,
        padding: 5,
        borderRadius: 50,
    },
    contactContainer: {
        margin: 20,
    },
    textContainer: {
        color: Utilities.color.light.antiquewhite,
        paddingBottom: 25,
    },
    textOneLine: {
        backgroundColor: Utilities.color.light.antiquewhite,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 25,
    },
    textMultiLines: {
        backgroundColor: Utilities.color.light.antiquewhite,
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
        backgroundColor: Utilities.color.light.blue,
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

export default ContactScreen;
