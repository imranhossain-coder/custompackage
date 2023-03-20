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
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

const SocialmediaScreen = () => {
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
          সামাজিক মাধ্যম
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/socialmedia.png")}
          style={{ width: "100%", height: hp("28%") }}
        />
      </View>
      <View style={styles.socialmediacontainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => Linking.openURL(`${helplineinfo?.whatsapplink}`)}
        >
          <FontAwesome name="whatsapp" style={styles.btnicon} color="#53A553" />
          <Text style={[styles.btntext, { color: "#53A553" }]}>
            Join Us on Whatsapp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => Linking.openURL(`${helplineinfo?.telegramlink}`)}
        >
          <FontAwesome name="telegram" style={styles.btnicon} color="#0088cc" />
          <Text style={[styles.btntext, { color: "#0088cc" }]}>
            Join Us on Telegram
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <FontAwesome name="youtube" style={styles.btnicon} color="#FF0000" />
          <Text style={[styles.btntext, { color: "#FF0000" }]}>
            Join Us on Youtube
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <MaterialCommunityIcons
            name="web-check"
            style={styles.btnicon}
            color="#00B9FF"
          />
          <Text style={[styles.btntext, { color: "#00B9FF" }]}>
            Join Us on Website
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialmediaScreen;

const styles = StyleSheet.create({
  socialmediacontainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    width: "80%",
    marginBottom: 20,
  },
  btntext: {
    fontSize: 19,
  },
  btnicon: {
    fontSize: 30,
    marginRight: 10,
  },
});
