import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { selectdynamic, setuserdynamic } from "../slices/navSlices";
const PaymentMethod = [
  {
    paymentname: "bkash",
    paymentimage: require("../../assets/bkash.png"),
  },
  {
    paymentname: "rocket",
    paymentimage: require("../../assets/rocket.png"),
  },
  {
    paymentname: "nagad",
    paymentimage: require("../../assets/nagad.png"),
  },
];

const Refundbody = () => {
  const [payment, setpayment] = useState();
  const [Accountnumber, setAccountnumber] = useState();
  const [Ammount, setAmmount] = useState();
  const userdata = useSelector(selectdynamic);

  const HanldeRefund = async () => {
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

    if (Ammount > 300) {
      if (userdata?.balance > Ammount || Ammount == userdata?.balance) {
        axios({
          method: "post",
          url: "https://offerapp.onrender.com/postrefund",
          data: {
            ammount: Ammount,
            time: dateTime,
            paymentmethod: payment.paymentname,
            paymentnumber: Accountnumber,
            status: "pending",
            email: userdata?.email,
            usernumber: userdata?.phone,
          },
        })
          .then(async (res) => {
            Alert.alert("Refund Request send sucessfully, Wait 2-5 minitues");
          })
          .catch((error) => {
            Alert.alert("Package not Added");
          });
      } else {
        Alert.alert("Insufficient Balance , Please Add money");
      }
    } else {
      Alert.alert("Minimum Refund 300tk");
    }
  };

  return (
    <View>
      <View style={styles.header}>
        {PaymentMethod.map((data, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.singleitem,
                payment?.paymentname == data.paymentname
                  ? { borderColor: "orange", borderWidth: 2 }
                  : null,
              ]}
              key={index}
              onPress={() =>
                setpayment({
                  paymentname: data.paymentname,
                  pyamentnumber: data.pyamentnumber,
                })
              }
            >
              <Image
                source={data.paymentimage}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 15 }}>
        <TextInput
          placeholder="Account Number"
          style={{
            backgroundColor: "white",
            width: "93%",
            height: hp("7%"),
            paddingLeft: 10,
            fontSize: 17,
            fontWeight: "bold",
            marginBottom: 10,
          }}
          onChangeText={(text) => setAccountnumber(text)}
          keyboardType="decimal-pad"
        />
        <TextInput
          placeholder="Amount"
          style={{
            backgroundColor: "white",
            width: "93%",
            height: hp("7%"),
            paddingLeft: 10,
            fontSize: 17,
            fontWeight: "bold",
            marginBottom: 10,
          }}
          onChangeText={(text) => setAmmount(text)}
          keyboardType="decimal-pad"
        />
      </View>
      <View style={styles.payementrules}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Entypo
            name="arrow-bold-right"
            size={25}
            color="green"
            style={{ marginRight: 5 }}
          />
          <Text style={{ fontSize: 15, color: "gray", width: "100%" }}>
            প্রথমে বিকাশ, নগদ, রকেট সিলেক্ট করুন । যে নাম্বারে টাকা ফেরত নিতে
            চান লিখুন। অবশেষে টাকার পরিমান লিখে সাবমিট করুন।
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Entypo
            name="arrow-bold-right"
            size={25}
            color="green"
            style={{ marginRight: 5 }}
          />
          <Text style={{ fontSize: 15, color: "red", width: "100%" }}>
            আপনি যে মাধ্যমে টাকা এ্যাড করছেন আপনাকে সে মাধ্যমে টাকা ফেরত নিতে
            হবে। যেমন বিকাশে নিয়ে থাকলে বিকাশ, নগদ নিয়ে থাকলে নগদ এ।
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Entypo
            name="arrow-bold-right"
            size={25}
            color="green"
            style={{ marginRight: 5 }}
          />
          <Text style={{ fontSize: 15, color: "red", width: "100%" }}>
            ৩০০ টাকার কম টাকা ফেরত দেওয়া হয় না। টাকা ফেরত নেওয়ার জন্য ১৫ মিনিট
            অপেক্ষা করুন। বিকাশ টাকা ফেরতের জন্য চার্জ বাবদ ৫/১০ টাকা কম দেওয়া
            হবে। বেশি দেরি হলে অথবা অন্য মাধ্যমে নিতে চাইলে এডমিন সাথে যোগাযোগ
            করুন।
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: "90%",
            backgroundColor: "#096b39",
            height: hp("6%"),
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            payment ? HanldeRefund() : Alert.alert("Select the payment")
          }
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Refundbody;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  singleitem: {
    width: wp("30%"),
    height: 45,
    backgroundColor: "white",
  },
  payementrules: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
