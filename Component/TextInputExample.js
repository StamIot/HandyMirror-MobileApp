import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Color, Border, FontSize, FontFamily } from '../GlobalStyles';

const TextInputExample = ({ placeholder, value, onChangeText, name }) => {
    return (
        <SafeAreaView>
            <TextInput style={styles.input} onChangeText={onChangeText} value={value} name={name} placeholder={placeholder} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: Color.antiquewhite,
        width: '100%',
        height: 70,
        borderRadius: Border.br_21xl,
        textAlign: 'center',
        marginTop: 10,
        padding: 25,
    },
});

export default TextInputExample;
