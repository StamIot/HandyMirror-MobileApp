// Dépendances
import { StyleSheet, View, Text, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Styles
import { Color, FontFamily, FontSize } from '../GlobalStyles'

// Composants Créer
import TextInputExample from '../Component/TextInput'

const CustomizeScreen = () => {
    const navigation = useNavigation()

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
                    <Text style={styles.message}>{`Hi Sophie, `}</Text>
                </View>

                {/* Pas de compte s'enregistrer */}
                <View style={styles.notAccountContainer}>
                    <Pressable
                        style={styles.vousNavezPasContainer}
                        onPress={() => navigation.navigate('SettingsScreen')}
                    >
                        <View style={styles.textContainer}>
                            <View style={styles.textWhiteContainer}>
                                <Text style={styles.textWhite}>Settings</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        </>
    )
}

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
})

export default CustomizeScreen
