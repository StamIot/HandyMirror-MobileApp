// Dépendances
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { useState } from 'react'

// Styles
import { Color, FontFamily } from '../GlobalStyles'

// DATA
const DATA = {
    fullName: 'Sophie Favier',
    surName: 'Soso',
    email: 'yourEmail@domain.com',
    phone: '0669696969',
    country: 'France',
    genre: 'Femme',
    address: '236 rue de Merlan',
    jobAddress: '78, route de Paris',
    compagnonName: 'Edouard',
    children: 'Sheyene',
}

const EditProfileScreen = () => {
    const navigation = useNavigation()

    const [contentForm, setContentForm] = useState({ ...DATA })

    return (
        <>
            {/* SCREEN N°6 */}
            <View style={styles.screen6}>
                {/* CERCLES */}
                <View style={styles.circlesContainer}>
                    <View style={[styles.circle, styles.circleOne]}></View>
                    <View style={[styles.circle, styles.circleTwo]}></View>
                </View>

                {/* Ajouter votre photo */}
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
                    <Pressable
                        style={styles.goBack}
                        onPress={() => navigation.goBack()}
                    >
                        <View style={styles.photoCircleContainer}>
                            <Text style={styles.photoCircleText}>
                                {'Ajouter votre photos'}
                            </Text>
                        </View>
                    </Pressable>
                </View>

                {/* Formulaire */}
                <View style={styles.formulaireContainer}>
                    {/* FullName */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>
                            Nom entier
                        </Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={'à éditer'}
                            value=""
                            placeholder={contentForm.fullName}
                        />
                    </View>

                    {/* SurName */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Surnom</Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={'à éditer'}
                            value=""
                            placeholder={contentForm.surName}
                        />
                    </View>

                    {/* Email */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>
                            Adresse Email
                        </Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={'à éditer'}
                            value=""
                            placeholder={contentForm.email}
                        />
                    </View>

                    {/* phone */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>
                            téléphone
                        </Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={'à éditer'}
                            value=""
                            placeholder={contentForm.phone}
                        />
                    </View>

                    {/* Country + Genre */}
                    <View
                        style={{
                            flex: 0.4,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Country */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { marginRight: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Pays
                            </Text>
                            <TextInput
                                style={styles.inputTextSaisie}
                                onChangeText={'à éditer'}
                                value=""
                                placeholder={contentForm.country}
                            />
                        </View>

                        {/* Genre */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { marginLeft: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Genre
                            </Text>
                            <TextInput
                                style={styles.inputTextSaisie}
                                onChangeText={'à éditer'}
                                value=""
                                placeholder={contentForm.genre}
                            />
                        </View>
                    </View>

                    {/* Address */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>Adresse</Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={'à éditer'}
                            value=""
                            placeholder={contentForm.address}
                        />
                    </View>

                    {/* JobAddress */}
                    <View style={styles.inputTextContainer}>
                        <Text style={styles.inputTextPlaceholder}>
                            Lieu de travail
                        </Text>
                        <TextInput
                            style={styles.inputTextSaisie}
                            onChangeText={'à éditer'}
                            value=""
                            placeholder={contentForm.jobAddress}
                        />
                    </View>

                    {/* Compagnon Name */}
                    <View
                        style={{
                            flex: 0.4,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Compagnon Name */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { marginRight: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Nom du compagnon de vie
                            </Text>
                            <TextInput
                                style={styles.inputTextSaisie}
                                onChangeText={'à éditer'}
                                value=""
                                placeholder={contentForm.compagnonName}
                            />
                        </View>

                        {/* Children */}
                        <View
                            style={[
                                styles.inputTextContainer,
                                styles.inputSmallTextContainer,
                                { marginLeft: 5 },
                            ]}
                        >
                            <Text style={styles.inputTextPlaceholder}>
                                Avez-vous des enfants
                            </Text>
                            <TextInput
                                style={styles.inputTextSaisie}
                                onChangeText={'à éditer'}
                                value=""
                                placeholder={contentForm.children}
                            />
                        </View>
                    </View>

                    <Pressable
                        style={styles.btnLogin}
                        onPress={() => navigation.navigate('CustomizeScreen')}
                    >
                        <Text style={styles.btnLoginColor}>Enregistrer</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    screen6: {
        flex: 1,
        backgroundColor: Color.dimgray,
    },
    circlesContainer: {
        flex: 0.05,
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
        marginTop: 25,
    },
    photoCircleContainer: {
        backgroundColor: Color.cadetblue_100,
        padding: 10,
        borderRadius: 100,
        width: 160,
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 50,
    },
    photoCircleText: {
        backgroundColor: Color.antiquewhite,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        width: '100%',
        borderRadius: 100,
        fontSize: 18,
        fontWeight: '700',
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
    formulaireContainer: {
        flex: 0.8,
        padding: 20,
        marginTop: 15,
    },
    inputTextContainer: {
        backgroundColor: Color.snow_100,
        padding: 4,
        paddingLeft: 12,
        borderRadius: 5,
        marginBottom: 10,
    },
    inputSmallTextContainer: {
        flex: 1,
    },
    inputTextPlaceholder: {
        fontSize: 12,
        color: Color.gray_400,
    },
    inputTextSaisie: {
        fontSize: 15,
    },
    btnLogin: {
        backgroundColor: Color.antiquewhite,
        width: '100%',
        padding: 12,
        borderRadius: 8,
    },
    btnLoginColor: {
        color: Color.dimgray,
        fontWeight: '700',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
})

export default EditProfileScreen
