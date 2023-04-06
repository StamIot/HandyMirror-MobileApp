import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import TextInputExample from "../Component/TextInput";

const SignInScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.background}>
      <Text style={styles.bonjour}>{`Bonjour, `}</Text>
      <View style={styles.screen2Child}>
      <Text style={styles.welcomeSentence}> Bienvenue sur HandyMirror !</Text>
      <Text style={styles.welcomeSentence2}> Ensemble améliorons votre quotidien !</Text> 
      <View style={styles.space}/>
    <TextInputExample placeholder="Quel est votre prénom ?"/>
    <TextInputExample placeholder="Quel est votre nom ?"/>
    <TextInputExample placeholder="Saisissez un mot de passe"/>
    <TextInputExample placeholder="Resaisissez votre mot de passe"/>
    <Pressable
    style={styles.registerButton}
  onPress={() => navigation.navigate("AppMirror")}
>
  <Text style={[styles.senregistrer1, styles.seConnecterTypo]}>S'enregistrer</Text>
</Pressable>
      <Pressable
        style={styles.ToSignUpContainer}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text>
          <Text style={styles.FirstPart}>{`On se connait déjà ? `}</Text>
          <Text style={[styles.crimson]}>
            Se connecter
          </Text>
        </Text>
      </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    background: {
    backgroundColor: Color.dimgray,
    flex: 1,
    width: "100%",
    height: 926,
    overflow: "hidden",
    },
    placeholder:{
    marginLeft: 10,
    },
    space: {
        height: "10%"
    },
    screen2Child: {
    zIndex2: 2,
    top: 140,
    left: 32,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.cadetblue_100,
    width: 350,
    height: 600,
    position: "absolute",
    },
    bonjour: {
    zIndex: 1,
    top: 40,
    left: 25,
    fontSize: 100,
    color: Color.antiquewhite,
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    fontFamily: FontFamily.urbanistRegular,
    position: "absolute",
  },
    welcomeSentence: {
    color: Color.antiquewhite,
    textAlign: "center",
    marginTop: "15%",
    fontSize: FontSize.size_xl
    },
    welcomeSentence2: {
        color: Color.antiquewhite,
        textAlign: "center",
        marginBottom: "10%",
        fontSize: FontSize.size_xl
        },
    middlebackground: {
        backgroundColor: Color.lightGray10,
        height: 60,
    },
    registerButton: {
    top: "105%",
    left: "15%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.lightgray,
    width: 243,
    height: 53,
    position: "absolute",
    },
    register: {
    left: 103,
    top: 721,
    position: "absolute",
    },
    FirstPart: {
    color: Color.gray_500,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    },
    SecondPart: {
    color: Color.gray_800,
    },
    seConnecterTypo: {
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
      },
      senregistrer1: {
        fontSize: FontSize.titlePoppinsMedium_size,
        color: Color.dimgray,
        marginTop: "7%",
        textAlign: "center",
        fontWeight: "700",
      },
    text: {
    width: 383,
    height: 22,
    fontSize: FontSize.bodyMedium_size,
    },
    ToSignUpContainer: {
    top: "115%",
    left: "18%",
    position: "absolute",
    },
});

export default SignInScreen;
