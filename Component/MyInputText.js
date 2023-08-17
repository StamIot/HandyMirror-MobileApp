// Dépendances
import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

// Utilitaires
import * as Utilities from '../src/utilities/utilities';

const MyInputText = ({ placeholder, value, onChangeText, name }) => {
    return (
        <SafeAreaView>
            <TextInput style={styles.input} onChangeText={onChangeText} value={value} name={name} placeholder={placeholder} placeholderTextColor={Utilities.color.light.grey} />
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    input: {
        backgroundColor: Utilities.color.light.antiquewhite,
        color: Utilities.color.black,
        height: 50,
        width: '100%',
        borderRadius: 5,
        marginTop: '5%',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
});

export default MyInputText;
