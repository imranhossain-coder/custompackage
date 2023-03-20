import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Signupheader = () => {
  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/singup.png")}
        style={styles.signupheadimg}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default Signupheader;

const styles = StyleSheet.create({
  signupheadimg: {
    width: "100%",
    height: 230,
  },
});
