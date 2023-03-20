import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";
import Modal from "react-native-modal";
import Historyfirst from "../components/History/Historyfirst";
import HistorySecond from "../components/History/HistorySecond";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HistoryScreen = () => {
  const Navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [orderdetails, setorderdetails] = useState();
  const [addbalancedetails, setaddbalancedetails] = useState();
  const [detailsmodal, setdetailsmodal] = useState(false);
  const [addbalancemodal, setaddbalancemodal] = useState(false);

  const [addbalancehistory, setaddbalancehistory] = useState([]);
  const [addorderhistory, setaddorderhistory] = useState([]);

  const getuserData = async () => {
    const userdata = await AsyncStorage.getItem("Userdata");
    const parsedata = JSON.parse(userdata);

    axios({
      method: "post",
      url: "https://offerapp.onrender.com/getbalancecustomer",
      data: {
        phone: parsedata?.phone,
      },
    })
      .then((response) => {
        setaddbalancehistory(response.data?.addbalancehistory);
      })
      .catch((error) => {
        Alert.alert("Internal Server Problem");
      });
    axios({
      method: "post",
      url: "https://offerapp.onrender.com/getordercustomer",
      data: {
        phone: parsedata?.phone,
      },
    })
      .then((response) => {
        setaddorderhistory(response.data?.addorderhistory);
      })
      .catch((error) => {
        Alert.alert("Internal Server Problem");
      });
  };

  useEffect(() => {
    getuserData();
  }, []);

  const FirstRoute = () => (
    <>
      <Modal
        isVisible={detailsmodal}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setdetailsmodal(false)}
      >
        <View
          style={{ backgroundColor: "white", height: hp("60%"), width: "80%" }}
        >
          <View style={styles.orderdetailcontainer}>
            <View style={styles.singledetailorder}>
              <Text style={{ color: "green" }}>Package Company</Text>
              <Text style={styles.orderdetailvalue}>
                {orderdetails?.packagecompany}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Package Title</Text>
              <Text style={styles.orderdetailvalue}>
                {orderdetails?.packagetitle}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Offer Number</Text>
              <Text style={styles.orderdetailvalue}>
                {orderdetails?.offernumber}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Package Price</Text>
              <Text style={styles.orderdetailvalue}>
                {orderdetails?.packageprice}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Package Validity</Text>
              <Text style={styles.orderdetailvalue}>
                {orderdetails?.offervalidity}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Date & Time</Text>
              <Text style={styles.orderdetailvalue}>{orderdetails?.time}</Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Status</Text>
              <Text style={styles.orderdetailvalue}>
                {orderdetails?.status}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Historyfirst
        setdetailsmodal={setdetailsmodal}
        addorderhistory={addorderhistory}
        setorderdetails={setorderdetails}
      />
    </>
  );

  const SecondRoute = () => (
    <>
      <Modal
        isVisible={addbalancemodal}
        style={{ alignItems: "center" }}
        onBackdropPress={() => setaddbalancemodal(false)}
      >
        <View
          style={{ backgroundColor: "white", height: hp("42%"), width: "80%" }}
        >
          <View style={styles.orderdetailcontainer}>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Ammount</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalancedetails?.ammount}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Payment Method</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalancedetails?.paymentmethod}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Transaction ID</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalancedetails?.transactionid}
              </Text>
            </View>
            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Date & Time</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalancedetails?.time}
              </Text>
            </View>

            <View style={styles.singledetailorder}>
              <Text style={styles.orderdetailtitle}>Status</Text>
              <Text style={styles.orderdetailvalue}>
                {addbalancedetails?.status}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <HistorySecond
        setaddbalancemodal={setaddbalancemodal}
        addbalancehistory={addbalancehistory}
        setaddbalancedetails={setaddbalancedetails}
      />
    </>
  );

  const [routes] = React.useState([
    { key: "addbalancehistory", title: "ORDER HISTORY" },
    { key: "orderhistory", title: "ADDBALANCE HISTORY" },
  ]);
  const renderScene = SceneMap({
    addbalancehistory: FirstRoute,
    orderhistory: SecondRoute,
  });

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ position: "absolute", top: 10, zIndex: 9999, marginLeft: 10 }}
        onPress={() => Navigation.goBack()}
      >
        <AntDesign name="arrowleft" color="white" size={30} />
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: "#096b39",
          height: hp("8%"),
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: wp("6%"), color: "white", fontWeight: "400" }}>
          হিস্টরি
        </Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  orderdetailcontainer: {
    justifyContent: "center",
    height: "100%",
    paddingLeft: 20,
  },
  orderdetailtitle: {
    fontSize: 17,
    color: "green",
    fontWeight: "bold",
  },
  orderdetailvalue: {
    fontSize: 16,
  },
  singledetailorder: {
    marginVertical: 5,
  },
});
