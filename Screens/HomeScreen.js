import {
  Alert,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Homebody from "../components/Home/Homebody";
import BottomTab from "../components/BottomTab";
import NetInfo from "@react-native-community/netinfo";

const HomeScreen = () => {
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == false) {
        Alert.alert(
          "Please Check your Internet Connection",
          "Get back Again",

          [
            {
              text: "Ok",
              onPress: () => BackHandler.exitApp(),
              style: "cancel",
            },
          ]
        );
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header />
      <Homebody />
      <BottomTab />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
