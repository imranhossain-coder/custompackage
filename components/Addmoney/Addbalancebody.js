import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Addbalancebody = () => {
  const Navigation = useNavigation();
  const [payment, setpayment] = useState();
  const [infodata, setinfodata] = useState(null);
  const [transactionid, settransactionid] = useState(null);
  const [ammount, setammount] = useState(null);
  const [looding, setlooding] = useState(false);

  const getInfo = () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getinfo",
    })
      .then((response) => {
        setinfodata(response.data);
      })
      .catch((error) => {
        Alert.alert("Internal Server Problem");
      });
  };
  const hanldebalance = async () => {
    setlooding(true);
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
    const userdata = await AsyncStorage.getItem("Userdata");
    const parsedata = JSON.parse(userdata);
    if (payment !== undefined && ammount && transactionid) {
      try {
        axios({
          method: "post",
          url: "https://offerapp.onrender.com/postaddbalance",
          data: {
            ammount,
            time: dateTime,
            paymentmethod: payment.paymentname,
            paymentnumber: payment.paymentnumber,
            status: "pending",
            transactionid,
            email: parsedata.email,
            userphone: parsedata.phone,
          },
        })
          .then(async (res) => {
            Alert.alert(
              "Add Balance Request send sucessfully, Wait 2-5 minitues"
            );
            setlooding(false);
          })
          .catch((error) => {
            Alert.alert("Package not Added");
            setlooding(false);
          });
      } catch (error) {
        Alert.alert("Package not added");
        setlooding(false);
      }
    } else {
      Alert.alert("Please Fill all the details");
      setlooding(false);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  const PaymentDetails = [
    {
      paymentname: "bkash",
      paymentimage: require("../../assets/bkash.png"),
      paymentnumber: infodata?.bkashnumber,
    },
    {
      paymentname: "rocket",
      paymentimage: require("../../assets/rocket.png"),
      paymentnumber: infodata?.rockectnumber,
    },
    {
      paymentname: "nagad",
      paymentimage: require("../../assets/nagad.png"),
      paymentnumber: infodata?.nagadnumber,
    },
  ];

  return (
    <View>
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
          style={{ fontSize: wp("5%"), color: "white", fontWeight: "3.700" }}
        >
          অ্যাড ব্যালেন্স
        </Text>
      </View>
      <View style={styles.paymentcontainer}>
        {PaymentDetails.map((data, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.singlepayment,
                payment?.paymentname == data.paymentname
                  ? { borderColor: "orange", borderWidth: 2 }
                  : null,
              ]}
              onLongPress={async () =>
                await Clipboard.setStringAsync(`${data.paymentnumber}`).finally(
                  () => {
                    ToastAndroid.show(
                      `${data.paymentname} number copied successfully`,
                      2000
                    );
                  }
                )
              }
              key={index}
              onPress={() =>
                setpayment({
                  paymentname: data.paymentname,
                  paymentnumber: data.paymentnumber,
                })
              }
            >
              <Image
                source={data.paymentimage}
                resizeMode="contain"
                style={{ width: wp("10%"), height: hp("10%") }}
              />
              <Text style={{ fontSize: 22 }}>
                {data.paymentnumber?.slice(0, 11)}
              </Text>
              <Text style={{ color: "gray" }}>
                {data.paymentnumber?.slice(11, data.paymentnumber?.length)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.payementrules}>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Entypo
            name="arrow-bold-right"
            size={25}
            color="green"
            style={{ marginRight: 5 }}
          />
          <Text style={{ width: "100%", fontSize: wp("3.7%"), color: "gray" }}>
            অ্যাকাউন্ট নাম্বার এর ওপর একবার ক্লিক করলে একাউন্ট সিলেক্ট হবে আর
            যদি টাচ করে 2 সেকেন্ড ধরে থাকেন তাহলে একাউন্ট নাম্বার কপি হবে
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Entypo
            name="arrow-bold-right"
            size={25}
            color="green"
            style={{ marginRight: 5 }}
          />
          <Text style={{ width: "100%", fontSize: wp("3.7%"), color: "gray" }}>
            নাম্বার পাশে নাম্বারের ধরন যেমন payment, send money / cash in / cash
            out লেখা দেখে নিবেন। বিকাশ বেশি চার্জ কাটায় বিকাশ এ লেনদেন কম করবেন।
            বিকাশ টাকা এ্যাড করলে ২ টাকা করে কম দেওয়া হবে
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Entypo
            name="arrow-bold-right"
            size={25}
            color="green"
            style={{ marginRight: 5 }}
          />
          <Text style={{ width: "100%", fontSize: wp("3.7%"), color: "red" }}>
            আমাদের নাম্বারে ভুলে রিচার্জ করলে আপনি সেই টাকা অ্যাড ব্যালেন্স
            ব্যালেন্স করতে পারবেন না + টাকা ফেরত পাবেন না
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Entypo
            name="arrow-bold-right"
            size={25}
            color="green"
            style={{ marginRight: 5 }}
          />
          <Text style={{ width: "100%", fontSize: wp("3.7%"), color: "red" }}>
            অ্যাড ব্যালেন্স করতে হলে মেনু থেকে ভিডিও অপশনে গিয়ে ভিডিও দেখুন
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 10, marginBottom: 15 }}>
        <TextInput
          placeholder="Transaction Id"
          style={{
            backgroundColor: "white",
            width: "90%",
            height: hp("6%"),
            paddingLeft: 10,
            fontSize: 17,
            fontWeight: "bold",
            marginBottom: 10,
          }}
          onChangeText={(Text) => settransactionid(Text)}
        />
        <TextInput
          placeholder="Amount"
          style={{
            backgroundColor: "white",
            width: "90%",
            height: hp("6%"),
            paddingLeft: 10,
            fontSize: 17,
            fontWeight: "bold",
            marginBottom: 10,
          }}
          onChangeText={(text) => setammount(text)}
          keyboardType="decimal-pad"
        />
      </View>

      <View style={{ width: "100%", alignItems: "center" }}>
        {looding == true ? (
          <ActivityIndicator animating={true} color="green" size={25} />
        ) : (
          <TouchableOpacity
            style={{
              width: "90%",
              backgroundColor: "#096b39",
              height: hp("6%"),
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => hanldebalance()}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Submit
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Addbalancebody;

const styles = StyleSheet.create({
  paymentcontainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  singlepayment: {
    width: "90%",
    backgroundColor: "white",
    height: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 5,
    marginBottom: 10,
  },
  payementrules: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
