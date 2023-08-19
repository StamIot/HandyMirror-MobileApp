// Dépendances
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    Entypo,
    AntDesign,
    Ionicons,
    MaterialCommunityIcons,
    Feather,
} from '@expo/vector-icons';
import { useState } from 'react';

// Utilitaire
import Tools from '../utilities/Tools'; // charge index.js

const SettingsScreen = () => {
    const navigation = useNavigation();

    const [onNotification, setOnNotification] = useState(false);
    const [lightMode, setLightMode] = useState(true);
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    return (
        <View style={styles.SettingsScreenContainer}>
            {/* CERCLES */}
            <View style={styles.circlesContainer}>
                <View style={[styles.circle, styles.circleOne]}></View>
                <View style={[styles.circle, styles.circleTwo]}></View>
            </View>

            {/* Réglages */}
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
                <Text style={styles.title}>{'Réglages'}</Text>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
                {/* PARTIE 1 */}
                <View
                    style={[styles.whiteContainer, styles.containerTwoElements]}
                >
                    <Pressable
                        onPress={() =>
                            navigation.navigate('EditInformationScreen')
                        }
                    >
                        <View style={styles.item}>
                            <AntDesign
                                name="idcard"
                                size={24}
                                color={Tools.color.dark.green}
                                style={styles.itemIcon}
                            />
                            <Text>Changer les informations du profil</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        style={styles.textChange}
                        onPress={() => {
                            setOnNotification(!onNotification);
                            setInfoModalVisible(true);
                        }}
                    >
                        <View style={styles.item}>
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color={Tools.color.dark.green}
                                style={styles.itemIcon}
                            />
                            <View style={styles.itemThreeElements}>
                                <Text>Notification</Text>
                                <Text style={styles.textChange}>
                                    {onNotification == true ? 'on' : 'off'}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                </View>

                {/* PARTIE 2 */}
                <View
                    style={[styles.whiteContainer, styles.containerTwoElements]}
                >
                    <Pressable
                        onPress={() => {
                            navigation.navigate('DetectePhotoStatusScreen');
                        }}
                    >
                        <View style={styles.item}>
                            <MaterialCommunityIcons
                                name="face-recognition"
                                size={24}
                                color={Tools.color.dark.green}
                                style={styles.itemIcon}
                            />
                            <Text>Reconnaissance faciale</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        style={styles.textChange}
                        onPress={() => {
                            setLightMode(!lightMode), setInfoModalVisible(true);
                        }}
                    >
                        <View style={styles.item}>
                            <MaterialCommunityIcons
                                name="theme-light-dark"
                                size={24}
                                color={Tools.color.dark.green}
                                style={styles.itemIcon}
                            />
                            <View style={styles.itemThreeElements}>
                                <Text>Thème</Text>
                                <Text style={styles.textChange}>
                                    {lightMode == true
                                        ? 'Light Mode'
                                        : 'Dark Mode'}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                </View>

                {/* PARTIE 3 */}
                <View
                    style={[
                        styles.whiteContainer,
                        styles.containerThreeElements,
                    ]}
                >
                    <Pressable
                        onPress={() => {
                            navigation.navigate('HelpScreen'),
                                setInfoModalVisible(true);
                        }}
                    >
                        <View style={styles.item}>
                            <Feather
                                name="help-circle"
                                size={24}
                                color={Tools.color.dark.green}
                                style={styles.itemIcon}
                            />
                            <Text>Help & Support</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('ContactScreen')}
                    >
                        <View style={styles.item}>
                            <AntDesign
                                name="contacts"
                                size={24}
                                color={Tools.color.dark.green}
                                style={styles.itemIcon}
                            />
                            <Text>Contactez-nous</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('RGPDScreen')}
                    >
                        <View style={styles.item}>
                            <AntDesign
                                name="lock1"
                                size={24}
                                color={Tools.color.dark.green}
                                style={styles.itemIcon}
                            />
                            <Text>RGPD</Text>
                        </View>
                    </Pressable>
                </View>
            </View>

            {/* Modal Informative */}
            <Modal visible={infoModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleText}>Information</Text>
                    </View>
                    <View style={styles.modalContentText}>
                        <Text style={styles.modalContentText}>
                            Désolé, cette feature est à développer..
                        </Text>
                    </View>
                    <View style={styles.modalClose}>
                        <Pressable onPress={() => setInfoModalVisible(false)}>
                            <Text style={styles.modalCloseText}>Fermer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    SettingsScreenContainer: {
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
        fontSize: 50,
        color: Tools.color.light.antiquewhite,
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
    optionsContainer: {
        margin: 25,
    },

    whiteContainer: {
        backgroundColor: Tools.color.light.antiquewhite,
        width: '100%',
        marginVertical: 25,
        borderRadius: Tools.border.size.sm,
        padding: 25,
    },
    containerTwoElements: {
        height: 125,
    },
    containerThreeElements: {
        height: 175,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemIcon: {
        marginRight: 10,
    },
    itemThreeElements: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    textChange: {
        color: Tools.color.dark.green,
        fontWeight: '700',
        textTransform: 'uppercase',
        fontSize: 18,
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

export default SettingsScreen;
