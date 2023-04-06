import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import TextInputExample from "../Component/TextInput";

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen3}>
      <View style={[styles.screen3Child, styles.raviDeVousPosition]} />
      <Text
        style={[styles.raviDeVous, styles.raviDeVousPosition]}
      >{`Ravi de vous revoir, `}</Text>
      <View style={styles.input}>
      <TextInputExample placeholder={"Entrez votre adresse mail"}/>
      <TextInputExample placeholder={"Entrez votre mot de passe"}/>
      </View>
      <Pressable
        style={styles.vousNavezPasContainer}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={[styles.text, styles.enterTypo]}>
          <Text>Vous n’avez pas de compte ?</Text>
          <Text> S’enregistrer</Text>
        </Text>
      </Pressable>
      <Pressable
        style={styles.rectanglePressable}
        onPress={() => navigation.navigate("Screen4")}
      />
      <Image
        style={styles.mainCoucou031Icon}
        resizeMode="cover"
        source={require("../assets/maincoucou03-1.png")}
      />
      <Text style={styles.seConnecter}>Se connecter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  raviDeVousPosition: {
    left: 39,
    position: "absolute",
  },
  input: {
    top: "50%",
    left:  "10%"
  },
  screen3Layout: {
    height: 65,
    width: 312,
    backgroundColor: Color.lightGray0,
    borderRadius: Border.br_81xl,
    position: "absolute",
  },
  enterTypo: {
    height: 22,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMedium_size,
    textAlign: "center",
  },
  screen3Child: {
    top: 178,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.cadetblue_100,
    width: 349,
    height: 613,
  },
  raviDeVous: {
    top: 134,
    fontSize: FontSize.size_21xl,
    lineHeight: 39,
    fontFamily: FontFamily.urbanistRegular,
    color: Color.antiquewhite,
    textAlign: "left",
    width: 419,
    height: 46,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
  screen3Item: {
    top: 437,
    left: 57,
  },
  screen3Inner: {
    top: 521,
    left: 58,
  },
  enterYourEmailid: {
    top: 458,
    left: -23,
    width: 314,
    color: Color.gray_500,
    height: 22,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMedium_size,
    position: "absolute",
  },
  enterConfirmPassword: {
    top: 542,
    left: -27,
    width: 314,
    color: Color.gray_500,
    height: 22,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMedium_size,
    position: "absolute",
  },
  vousNavezPas: {
    color: Color.gray_400,
  },
  text: {
    width: 313,
    height: 22,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMedium_size,
  },
  vousNavezPasContainer: {
    top: 844,
    left: 57,
    position: "absolute",
    color: Color.gray_600
  },
  rectanglePressable: {
    top: 699,
    left: 90,
    borderRadius: Border.br_xl,
    backgroundColor: Color.lightgray,
    width: 243,
    height: 53,
    position: "absolute",
  },
  mainCoucou031Icon: {
    top: 229,
    left: 107,
    width: 172,
    height: 158,
    position: "absolute",
  },
  seConnecter: {
    top: 714,
    left: 103,
    fontSize: FontSize.titlePoppinsMedium_size,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.dimgray,
    width: 217,
    height: 24,
    textAlign: "center",
    position: "absolute",
  },
  ellipseIcon: {
    top: 0,
    left: 0,
    width: 154,
    height: 134,
    opacity: 0.7,
    position: "absolute",
  },
  screen3: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.dimgray,
    flex: 1,
    width: "100%",
    height: 926,
    overflow: "hidden",
  },
});

export default SignUp;
