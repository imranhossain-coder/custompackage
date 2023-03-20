import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomTab from "../components/BottomTab";
import ProfileBody from "../components/Profile/ProfileBody";
const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f4f5f4" }}>
      <ProfileBody />
      <BottomTab />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
