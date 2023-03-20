import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Loginhead = () => {
  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/login.png")}
        style={styles.signupheadimg}
      />
    </SafeAreaView>
  );
};

export default Loginhead;

const styles = StyleSheet.create({
  signupheadimg: {
    width: "100%",
    height: 230,
  },
});
