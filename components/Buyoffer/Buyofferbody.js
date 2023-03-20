import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Divider } from "react-native-elements/dist/divider/Divider";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectdynamic } from "../slices/navSlices";

const Buyofferbody = ({ offdetail }) => {
  const [offernumber, setoffernumber] = useState(null);

  const [loding, setloding] = useState(false);
  const userdata = useSelector(selectdynamic);

  const HandleOrder = async () => {
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

    setloding(true);
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/buyorder",
      data: {
        offerdetail: offdetail,
        time: dateTime,
        number: offernumber,
        status: "pending",
        email: userdata.email,
        usernumber: userdata.phone,
      },
    })
      .then(async (res) => {
        Alert.alert("Order send sucessfully, Wait 2-5 minitues");
        setloding(false);
        setoffernumber(null);
      })
      .catch((error) => {
        Alert.alert("Package not Added");
        setloding(false);
      });
  };

  return (
    <ScrollView>
      <View style={styles.offerhead}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <AntDesign name="earth" size={30} color="#096b39" />
          <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 5 }}>
            {offdetail?.offertitle}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 17, marginBottom: 4 }}>
            Operator: {offdetail?.packagecompany}
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 4 }}>
            Validity {offdetail?.offervalidity}
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
          <View
            style={{
              width: "80%",
              backgroundColor: "#e6f1ed",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              borderRadius: 5,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#096b39" }}
            >
              {offdetail?.offerprice}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.pricedetails}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Price Details</Text>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={styles.pdetailtag}>Regular Price</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {offdetail?.regularprice}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.pdetailtag}>Discount</Text>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              {offdetail?.discountprice}
            </Text>
          </View>
          <Divider style={{ marginVertical: 10 }} color="#b7b8b7" width={2} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.pdetailtag}>Offer Price</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {offdetail?.offerprice}
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 20, color: "#8f908e", fontSize: 17 }}>
          যে নাম্বারে অফার নিতে চান তা নিচে লিখুন
        </Text>
        <TextInput
          placeholder="Offer Number"
          style={{
            width: "100%",
            height: 50,
            fontSize: 25,
            marginTop: 15,
            paddingLeft: 10,
            fontWeight: "bold",
            borderColor: "#8f908e",
            borderWidth: 0.7,
          }}
          value={offernumber}
          keyboardType="decimal-pad"
          onChangeText={(text) => setoffernumber(text)}
        />
      </View>
      <View style={styles.ordersection}>
        <Text style={{ color: "#8f908e", marginBottom: 5, fontSize: 17 }}>
          Delivery Time 2-5 Minutes
        </Text>
        {loding == true ? (
          <ActivityIndicator animating={true} size={20} />
        ) : (
          <TouchableOpacity
            style={{
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#096b39",
              height: 45,
            }}
            onPress={() =>
              userdata?.balance > offdetail?.offerprice && offernumber
                ? HandleOrder()
                : Alert.alert("Please check balance and number")
            }
          >
            <Text style={{ color: "white", fontSize: 19, fontWeight: "bold" }}>
              Submit Order
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Buyofferbody;

const styles = StyleSheet.create({
  offerhead: {
    backgroundColor: "white",
    marginTop: 5,
    paddingBottom: 15,
  },
  pricedetails: {
    paddingHorizontal: 25,
    marginTop: 15,
    backgroundColor: "white",
    paddingBottom: 20,
  },
  pdetailtag: {
    fontSize: 16,
    color: "#b7b8b7",
  },
  ordersection: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
