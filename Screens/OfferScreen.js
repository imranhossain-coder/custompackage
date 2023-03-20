import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const OfferScreen = ({ route, navigation }) => {
  const Navigation = useNavigation();
  const layout = useWindowDimensions();
  const [Alloffers, setAlloffers] = useState([]);

  const [index, setIndex] = useState(
    route?.params?.selectedoffer == undefined ? 0 : route?.params?.selectedoffer
  );
  const [routes] = React.useState([
    { key: "robi", title: "ROBI" },
    { key: "airtel", title: "AIRTEL" },
    { key: "gp", title: "GP" },
    { key: "bl", title: "BL" },
  ]);

  const Getorderlock = async () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getorderlock",
    })
      .then((response) => {
        if (response.data?.lockstatus == "true") {
          Alert.alert("Offer Locked", `${response.data?.locknote}`, [
            {
              text: "Back",
              onPress: () => Navigation.goBack(),
              style: "cancel",
            },
          ]);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllpackages = () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getpackages",
    })
      .then((response) => {
        setAlloffers(response.data);
      })
      .catch((error) => {
        Alert.alert("Internal Server Problem");
      });
  };

  const RenderOffer = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.singleoffer}
        onPress={() => Navigation.navigate("BuyofferScreen", item)}
      >
        <View style={styles.leftoffer}>
          <Image
            source={
              item.packagecompany == "Robi"
                ? require("../assets/robi.png")
                : item.packagecompany == "Airtel"
                ? require("../assets/airtel.png")
                : item.packagecompany == "Grameenphone"
                ? require("../assets/gp.png")
                : item.packagecompany == "robi"
                ? require("../assets/robi.png")
                : item.packagecompany == "Banglalink"
                ? require("../assets/bl.png")
                : null
            }
            style={{ width: wp("10%"), height: hp("4%"), marginHorizontal: 10 }}
            resizeMode="contain"
          />
          <View style={styles.leftheader}>
            <Text style={{ fontWeight: "bold", fontSize: wp("4.5%") }}>
              {item.offertitle}
            </Text>

            <View style={styles.leftbottom}>
              <Text
                style={{
                  color: "#c5c7c5",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {item.offervalidity}
              </Text>
              <Text style={{ color: "#c5c7c5", fontWeight: "bold" }}>
                Discount : {item.discountprice} ৳
              </Text>
            </View>
            {item?.offernote ? (
              <Text style={{ color: "green", marginTop: 10 }}>
                Note: {item?.offernote}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.rightoffer}>
          <View
            style={{
              marginBottom: 10,
              width: wp("25%"),
              height: hp("5%"),
              borderRadius: 50,
              backgroundColor: "#278653",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: wp("5%"), color: "white", fontWeight: "bold" }}
            >
              {item.offerprice}
            </Text>
          </View>
          <Text style={{ color: "#c5c7c5", fontWeight: "bold" }}>
            Regular {item.regularprice}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={Alloffers.filter((elem) => elem?.packagecompany == "Robi").sort(
          (p1, p2) => p1.time < p2.time
        )}
        renderItem={RenderOffer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={Alloffers.filter((elem) => elem?.packagecompany == "Airtel").sort(
          (p1, p2) => p1.time < p2.time
        )}
        renderItem={RenderOffer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
  const thirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={Alloffers.filter(
          (elem) => elem?.packagecompany == "Grameenphone"
        ).sort((p1, p2) => p1.time < p2.time)}
        renderItem={RenderOffer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
  const fourRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#eceeec" }}>
      <FlatList
        data={Alloffers.filter(
          (elem) => elem?.packagecompany == "Banglalink"
        ).sort((p1, p2) => p1.time < p2.time)}
        renderItem={RenderOffer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
  const renderScene = SceneMap({
    robi: FirstRoute,
    airtel: SecondRoute,
    gp: thirdRoute,
    bl: fourRoute,
  });

  useEffect(() => {
    getAllpackages();
    Getorderlock();
  }, []);

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
          height: hp("7%"),
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: wp("6%"), color: "white", fontWeight: "400" }}>
          অফার
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

export default OfferScreen;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  singleoffer: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  leftoffer: {
    flexDirection: "row",
    width: "50%",
    height: "100%",
    alignItems: "center",
  },
  leftbottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftheader: {
    width: "100%",
    justifyContent: "space-between",
  },
  rightoffer: {
    marginRight: 10,
  },
});
