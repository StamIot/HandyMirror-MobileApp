// Dépendances
import { useState, useEffect } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, Pressable, Image, FlatList, Switch, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Styles
import * as Utilities from '../src/utilities/utilities';

// Remplace dotenv
import Config from '../config/config';

const ProfileScreen = ({ photoUri }) => {
    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        firstname: '',
        modules: [],
    });
    const [infoModalVisible, setInfoModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID');
                const AsyncStorageGetFirstname = await AsyncStorage.getItem('userData');
                const { firstname: AsyncStorageFirstnameParse } = JSON.parse(AsyncStorageGetFirstname);
                // console.log(AsyncStorageFirstnameParse);

                const CheckUserExist = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_SERVER_API}/api/v1/users/${userID}`);
                const userFound = await CheckUserExist.json();

                if (userFound) {
                    const { firstname: firstnameJSON, modules: modulesJSON } = userFound.users;
                    //console.log(firstnameJSON, modulesJSON);

                    const clockModuleResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_SERVER_API}/api/v1/modules/64d8df7226bb4f951331e3f2`);
                    const clockJson = await clockModuleResponse.json();

                    const medicationReminderResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_SERVER_API}/api/v1/modules/64d8e2c75a4e966a9c7782bd`);
                    const medicationReminderJson = await medicationReminderResponse.json();

                    const openmapWeatherResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_SERVER_API}/api/v1/modules/64d8e2ca5a4e966a9c7782c0`);
                    const openmapWeatherJson = await openmapWeatherResponse.json();

                    const tdaResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_SERVER_API}/api/v1/modules/64d8e2cc5a4e966a9c7782c3`);
                    const tdaJson = await tdaResponse.json();

                    setUserData({
                        ...userData,
                        firstname: firstnameJSON || AsyncStorageFirstnameParse,
                        modules: [clockJson.modules, medicationReminderJson.modules, openmapWeatherJson.modules, tdaJson.modules],
                    });
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();

        if (route.params?.refresh) {
            setLoading(true);
            setTimeout(() => {
                route.params.refresh = false; // Ne changez pas directement cette valeur, utilisez plutôt un nouveau paramètre
                fetchData(); // Refetch data after the specified time
            }, 1000);
        }
    }, [route.params?.refresh]);

    const toggleSwitch = (id) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            modules: prevUserData.modules.map((item) => (item._id === id ? { ...item, activated: !item.activated } : item)),
        }));
    };

    return (
        <View style={styles.profileContainer}>
            {/* CERCLES */}
            <View style={styles.circlesContainer}>
                <View style={[styles.circle, styles.circleOne]}></View>
                <View style={[styles.circle, styles.circleTwo]}></View>
            </View>

            {loading ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={photoUri ? { uri: photoUri } : require('../assets/images/loader.gif')}
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 100,
                            backgroundColor: 'transparent',
                        }}
                    />
                </View>
            ) : (
                <>
                    {/* Accueil */}
                    <View style={styles.messageContainer}>
                        <Image style={styles.avatar} source={require('../assets/images/Default_UserProfilePicture1.png')} />
                        <Text style={styles.message}>{`Hi ${userData.firstname}, `}</Text>
                        <Pressable style={styles.goEditProfil} onPress={() => navigation.navigate('EditInformationScreen')}>
                            <View style={styles.iconContainer}>
                                <FontAwesome name="user-circle-o" size={24} color={Utilities.color.light.green} />
                            </View>
                        </Pressable>
                    </View>

                    {/* Un message */}
                    <View style={styles.textWhiteContainer}>
                        <Text style={styles.messageTextWhite}>Que souhaitez vous laissez apparaître sur votre HandyMirror ?</Text>
                    </View>

                    {/* Liste des éléments de la liste */}
                    <View style={styles.list}>
                        {loading ? (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    source={photoUri ? { uri: photoUri } : require('../assets/images/loader.gif')}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 100,
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </View>
                        ) : (
                            <FlatList
                                data={userData.modules}
                                renderItem={({ item }) => (
                                    <View style={styles.listItem}>
                                        <View style={{ width: '80%' }}>
                                            <Text style={styles.listItemName}>{item.name}</Text>
                                            <Text>{item.description}</Text>
                                        </View>
                                        <View style={{ width: '20%' }}>
                                            <Switch value={item.activated} onValueChange={() => toggleSwitch(item._id)} />
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item) => item._id}
                            />
                        )}
                    </View>

                    {/* Pas de compte s'enregistrer */}
                    <View style={styles.optionsContainer}>
                        <Pressable style={styles.goSettings} onPress={() => navigation.navigate('SettingsScreen')}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="settings-outline" size={24} color="black" />
                            </View>
                        </Pressable>

                        <Pressable style={styles.btn} onPress={() => setInfoModalVisible(true)}>
                            <Ionicons name="add" size={24} color={Utilities.color.light.antiquewhite} />
                        </Pressable>
                    </View>

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
                </>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    profileContainer: {
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

    /**
     *
     */
    messageContainer: {
        marginTop: '15%',
        flexDirection: 'row',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 20,
        marginLeft: 20,
    },
    message: {
        textAlign: 'center',
        fontFamily: Utilities.font.family.urbanist.regular,
        fontSize: Utilities.font.size.xxl,
        color: Utilities.color.light.antiquewhite,
        paddingTop: 20,
    },
    goEditProfil: {
        position: 'absolute',
        right: 30,
        top: 0,
    },

    /**
     * MESSAGE SUR LE CHOIX DES MODULES
     */
    textWhiteContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    messageTextWhite: {
        color: Utilities.color.light.antiquewhite,
        fontSize: Utilities.font.size.xl,
        textAlign: 'center',
        marginTop: 20,
    },

    /**
     * LISTE DES MODULES
     */
    list: {
        padding: 15,
    },
    listItem: {
        backgroundColor: Utilities.color.light.antiquewhite,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
    },
    listItemName: {
        fontWeight: '700',
        fontSize: Utilities.font.size.lg,
        color: Utilities.color.light.green,
    },
    optionsContainer: {
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: Utilities.color.light.grey,
        padding: 8,
        borderRadius: 50,
    },

    goSettings: {
        position: 'absolute',
        right: 30,
        bottom: -15,
    },

    /**
     * BUTTON
     */
    btn: {
        backgroundColor: Utilities.color.light.green,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: '2%',
        borderRadius: Utilities.border.round,
    },
    btnText: {
        color: Utilities.color.light.antiquewhite,
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

export default ProfileScreen;