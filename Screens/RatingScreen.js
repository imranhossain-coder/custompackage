import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const RatingScreen = () => {
  const Navigation = useNavigation();
  return (
    <View style={{ height: "100%" }}>
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
        <Text style={{ fontSize: wp("5%"), color: "white", fontWeight: "400" }}>
          রেটিং
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",

          height: "35%",
        }}
      >
        <Image
          source={require("../assets/userreview.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ width: "100%", paddingHorizontal: 25, marginTop: 20 }}>
        <Text
          style={{
            letterSpacing: 1,
            lineHeight: 25,
            fontSize: 17,
            color: "green",
          }}
        >
          আপনাদের কাছে অনুরোধ না জেনে বা না বুঝে কোন রেটিং দেবেন না । রেটিং
          সবসময় নতুন কাস্টমারদের কাছে বিশ্বাসের প্রতিক বহন করে । তাই আপনি যদি
          আমাদের থেকে অফার কিনে থাকেন তাহলে অনুরোধ করবো ৫* রেটিং সহ আপনার
          মুল্যবান মতামত অল্প কথায় তুলে ধরার জন্য । আপনারা চাইলে নিচের লেখাগুলো
          কপি করেও রিভিও হিসাবে দিতে পারেন তবে আপনি আমাদের থেকে কোনো অফার না
          কিনে থাকলে দয়াকরে ৫* এর কম রেটিং দেবেন না ।
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center", marginTop: 50 }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 80,
            backgroundColor: "green",
            paddingVertical: 5,
            borderRadius: 5,
          }}
          onPress={() =>
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.telecom.telecomshop"
            )
          }
        >
          <Text style={{ color: "white", fontSize: 19 }}>Rate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({});
