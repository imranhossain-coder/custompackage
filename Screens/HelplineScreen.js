import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather, Entypo, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const HelplineScreen = () => {
  const Navigation = useNavigation();
  const [helplineinfo, sethelplineinfo] = useState({});
  const getInfo = () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getinfo",
    })
      .then((response) => {
        sethelplineinfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getInfo();
  }, []);

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
        <Text style={{ fontSize: wp("5%"), color: "white", fontWeight: "400" }}>
          হেল্প লাইন
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/helpline.png")}
          style={{ width: "100%", height: hp("28%") }}
        />
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <View style={styles.helplinecontainer}>
          <View
            style={{
              height: hp("8%"),
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.helplinetex}>Phone No.</Text>
            <Text style={styles.helplinevalue}>
              {helplineinfo?.contactphone}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#0C6C3C",
              width: wp("12%"),
              height: hp("6%"),
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => Linking.openURL(`tel:${helplineinfo?.contactphone}`)}
          >
            <Feather name="phone-call" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.helplinecontainer}>
          <View style={{ height: hp("8%"), justifyContent: "space-between" }}>
            <Text style={styles.helplinetex}>Mail address</Text>
            <Text style={styles.helplinevalue}>{helplineinfo?.email}</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#0C6C3C",
              width: wp("12%"),
              height: hp("6%"),
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => Linking.openURL(`mailto:${helplineinfo?.email}`)}
          >
            <Entypo name="mail" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => Linking.openURL(`${helplineinfo?.whatsapplink}`)}
        >
          <FontAwesome name="whatsapp" style={styles.btnicon} color="#53A553" />
          <Text style={styles.btntext}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => Linking.openURL(`${helplineinfo?.telegramlink}`)}
        >
          <FontAwesome name="telegram" style={styles.btnicon} color="#039BE6" />
          <Text style={styles.btntext}>Telegram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelplineScreen;

const styles = StyleSheet.create({
  helplinecontainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },
  helplinetex: {
    color: "#13A262",
    fontSize: 16,
  },
  helplinevalue: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#EEEEEE",
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btntext: {
    fontSize: 19,
  },
  btnicon: {
    fontSize: 30,
    marginRight: 10,
  },
});
