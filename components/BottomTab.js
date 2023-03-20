import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BottomTab = () => {
  const Navigation = useNavigation();

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomwrapper}>
        <TouchableOpacity
          style={styles.singleItem}
          onPress={() => Navigation.navigate("HomeScreen")}
        >
          <MaterialCommunityIcons
            name="home"
            size={25}
            style={styles.icon}
            // color={activeScreen == "HomeScreen" ? "#edbe39" : "#525252"}
          />
          <Text style={styles.bottomtext}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.singleItem}
          onPress={() => Navigation.navigate("OfferScreen")}
        >
          <Image
            source={require("../assets/offer.png")}
            style={styles.icon}
            resizeMode="cover"
          />
          <Text style={styles.bottomtext}>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.singleItem}
          onPress={() => Navigation.navigate("HistoryScreen")}
        >
          <Image
            source={require("../assets/orderhistory.png")}
            style={styles.icon}
          />
          <Text style={styles.bottomtext}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.singleItem}
          onPress={() => Navigation.navigate("ProfileScreen")}
        >
          <MaterialCommunityIcons
            name="account-settings"
            size={25}
            style={styles.icon}
            // color={activeScreen == "ProfileScreen" ? "#edbe39" : "#525252"}
          />
          <Text style={styles.bottomtext}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  bottomContainer: {
    height: hp("10%"),
    backgroundColor: "#f1faf5",
    zIndex: 999,
    width: "100%",
  },
  bottomwrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  singleItem: {
    width: wp("15%"),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: wp("6.5%"),
    height: hp("3.5%"),
    color: "green",
  },
});
