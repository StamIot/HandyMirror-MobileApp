import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Colors = {
  darkGreen: "#5F7161",
  green: "#6D8B74",
  beige: "#EFEAD8",
  grey: "#D0C9C0",
};

export default function App() {
  return (
    <ImageBackground
      source={require("./src/images/homeScreen.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.textWhite}>
          Un miroir {"\n"}
          <Text style={styles.textDarkGreen}>intelligent </Text>
          pour une {"\n"}
          <Text style={styles.textDarkGreen}>vie brillante</Text>
        </Text>
      </View>
      <View style={styles.containerBottom}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.round}></View>
          <View style={styles.round}></View>
          <View style={styles.largeRound}></View>
        </View>

        <View>
          <Text style={{ fontSize: 24, color: Colors.beige }}>
            On commence ?
          </Text>
        </View>

        <View>
          <Pressable
            onPress={() => console.log("test")}
            style={styles.button}
            android_ripple={{ color: Colors.beige, borderless: true }}
          >
            <AntDesign name="arrowright" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "black",
    opacity: 0.6,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerBottom: {
    flex: 0.1,
    opacity: 0.6,
    backgroundColor: "black",

    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  textWhite: {
    color: Colors.beige,
    fontSize: 64,
  },
  textDarkGreen: {
    color: Colors.darkGreen,
    fontSize: 64,
  },
  round: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: Colors.grey,
    marginHorizontal: 5,
  },
  largeRound: {
    width: 50,
    height: 10,
    borderRadius: 50,
    backgroundColor: Colors.beige,
    marginHorizontal: 5,
  },
  button: {
    borderRadius: 50,
    padding: 15,
    backgroundColor: "white",
    background: "linear-gradient(90deg, #ffffff 0%, #ffffff 70%, #c7d9ff 100%)",
    boxShadow: "0px 0px 10px 1px #c7d9ff", // ombre pour donner un effet de profondeur
  },
});
