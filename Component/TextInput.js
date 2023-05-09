import React from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { Color, Border, FontSize, FontFamily } from '../GlobalStyles'

const TextInputExample = ({ placeholder }) => {
    const [text, onChangeText] = React.useState('')

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={placeholder}
            />
        </SafeAreaView>
    )
}

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
})

export default TextInputExample
