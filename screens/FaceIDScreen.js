// Dépendances
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'

// Styles
import { Color, FontFamily } from '../GlobalStyles'

const FaceIDScreen = () => {
    const navigation = useNavigation()

    return (
        <>
            {/* SCREEN N°9 */}
            <View style={styles.screen9}>
                {/* CERCLES */}
                <View style={styles.circlesContainer}>
                    <View style={[styles.circle, styles.circleOne]}></View>
                    <View style={[styles.circle, styles.circleTwo]}></View>
                </View>

                {/* FaceID */}
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
                    <Text style={styles.title}>{'FaceID'}</Text>
                </View>

                {/* Options */}
                <View style={styles.faceIDContainer}>
                    <Text style={styles.textContainer}>
                        Positionnez votre visage en face de la caméra. Puis
                        bougez doucement votre tête en cercle pour montrer toute
                        les faces de votre visage s'il vous plait.
                    </Text>

                    {/* DETECTION */}
                    <View style={styles.bgcDetection}>
                        <MaterialCommunityIcons
                            style={styles.bgcDetectorIcon}
                            name="face-recognition"
                            size={150}
                            color={Color.antiquewhite}
                        />
                    </View>
                </View>

                {/* BTN */}

                <View style={styles.lastContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: Color.gray_100,
                                fontWeight: '100',
                                fontStyle: 'italic',
                                marginRight: 10,
                            }}
                        >
                            Configurer plus tard ?{' '}
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: Color.antiquewhite,
                                fontWeight: '700',
                            }}
                        >
                            Cliquer ici
                        </Text>
                    </View>
                    <Pressable
                        style={styles.btnLogin}
                        onPress={() => navigation.navigate('CustomizeScreen')}
                    >
                        <Text style={styles.btnLoginColor}>
                            Démarrer la détection
                        </Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    screen9: {
        flex: 1,
        backgroundColor: Color.black,
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
        fontSize: 40,
        color: Color.antiquewhite,
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
        backgroundColor: Color.dimgrayLigth,
        padding: 5,
        borderRadius: 50,
    },
    faceIDContainer: {
        flex: 0.6,
        margin: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        color: Color.antiquewhite,
        paddingBottom: 25,
    },
    bgcDetection: {
        backgroundColor: Color.dimgray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 150,
        height: 300,
        marginBottom: 40,
        width: 300,
    },
    lastContainer: {
        flex: 0.2,
        padding: 40,
    },
    btnLogin: {
        backgroundColor: Color.antiquewhite,
        width: '100%',
        padding: 24,
        borderRadius: 8,
    },
    btnLoginColor: {
        color: Color.dimgray,
        fontWeight: '700',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 16,
    },
})

export default FaceIDScreen
