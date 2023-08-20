/**
 * Date: 19/08/2023
 * Author: Guillon Alain
 * Version: 1.0.0
 */

const Tools = {
    border: {
        size: {
            none: 'none',
            xs: 4,
            sm: 8,
            md: 12,
            lg: 16,
            xl: 20,
            xxl: 24,
            round: 50,
        },
    },
    color: {
        dark: {
            green: '#5F7161',
            red: '#FA8072', // Crimson
        },
        light: {
            green: '#6D8B74',
            antiquewhite: '#EFEAD8',
            grey: '#C0C0C0', // Silver
            red: '#F08080', // Lightcoral
            blue: '#87CEFA', // LightSkyBlue
        },
        black: '#000000',
        white: '#F1F1F1',
    },
    font: {
        size: {
            xs: 10,
            sm: 13,
            md: 16,
            lg: 19,
            xl: 22,
            xxl: 40,
        },
        family: {
            roboto: {
                regular: 'Roboto'.toString(),
            },
            urbanist: {
                medium: 'Urbanist Medium'.toString(),
                extrabold: 'Urbanist ExtraBold'.toString(),
            },
        },
    },
};

console.log(Tools);

export default Tools;
