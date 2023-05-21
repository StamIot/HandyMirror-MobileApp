// Dépendances
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    FlatList,
    Switch,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

// Styles
import { Color, FontFamily, FontSize } from '../GlobalStyles'

// Data
const INITIAL_DATA = [
    {
        id: 1,
        name: 'Todo List',
        describe: 'Les tâches courantes',
        show: true,
    },
    {
        id: 2,
        name: 'List item',
        describe: 'supporting Text',
        show: false,
    },
    {
        id: 3,
        name: 'List item',
        describe: 'supporting Text',
        show: true,
    },
    {
        id: 4,
        name: 'List item',
        describe: 'supporting Text',
        show: false,
    },
    {
        id: 5,
        name: 'List item',
        describe: 'supporting Text',
        show: false,
    },
    {
        id: 6,
        name: 'List item',
        describe: 'supporting Text',
        show: true,
    },
]

const CustomizeScreen = () => {
    const navigation = useNavigation()

    const [data, setData] = useState(INITIAL_DATA)
    const toggleSwitch = (id) => {
        setData(
            data.map((item) =>
                item.id === id ? { ...item, show: !item.show } : item,
            ),
        )
    }

    return (
        <>
            {/* SCREEN N°4 */}
            <View style={styles.screen4}>
                {/* CERCLES */}
                <View style={styles.circlesContainer}>
                    <View style={[styles.circle, styles.circleOne]}></View>
                    <View style={[styles.circle, styles.circleTwo]}></View>
                </View>

                {/* Accueil */}
                <View style={styles.messageContainer}>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/Default_UserProfilePicture1.png')}
                    />
                    <Text style={styles.message}>{`Hi Pseudo, `}</Text>
                </View>

                {/* Un message */}
                <View style={styles.textWhiteContainer}>
                    <Text style={styles.messageTextWhite}>
                        Que souhaitez vous laissez apparaître sur votre
                        HandyMirror ?
                    </Text>
                </View>

                {/* Liste des éléments de la liste */}
                <View style={styles.list}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <View>
                                    <Text style={styles.listItemName}>
                                        {item.name}
                                    </Text>
                                    <Text>{item.describe}</Text>
                                </View>
                                <View>
                                    <Switch
                                        value={item.show}
                                        onValueChange={() =>
                                            toggleSwitch(item.id)
                                        }
                                    />
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
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
    screen4: {
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
        flexDirection: 'row',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 20,
        marginLeft: 20,
    },
    message: {
        textAlign: 'center',
        fontFamily: FontFamily.urbanistRegular,
        fontSize: FontSize.size_21xl,
        color: Color.antiquewhite,
        paddingTop: 20,
    },
    textWhiteContainer: {
        flex: 0.1,
    },
    messageTextWhite: {
        color: Color.antiquewhite,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
    },
    list: {
        flex: 0.6,
        padding: 15,
    },
    listItem: {
        backgroundColor: Color.antiquewhite,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        marginTop: 15,
        borderRadius: 5,
    },
    listItemName: {
        fontWeight: '700',
        fontSize: 16,
        color: Color.dimgray,
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
})

export default CustomizeScreen
