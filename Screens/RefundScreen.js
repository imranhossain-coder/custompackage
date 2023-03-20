import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Refundheader from "../components/Refund/Refundheader";
import Refundbody from "../components/Refund/Refundbody";

const RefundScreen = () => {
  return (
    <View>
      <Refundheader />
      <Refundbody />
    </View>
  );
};

export default RefundScreen;

const styles = StyleSheet.create({});
