// Dépendances
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

// Utilitaire
import * as Utilities from './src/utilities/utilities';

// Screens
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
// import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditInformationScreen from './screens/EditInformationScreen';
import ContactScreen from './screens/ContactScreen';
import DetectePhotoFaceScreen from './screens/DetectePhotoFaceScreen';
import DetectePhotoLeftProfileScreen from './screens/DetectePhotoLeftProfileScreen';
import DetectePhotoRightProfileScreen from './screens/DetectePhotoRightProfileScreen';
import DetectePhotoStatusScreen from './screens/DetectePhotoStatusScreen';

DetectePhotoStatusScreen;

function OpeningScreen({ navigation }) {
    return (
        <ImageBackground source={require('./src/images/homeScreen.png')} style={{ width: '100%', height: '100%' }}>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <Text style={styles.textWhite}>
                    Un miroir {'\n'}
                    <Text style={styles.textDarkGreen}>intelligent </Text>
                    pour une {'\n'}
                    <Text style={styles.textDarkGreen}>vie brillante</Text>
                </Text>
            </View>
            <View style={styles.containerBottom}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.round}></View>
                    <View style={styles.round}></View>
                    <View style={styles.largeRound}></View>
                </View>

                <View>
                    <Text style={{ fontSize: 24, color: Utilities.color.light.antiquewhite }}>On commence ?</Text>
                </View>

                <View>
                    <Pressable
                        onPress={() => navigation.navigate('SignInScreen')}
                        style={styles.button}
                        android_ripple={{
                            color: Utilities.color.light.antiquewhite,
                            borderless: true,
                        }}
                    >
                        <AntDesign name="arrowright" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="OpeningScreen" component={OpeningScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="EditInformationScreen" component={EditInformationScreen} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                <Stack.Screen name="ContactScreen" component={ContactScreen} />
                <Stack.Screen name="DetectePhotoFaceScreen" component={DetectePhotoFaceScreen} />
                <Stack.Screen name="DetectePhotoLeftProfileScreen" component={DetectePhotoLeftProfileScreen} />
                <Stack.Screen name="DetectePhotoRightProfileScreen" component={DetectePhotoRightProfileScreen} />
                <Stack.Screen name="DetectePhotoStatusScreen" component={DetectePhotoStatusScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        backgroundColor: Utilities.color.black,
        opacity: 0.6,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    containerBottom: {
        flex: 0.1,
        opacity: 0.6,
        backgroundColor: Utilities.color.black,

        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    textWhite: {
        color: Utilities.color.light.antiquewhite,
        fontSize: 64,
    },
    textDarkGreen: {
        color: Utilities.color.dark.green,
        fontSize: 64,
    },
    round: {
        width: 10,
        height: 10,
        borderRadius: Utilities.border.round,
        backgroundColor: Utilities.color.light.grey,
        marginHorizontal: 5,
    },
    largeRound: {
        width: 50,
        height: 10,
        borderRadius: Utilities.border.round,
        backgroundColor: Utilities.color.light.antiquewhite,
        marginHorizontal: 5,
    },
    button: {
        borderRadius: Utilities.border.round,
        padding: 15,
        backgroundColor: Utilities.color.white,
        background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 70%, #c7d9ff 100%)',
        boxShadow: '0px 0px 10px 1px #c7d9ff', // ombre pour donner un effet de profondeur
    },
});
