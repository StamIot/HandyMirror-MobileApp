import * as React from 'react'
import { StyleSheet, View, Text, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Color, Border, FontSize, FontFamily } from '../GlobalStyles'
import TextInputExample from '../Component/TextInput'

const SignUpScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.background}>
            <Text style={styles.bonjour}>{`Bonjour, `}</Text>
            <View style={styles.screen2Child}>
                <Text style={styles.welcomeSentence}>
                    Bienvenue sur HandyMirror !
                </Text>
                <Text style={styles.welcomeSentence2}>
                    Ensemble améliorons votre quotidien !
                </Text>
                <View style={styles.containerForm}>
                    <TextInputExample placeholder="Quel est votre prénom ?" />
                    <TextInputExample placeholder="Quel est votre nom ?" />
                    <TextInputExample placeholder="Quel est votre adresse mail" />
                    <TextInputExample placeholder="Saisissez un mot de passe" />
                    <TextInputExample placeholder="Resaisissez votre mot de passe" />
                    <Pressable
                        style={styles.registerButton}
                        onPress={() => navigation.navigate('CustomizeScreen')}
                    >
                        <Text
                            style={[
                                styles.senregistrer1,
                                styles.seConnecterTypo,
                            ]}
                        >
                            Senregistrer
                        </Text>
                    </Pressable>
                </View>

                <Pressable
                    style={styles.ToSignUpContainer}
                    onPress={() => navigation.navigate('SignInScreen')}
                >
                    <Text>
                        <Text
                            style={styles.FirstPart}
                        >{`On se connait déjà ? `}</Text>
                        <Text style={styles.crimson}>Se connecter</Text>
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

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
})

export default SignUpScreen
