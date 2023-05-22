// Dépendances
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
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

const ContactScreen = () => {
    const navigation = useNavigation()
    const [value, onChangeText] = useState('')

    return (
        <>
            {/* SCREEN N°7 */}
            <View style={styles.screen7}>
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
                                color={Color.dimgray}
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
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
                        placeholder="Racontez nous votre histoire ou posez nous une question."
                        style={[styles.textOneLine, styles.textMultiLines]}
                    />

                    {/* BTN */}
                    <Pressable
                        style={styles.btnLogin}
                        onPress={() => navigation.navigate('CustomizeScreen')}
                    >
                        <Text style={styles.btnLoginColor}>Envoyer</Text>
                    </Pressable>
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
        flex: 0.2,
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
        backgroundColor: Color.gray_600,
        padding: 5,
        borderRadius: 50,
    },
    contactContainer: {
        flex: 0.7,
        margin: 40,
    },
    textContainer: {
        color: Color.antiquewhite,
        paddingBottom: 25,
    },
    textOneLine: {
        backgroundColor: Color.dimgrayLigth,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 25,
    },
    textMultiLines: {
        backgroundColor: Color.dimgrayLigth,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 25,
        flex: 2,
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
    },
})

export default ContactScreen
