// Dépendances
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// Utilitaire
import Tools from '../utilities/Tools'; // charge index.js

const DetectePhotoLeftProfileScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.DetectePhotoLeftProfileScreenContainer}>
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
                            color={Tools.color.dark.green}
                        />
                    </View>
                </Pressable>
                <Text style={styles.title}>Prise 2/3</Text>
            </View>

            {/* Options */}
            <View style={styles.faceIDContainer}>
                <Text style={{ color: Tools.color.light.antiquewhite }}>
                    Veuillez vous tenir de profile devant la caméra pour prendre
                    votre côté gauche.
                </Text>
                <Text
                    style={{
                        color: Tools.color.light.antiquewhite,
                        marginBottom: '20%',
                    }}
                >
                    s'il vous plait.
                </Text>

                {/* DETECTION */}
                <View style={styles.bgcDetection}>
                    <MaterialCommunityIcons
                        style={styles.bgcDetectorIcon}
                        name="face-recognition"
                        size={150}
                        color={Tools.color.light.antiquewhite}
                    />
                </View>
            </View>

            {/* BTN */}
            <View style={styles.lastContainer}>
                <Pressable
                    style={styles.btn}
                    onPress={() =>
                        navigation.navigate('DetectePhotoRightProfileScreen')
                    }
                >
                    <Text style={styles.btnText}>Photo côté gauche</Text>
                </Pressable>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    DetectePhotoLeftProfileScreenContainer: {
        flex: 1,
        backgroundColor: Tools.color.black,
    },

    /**
     * CIRCLES
     */
    circlesContainer: {
        backgroundColor: Tools.color.light.antiquewhite,
    },
    circle: {
        opacity: 0.8,
        width: 100,
        height: 100,
        backgroundColor: Tools.color.light.antiquewhite,
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
        color: Tools.color.light.antiquewhite,
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
        backgroundColor: Tools.color.light.grey,
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
        color: Tools.color.light.antiquewhite,
        paddingBottom: 25,
        paddingHorizontal: 20,
    },
    bgcDetection: {
        backgroundColor: Tools.color.light.green,
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
        backgroundColor: Tools.color.light.grey,
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginTop: '10%',
        borderRadius: Tools.border.size.sm,
        width: '70%',
        alignSelf: 'center',
    },
    btnText: {
        color: Tools.color.black,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DetectePhotoLeftProfileScreen;
