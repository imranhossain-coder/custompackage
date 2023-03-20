import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Buyofferbody from "../components/Buyoffer/Buyofferbody";
const BuyofferScreen = ({ route }) => {
  const Navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f5f4" }}>
      <TouchableOpacity
        style={{ position: "absolute", top: 10, zIndex: 9999, marginLeft: 10 }}
        onPress={() => Navigation.goBack()}
      >
        <AntDesign name="arrowleft" color="white" size={30} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#096b39",
          height: 50,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: "white", fontWeight: "400" }}>
          অফার বিস্তারিত
        </Text>
      </View>
      <Buyofferbody offdetail={route.params} />
    </View>
  );
};

export default BuyofferScreen;

const styles = StyleSheet.create({});
