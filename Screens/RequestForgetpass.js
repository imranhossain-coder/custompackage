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
const RequestForgetpass = () => {
  const [looding, setlooding] = useState(false);
  const [useremail, setuseremail] = useState(null);

  const Changepassword = () => {
    setlooding(true);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time + " " + date;
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/postchangepass",
      data: {
        useremail: useremail,
        time: dateTime,
      },
    })
      .then(async (res) => {
        Alert.alert("Request Send Successfully, Please Check Your Email");
        setlooding(false);
      })
      .catch((error) => {
        console.log(error);
        setlooding(false);
        Alert.alert("User Not found");
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
        Request To Change the Password
      </Text>
      <View style={styles.singupform}>
        <View style={styles.singleinput}>
          <TextInput
            placeholder="Enter Your Email"
            style={styles.input}
            onChangeText={(text) => setuseremail(text)}
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
                Send Request
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default RequestForgetpass;

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
