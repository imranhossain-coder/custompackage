import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { setloginstatus } from "../slices/navSlices";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const DATA = [
  {
    title: "অ্যাড ব্যালেন্স",
    color: "#bff733",
    linearcolor: "#4b9cb2",
    image: require("../../assets/addmoney.png"),
    screen: "AddbalanceScreen",
  },
  {
    title: "অফার",
    color: "#eb4efb",
    linearcolor: "#7b26dd",
    image: require("../../assets/offer.png"),
    screen: "OfferScreen",
  },
  {
    title: "রিফান্ড",
    color: "#29b9ea",
    linearcolor: "#5e7fbf",
    image: require("../../assets/refund.png"),
    screen: "RefundScreen",
  },
  {
    title: "নিয়ম কানুন",
    color: "#f9413c",
    linearcolor: "#feec67",
    image: require("../../assets/rules.png"),
    screen: "RulesScreen",
  },
  {
    title: "ভিডিও",
    color: "#f7ba12",
    linearcolor: "#eb3e20",
    image: require("../../assets/video.png"),
    screen: "VideoScreen",
  },
  {
    title: "হেল্প লাইন",
    color: "#00d4b3",
    linearcolor: "#00a6f1",
    image: require("../../assets/help.png"),
    screen: "HelplineScreen",
  },
  {
    title: "রেটিং দিন",
    color: "#29b7e9",
    linearcolor: "#d790e7",
    image: require("../../assets/rating.png"),
    screen: "RatingScreen",
  },
  {
    title: "সামাজিক মাধ্যম",
    color: "#fe6185",
    linearcolor: "#ffada5",
    image: require("../../assets/social.png"),
    screen: "SocialmediaScreen",
  },

  {
    title: "লগ আউট",
    color: "#5fbf8b",
    linearcolor: "#1aa7dc",
    image: require("../../assets/logout.png"),
    screen: "LoginScreen",
  },
];

const SuggestionData = [
  {
    title: "Robi",
    image: require("../../assets/robi.png"),
  },
  {
    title: "Airtel",
    image: require("../../assets/airtel.png"),
  },
  {
    title: "Gp",
    image: require("../../assets/gp.png"),
  },
  {
    title: "BL",
    image: require("../../assets/bl.png"),
  },
];

const Homebody = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.singlebox}
        onPress={async () => {
          if (item.screen == "LoginScreen") {
            dispatch(setloginstatus(false));
            await AsyncStorage.removeItem("Userdata");
          } else {
            navigation.navigate(item.screen);
          }
        }}
      >
        <Image
          source={item.image}
          style={{ width: wp("10%"), height: wp("10%") }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: wp("4%"), marginTop: 10, fontWeight: "500" }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const rendersuggestionitem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.singlesuggest}
        onPress={() =>
          navigation.navigate("OfferScreen", { selectedoffer: index })
        }
      >
        <Image
          source={item.image}
          style={{ width: wp("10%"), height: wp("11%") }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: wp("4%"), fontWeight: "500" }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{ marginTop: 5, flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-around",
        }}
      />

      <View style={{ width: "100%", marginBottom: 50 }}>
        <Text
          style={{
            fontSize: wp("4.3%"),
            color: "black",
            marginLeft: 20,
            fontWeight: "400",
            letterSpacing: 1,
          }}
        >
          Suggestion
        </Text>
        <FlatList
          data={SuggestionData}
          showsHorizontalScrollIndicator={false}
          renderItem={rendersuggestionitem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          style={{
            width: "100%",
            marginTop: 5,
            paddingVertical: 10,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Homebody;

const styles = StyleSheet.create({
  singlebox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1faf5",
    height: hp("14%"),
    width: wp("25%"),
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  singlesuggest: {
    backgroundColor: "#f1faf5",
    width: wp("22%"),
    paddingVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
