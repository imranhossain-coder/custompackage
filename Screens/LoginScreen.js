import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import Loginhead from "../components/Login/Loginhead";
import Loginbody from "../components/Login/Loginbody";

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f4f5f4" }}>
      <Loginhead />
      <Text style={styles.logintext}>Sign In</Text>
      <Loginbody />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logintext: {
    color: "#006f2d",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: 10,
    marginBottom: 10,
  },
});
