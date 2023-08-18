// Dépendances
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// Utilitaire
import * as Utilities from '../src/utilities/utilities';

const DetectePhotoStatusScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.DetectePhotoStatusScreenContainer}>
            {/* CERCLES */}
            <View style={styles.circlesContainer}>
                <View style={[styles.circle, styles.circleOne]}></View>
                <View style={[styles.circle, styles.circleTwo]}></View>
            </View>

            {/* FaceID */}
            <View style={styles.titleContainer}>
                <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
                    <View style={styles.iconContainer}>
                        <Entypo name="arrow-with-circle-left" size={64} color={Utilities.color.dark.green} />
                    </View>
                </Pressable>
                <Text style={styles.title}>Statut Photo</Text>
            </View>

            {/* Options */}
            <View style={styles.faceIDContainer}>
                <Text style={{ color: Utilities.color.light.antiquewhite, marginBottom: '20%' }}>Vous trouverez ci-dessous un ensemble de photo prise qui seront analysé par votre miroir afin de vous détecter.</Text>

                {/* DETECTION */}
                <View style={styles.bgcDetection}>
                    <Text style={{ color: Utilities.color.light.antiquewhite, marginBottom: '10%', alignSelf: 'center' }}>IMAGE 1 à éditer</Text>
                    <Text style={{ color: Utilities.color.light.antiquewhite, marginBottom: '10%', alignSelf: 'center' }}>IMAGE 2 à éditer</Text>
                    <Text style={{ color: Utilities.color.light.antiquewhite, marginBottom: '10%', alignSelf: 'center' }}>IMAGE 3 à éditer</Text>
                </View>
            </View>

            {/* BTN */}
            <View style={styles.btnContainer}>
                <Pressable style={styles.btn} onPress={() => navigation.navigate('DetectePhotoFaceScreen')}>
                    <Text style={styles.btnText}>Démarrer</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => navigation.navigate('DetectePhotoFaceScreen')}>
                    <Text style={styles.btnText}>Recommencer</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    DetectePhotoStatusScreenContainer: {
        flex: 1,
        backgroundColor: Utilities.color.black,
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

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 60,
    },
    title: {
        fontFamily: 'Urbanist Medium',
        fontSize: 35,
        color: Utilities.color.light.antiquewhite,
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
        backgroundColor: Utilities.color.light.grey,
        padding: 5,
        borderRadius: 50,
    },
    faceIDContainer: {
        marginVertical: 20,
        marginHorizontal: 20,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textContainer: {
        color: Utilities.color.light.antiquewhite,
        paddingBottom: 15,
        paddingHorizontal: 10,
    },
    bgcDetection: {
        backgroundColor: Utilities.color.light.green,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 350,
    },

    /**
     * BUTTON
     */
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: '10%',
    },
    btn: {
        flex: 0.4,
        backgroundColor: Utilities.color.light.grey,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: '10%',
        borderRadius: Utilities.border.sm,
        alignSelf: 'center',
    },
    btnText: {
        color: Utilities.color.black,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DetectePhotoStatusScreen;
