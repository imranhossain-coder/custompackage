import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignupBody from "../components/Signup/Signupbody";
import Signupdheader from "../components/Signup/Signupheader";

const SignupScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f4f5f4" }}>
      <Signupdheader />
      <Text style={styles.logintext}>Registration</Text>
      <SignupBody />
    </View>
  );
};

export default SignupScreen;

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
