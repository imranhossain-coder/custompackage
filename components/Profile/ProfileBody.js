import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const ProfileBody = () => {
  const Navigation = useNavigation();
  const [Profiledata, setProfiledata] = useState({});
  const getData = async () => {
    const usertoken = await AsyncStorage.getItem("Userdata");
    const parsedata = JSON.parse(usertoken);
    setProfiledata(parsedata);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ position: "absolute", top: 10, zIndex: 9999, marginLeft: 10 }}
        onPress={() => Navigation.goBack()}
      >
        <AntDesign name="arrowleft" color="white" size={30} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#096b39",
          height: hp("7%"),
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ fontSize: wp("5.5%"), color: "white", fontWeight: "400" }}
        >
          প্রোফাইল
        </Text>
      </View>

      <View style={styles.proflieimage}>
        <Image
          source={require("../../assets/user.png")}
          style={{
            width: wp("25%"),
            height: hp("14%"),
            borderRadius: 100,
            borderWidth: 5,
            borderColor: "white",
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#096b39",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 50,
          }}
          onPress={() => Navigation.navigate("ForgetPassword", Profiledata)}
        >
          <Text
            style={{ fontSize: wp("4%"), color: "white", fontWeight: "400" }}
          >
            পাসওয়ার্ড পরিবর্তন
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userData}>
        <View style={styles.leftside}>
          <Text
            style={{ fontSize: wp("5%"), marginRight: 30, color: "#b0b1b0" }}
          >
            Name
          </Text>
          <Text
            style={{ fontSize: wp("5%"), marginRight: 30, color: "#b0b1b0" }}
          >
            Email
          </Text>
          <Text
            style={{ fontSize: wp("5%"), marginRight: 30, color: "#b0b1b0" }}
          >
            Phone Number
          </Text>
        </View>
        <View style={styles.rightside}>
          <Text style={{ fontSize: wp("5%"), fontWeight: "bold" }}>
            {Profiledata?.name}
          </Text>
          <Text style={{ fontSize: wp("5%"), fontWeight: "bold" }}>
            {Profiledata?.email}
          </Text>
          <Text style={{ fontSize: wp("5%"), fontWeight: "bold" }}>
            {Profiledata?.phone}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileBody;

const styles = StyleSheet.create({
  proflieimage: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  userData: {
    backgroundColor: "white",
    marginTop: 20,
    marginHorizontal: 10,
    flex: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: "row",
  },
  leftside: {
    height: "70%",

    width: "40%",
    justifyContent: "space-evenly",
    paddingLeft: 20,
  },
  rightside: {
    height: "70%",
    width: "60%",
    justifyContent: "space-evenly",
  },
});
