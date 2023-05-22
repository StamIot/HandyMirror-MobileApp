// Dépendances
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
    Entypo,
    AntDesign,
    Ionicons,
    MaterialCommunityIcons,
    Feather,
} from '@expo/vector-icons'
import { useState } from 'react'

// Styles
import { Color, FontFamily } from '../GlobalStyles'

const settingsScreen = () => {
    const navigation = useNavigation()
    const [onNotification, setOnNotification] = useState(false)
    const [lightMode, setLightMode] = useState(true)

    return (
        <>
            {/* SCREEN N°7 */}
            <View style={styles.screen7}>
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
                                color={Color.dimgray}
                            />
                        </View>
                    </Pressable>
                    <Text style={styles.title}>{'Réglages'}</Text>
                </View>

                {/* Options */}
                <View style={styles.optionsContainer}>
                    {/* PARTIE 1 */}
                    <View
                        style={[
                            styles.whiteContainer,
                            styles.containerTwoElements,
                        ]}
                    >
                        <Pressable
                            onPress={() =>
                                navigation.navigate('EditProfileScreen')
                            }
                        >
                            <View style={styles.item}>
                                <AntDesign
                                    name="idcard"
                                    size={24}
                                    color={Color.dimgray}
                                    style={styles.itemIcon}
                                />
                                <Text>Changer les informations du profil</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            style={styles.textChange}
                            onPress={() => setOnNotification(!onNotification)}
                        >
                            <View style={styles.item}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={24}
                                    color={Color.dimgray}
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
                        style={[
                            styles.whiteContainer,
                            styles.containerTwoElements,
                        ]}
                    >
                        <Pressable
                            onPress={() => navigation.navigate('FaceIDScreen')}
                        >
                            <View style={styles.item}>
                                <MaterialCommunityIcons
                                    name="face-recognition"
                                    size={24}
                                    color={Color.dimgray}
                                    style={styles.itemIcon}
                                />
                                <Text>Reconnaissance faciale</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            style={styles.textChange}
                            onPress={() => setLightMode(!lightMode)}
                        >
                            <View style={styles.item}>
                                <MaterialCommunityIcons
                                    name="theme-light-dark"
                                    size={24}
                                    color={Color.dimgray}
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
                            onPress={() => navigation.navigate('HelpScreen')}
                        >
                            <View style={styles.item}>
                                <Feather
                                    name="help-circle"
                                    size={24}
                                    color={Color.dimgray}
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
                                    color={Color.dimgray}
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
                                    color={Color.dimgray}
                                    style={styles.itemIcon}
                                />
                                <Text>RGPD</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    screen7: {
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
    titleContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontFamily: FontFamily.urbanistRegular,
        fontSize: 50,
        color: Color.antiquewhite,
    },
    goBack: {
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        backgroundColor: Color.gray_600,
        padding: 5,
        borderRadius: 50,
    },
    optionsContainer: {
        flex: 0.9,
        margin: 25,
    },
    whiteContainer: {
        backgroundColor: Color.antiquewhite,
        width: '100%',
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 5,
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
        color: Color.cadetblue_100,
        fontWeight: '700',
        textTransform: 'uppercase',
        fontSize: 18,
    },
})

export default settingsScreen
