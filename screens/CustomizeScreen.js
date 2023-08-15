// Dépendances
import { StyleSheet, View, Text, Pressable, Image, FlatList, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Styles
import { Color, FontFamily, FontSize } from '../GlobalStyles';
import Config from '../config/config';

const CustomizeScreen = ({ photoUri }) => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userData, setUserData] = useState({
        firstname: '',
        modules: [],
    });
    const [firstname, setFirstname] = useState('');
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID');
                const AsyncStorageGetFirstname = await AsyncStorage.getItem('userData');
                const { firstname: AsyncStorageFirstnameParse } = JSON.parse(AsyncStorageGetFirstname);
                // console.log(AsyncStorageFirstnameParse);

                const CheckUserExist = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_REACT_NATIVE}/api/v1/users/${userID}`);
                const userFound = await CheckUserExist.json();

                if (userFound) {
                    const { firstname: firstnameJSON, modules: modulesJSON } = userFound.users;
                    //console.log(firstnameJSON, modulesJSON);

                    const clockModuleResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_REACT_NATIVE}/api/v1/modules/64d8df7226bb4f951331e3f2`);
                    const clockJson = await clockModuleResponse.json();

                    const medicationReminderResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_REACT_NATIVE}/api/v1/modules/64d8e2c75a4e966a9c7782bd`);
                    const medicationReminderJson = await medicationReminderResponse.json();

                    const openmapWeatherResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_REACT_NATIVE}/api/v1/modules/64d8e2ca5a4e966a9c7782c0`);
                    const openmapWeatherJson = await openmapWeatherResponse.json();

                    const tdaResponse = await fetch(`http://${Config.IP_LOCAL_REACT_NATIVE}:${Config.PORT_REACT_NATIVE}/api/v1/modules/64d8e2cc5a4e966a9c7782c3`);
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
        <>
            {/* SCREEN N°4 */}
            <View style={styles.screen4}>
                {/* CERCLES */}
                <View style={styles.circlesContainer}>
                    <View style={[styles.circle, styles.circleOne]}></View>
                    <View style={[styles.circle, styles.circleTwo]}></View>
                </View>

                {loading ? (
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={photoUri ? { uri: photoUri } : require('../assets/loader.gif')}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100,
                                backgroundColor: 'transparent',
                            }}
                        />
                    </View>
                ) : (
                    <>
                        {/* Accueil */}
                        <View style={styles.messageContainer}>
                            <Image style={styles.avatar} source={require('../assets/Default_UserProfilePicture1.png')} />
                            <Text style={styles.message}>{`Hi ${userData.firstname}, `}</Text>
                            <Pressable style={styles.goEditProfil} onPress={() => navigation.navigate('EditProfileScreen')}>
                                <View style={styles.iconContainer}>
                                    <FontAwesome name="user-circle-o" size={24} color={Color.dimgray} />
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
                                        source={photoUri ? { uri: photoUri } : require('../assets/loader.gif')}
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

                            <Pressable
                                style={styles.btnLogin}
                                onPress={() => {
                                    console.log('à éditer');
                                    {
                                        /* navigation.navigate('AddModuleScreen') */
                                    }
                                }}
                            >
                                <Text style={styles.btnLoginColor}>Voir plus</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    screen4: {
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
        fontFamily: FontFamily.urbanistRegular,
        fontSize: FontSize.size_21xl,
        color: Color.antiquewhite,
        paddingTop: 20,
    },
    goEditProfil: {
        position: 'absolute',
        right: 20,
        top: -15,
    },
    textWhiteContainer: {
        flex: 0.1,
    },
    messageTextWhite: {
        color: Color.antiquewhite,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
    },
    list: {
        flex: 0.7,
        padding: 15,
    },
    listItem: {
        backgroundColor: Color.antiquewhite,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        marginTop: 20,
        borderRadius: 5,
    },
    listItemName: {
        fontWeight: '700',
        fontSize: 16,
        color: Color.dimgray,
    },
    optionsContainer: {
        flex: 0.1,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: Color.gray_600,
        padding: 5,
        borderRadius: 50,
    },
    goSettings: {
        position: 'absolute',
        right: 20,
        bottom: 15,
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
        fontSize: 18,
    },
});

export default CustomizeScreen;
