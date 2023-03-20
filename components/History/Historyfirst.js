import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "react-native";

const Historyfirst = ({
  setdetailsmodal,
  addorderhistory,
  setorderdetails,
}) => {
  const RenderOrder = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.singleorder}
        onPress={() => {
          setorderdetails(item);
          setdetailsmodal(true);
        }}
      >
        <View style={styles.orderleftside}>
          <Image
            source={require("../../assets/ordericon.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View style={styles.orderrightside}>
          <Text style={{ fontSize: 17 }}>Title: {item.packagetitle}</Text>
          <Text style={{ fontSize: 17 }}>Price: {item.packageprice}</Text>
          <Text style={{ fontSize: 17 }}>
            Status:
            <Text
              style={{
                color: item.status == "fail" ? "red" : "green",
                fontSize: 18,
              }}
            >
              {item.status}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={addorderhistory.sort((p1, p2) => p1.time < p2.time)}
        renderItem={RenderOrder}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
};

export default Historyfirst;

const styles = StyleSheet.create({
  singleorder: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 100,
    alignItems: "center",
    paddingLeft: 20,
    marginBottom: 10,
  },
  orderleftside: {
    width: 50,
    height: 50,
    backgroundColor: "#d8d8d8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginRight: 20,
  },
  orderrightside: {
    justifyContent: "space-evenly",
    height: "80%",
  },
});
