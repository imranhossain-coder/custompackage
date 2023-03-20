import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const HistorySecond = ({
  setaddbalancemodal,
  addbalancehistory,
  setaddbalancedetails,
}) => {
  const RenderBalance = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.singleorder}
        onPress={() => {
          setaddbalancedetails(item);
          setaddbalancemodal(true);
        }}
      >
        <View style={styles.orderleftside}>
          <Image
            source={require("../../assets/ordericon.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View style={styles.orderrightside}>
          <Text style={{ fontSize: 17 }}>
            Transaction Id: {item.transactionid}
          </Text>
          <Text style={{ fontSize: 17 }}>Ammount: {item.ammount}</Text>
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
        data={addbalancehistory.sort((p1, p2) => p1.time < p2.time)}
        renderItem={RenderBalance}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
};

export default HistorySecond;

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
    width: "75%",
  },
});
