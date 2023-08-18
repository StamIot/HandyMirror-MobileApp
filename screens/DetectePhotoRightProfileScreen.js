// Dépendances
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// Utilitaire
import * as Utilities from '../src/utilities/utilities';

const DetectePhotoRightProfileScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.DetectePhotoRightProfileScreenContainer}>
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
                <Text style={styles.title}>Prise 3/3</Text>
            </View>

            {/* Options */}
            <View style={styles.faceIDContainer}>
                <Text style={{ color: Utilities.color.light.antiquewhite }}>Veuillez vous tenir de profile devant la caméra pour prendre votre côté droit.</Text>
                <Text style={{ color: Utilities.color.light.antiquewhite, marginBottom: '20%' }}>s'il vous plait.</Text>

                {/* DETECTION */}
                <View style={styles.bgcDetection}>
                    <MaterialCommunityIcons style={styles.bgcDetectorIcon} name="face-recognition" size={150} color={Utilities.color.light.antiquewhite} />
                </View>
            </View>

            {/* BTN */}
            <View style={styles.lastContainer}>
                <Pressable style={styles.btn} onPress={() => navigation.navigate('DetectePhotoStatusScreen')}>
                    <Text style={styles.btnText}>Démarrer la détection</Text>
                </Pressable>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    DetectePhotoRightProfileScreenContainer: {
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
        marginVertical: 40,
        marginHorizontal: 20,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textContainer: {
        color: Utilities.color.light.antiquewhite,
        paddingBottom: 25,
        paddingHorizontal: 20,
    },
    bgcDetection: {
        backgroundColor: Utilities.color.light.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 150,
        height: 300,
        width: 300,
    },

    /**
     * BUTTON
     */
    btn: {
        backgroundColor: Utilities.color.light.grey,
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginTop: '10%',
        borderRadius: Utilities.border.sm,
        width: '70%',
        alignSelf: 'center',
    },
    btnText: {
        color: Utilities.color.black,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DetectePhotoRightProfileScreen;
