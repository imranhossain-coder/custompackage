import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
const ForgetPassword = ({ route }) => {
  const [looding, setlooding] = useState(false);
  const [newpassword, setnewpassword] = useState(null);

  const Changepassword = () => {
    setlooding(true);
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/changepassword",
      data: {
        useremail: route.params.email,
        newpassword,
      },
    })
      .then(async (res) => {
        Alert.alert("Password Changed Successfully");
        setlooding(false);
      })
      .catch((error) => {
        console.log(error);
        setlooding(false);
      });
  };
  return (
    <View
      style={{
        height: "100%",
        paddingHorizontal: 10,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          alignItems: "center",
          fontSize: 22,
          marginBottom: 20,
        }}
      >
        Change Password
      </Text>
      <View style={styles.singupform}>
        <View style={styles.singleinput}>
          <TextInput
            placeholder="Enter New Password"
            style={styles.input}
            onChangeText={(text) => setnewpassword(text)}
          />
        </View>

        <View style={{ width: "100%", alignItems: "center" }}>
          {looding == true ? (
            <ActivityIndicator animating={true} color="green" size={20} />
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#006f2d",
                justifyContent: "center",
                alignItems: "center",
                width: wp("80%"),
                height: hp("5%"),
              }}
              onPress={() => Changepassword()}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Change Password
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: hp("7%"),
    fontWeight: "bold",
    color: "#4E6C50",
    fontSize: 17,
  },
  singleinput: {
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  singupform: {
    width: "100%",
    marginBottom: 10,
    zIndex: -999,
    justifyContent: "center",
  },

  footertext: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  singlefootertext: {
    marginBottom: 15,
    alignItems: "center",
  },
});
