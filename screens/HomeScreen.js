/**
 * Créer le : 17/05/2023
 * Mis à jour le : 20/08/2023
 * Author: Majorel Sophie
 * Version: 1.0.0
 * ------------------------------------------------------------------------------------------------------------
 * Ajout du commentaire
 */

// Dépendances
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Fonts
// import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';

// Utilitaire
import Tools from '../tools'; // charge index.js

// Screens
import UserProfilePicture from '../Component/UserProfilePicture';

const HomeScreen = () => {
    // let [fontsLoaded] = useFonts({
    //     'Roboto Regular': require('../assets/fonts/Roboto Regular.ttf'),
    //     'Urbanist ExtraBold': require('../assets/fonts/Urbanist ExtraBold.ttf'),
    //     'Urbanist Medium': require('../assets/fonts/Urbanist Medium.ttf'),
    // });

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }

    const navigation = useNavigation();
    const [isFirstConnection, setIsFirstConnection] = useState(true);
    const [userName, setUserName] = useState('Toi'); // remplacez "Toi" par le nom d'utilisateur réel
    const [modules, setModules] = useState([]);

    const handleConnection = () => {
        setIsFirstConnection(false);
    };

    const greetingMessage = isFirstConnection
        ? `Bonjour, ${userName} !`
        : `Rebonjour, ${userName} !`;

    const getModules = async () => {
        try {
            console.log('ici');
            const response = await axios.get(
                'http://127.0.0.1:8080/api/module',
            );
            setModules(response.data);
        } catch (error) {
            console.log('la');
            console.error(error);
        }
    };

    useEffect(() => {
        getModules();
    }, []);

    const MagicMirrorModule = ({ name, description, enabled }) => {
        const [isEnabled, setIsEnabled] = useState(enabled);

        const toggleSwitch = async () => {
            try {
                await axios.post('http://127.0.0.1:8080/api/module' + name, {
                    enabled: !isEnabled,
                });
                setIsEnabled(!isEnabled);
            } catch (error) {
                console.error(error);
            }
        };
        return (
            <View style={styles.moduleContainer}>
                <Text style={styles.moduleName}>{name}</Text>
                <Text style={styles.moduleDescription}>{description}</Text>
                <Switch
                    style={styles.moduleSwitch}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        );
    };

    return (
        <View style={styles.background}>
            <View style={styles.circle} />
            <View style={styles.image}>
                <UserProfilePicture />
                <Text style={styles.greeting}>{greetingMessage}</Text>
            </View>
            <Text style={styles.welcomeSentence}>
                Que souhaitez vous laisser apparaître
            </Text>
            <Text style={styles.welcomeSentence2}>sur votre HandyMirror ?</Text>
            {modules.map((module, index) => (
                <MagicMirrorModule
                    key={index}
                    name={module.name}
                    description={module.description}
                    enabled={module.enabled}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: Tools.color.dark.green,
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    circle: {
        position: 'absolute',
        width: '50%',
        height: '20%',
        bottom: '90%',
        left: '-30%',
        borderRadius: '100%',
        backgroundColor: '#D9D9D9',
        opacity: 20,
    },
    image: {
        marginTop: '20%',
        marginLeft: '8%',
        flex: 0.2,
        shadowColor: Tools.color.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    greeting: {
        top: '20%',
        left: '35%',
        fontSize: Tools.font.size.xl,
        textAlign: 'left',
        color: Tools.color.light.antiquewhite,
        fontFamily: 'Urbanist ExtraBold',
        position: 'absolute',
    },
    welcomeSentence: {
        color: Tools.color.light.antiquewhite,
        textAlign: 'center',
        fontSize: Tools.font.size.xl,
    },
    welcomeSentence2: {
        color: Tools.color.light.antiquewhite,
        textAlign: 'center',
        marginBottom: '10%',
        fontSize: Tools.font.size.xl,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 16,
    },
    moduleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Tools.color.white,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        elevation: 2,
    },
    moduleName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    moduleDescription: {
        fontSize: 16,
        color: '#666',
    },
    moduleSwitch: {
        marginLeft: 16,
    },
});

export default HomeScreen;
