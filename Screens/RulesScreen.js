import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const RulesScreen = () => {
  const Navigation = useNavigation();
  return (
    <View style={{ height: "100%" }}>
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
          নিয়ম কানুন
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",

          height: "30%",
        }}
      >
        <Image
          source={require("../assets/rulesimg.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: 15,

          marginBottom: 10,
        }}
      >
        <Text
          style={{
            letterSpacing: 1,
            lineHeight: 25,
            fontSize: 17,
            color: "green",
          }}
        >
          ✅✅ আপনি অফার নেবেন কিন্তু অ্যাপে কোথায় কি আছে + কি ভাবে অ্যাড
          ব্যালেন্স করবেন তা জানার জন্য যদি আপনার ২ মিনিট সময় না থাকে তাহলে এই
          অ্যাপ আপনার জন্য নয় । তাই প্রথমে অবশ্যই অবশ্যই সম্পূর্ণ অ্যাপটি এবং
          ভিডিও ১০০% দেখে নেবেন ।
        </Text>
        <Text style={styles.rulestext}>
          1. অফারগুলা শুদু প্রিপেইড নাম্বারের জন্য প্রজোয্য। পোষ্টপেইড নাম্বারে
          নেওয়া যাবে না।
        </Text>
        <Text style={styles.rulestext}>
          2. যে নাম্বারে অফার একবার যাবে না সেটা আর দ্বিতীয়বার দিবেন না। অফার শো
          না করলে সারাদিন চেষ্টা করলেও যাবে না। আমরা শুধু অফারগুলো দিয়ে থাকি,
          এমবি মিনিট যায় টেলিকম অপারেটর সার্ভার থেকে।
        </Text>
        <Text style={styles.rulestext}>
          3. নাম্বার ভুল দিলে, ভুল নাম্বারে অফার চলে যাবে ফেরত আনা সম্ভব না।
        </Text>
        <Text style={styles.rulestext}>
          4.অফার সাকসেস হওয়ার জন্য ১-৫ মিনিট সময় লাগতে পারে। রবি এয়ারটেল অফার ২
          বারে পুরোটা যায় তাই কিছু সময় ওয়েট করবেন। মাজে মাজে বাংলালিংক অফার
          দেওয়ার পর ডুকতে সময় নেয় কিছুসময়।
        </Text>
        <Text style={styles.rulestext}>
          5. অনেক সময় অফার সাকসেস হলেও মোবাইলে এসএমএস আসে না তাই অ্যাপসে ডুকে
          এমবি মিনিট দেখে স্কিনশর্টসহ সিউর হয়ে কমপ্লেন করবেন।
        </Text>
        <Text style={styles.rulestext}>
          6. অফার না গেলে একাউন্ট টাকা ব্যাক চলে যাবে।
        </Text>
        <Text style={styles.rulestext}>
          7. রিচার্জ এর জন্য হাজরে কমিশন দেওয়া হয়ে থাকে। আমাদের এখানে রিচার্জ
          সিষ্টেম নাই বলে কোন আলাদা কমিশন দেওয়া হয়না। যা কমিশন আছে বাদ দিয়ে দাম
          বসানো আছে।
        </Text>
        <Text style={styles.rulestext}>
          8. পাইকারি সেল বন্ধ, সবার জন্য এক রেট, আপনি এখান থেকে এই রেটে নিয়ে
          অন্যদের কাছে আরো বেশি দামে সেল করে লাভ করতে পারবেন।
        </Text>
        <Text style={styles.rulestext}>
          9. গিফট প্যাক / ফ্যামেলি প্যাক নেওয়ার নিয়মঃ সিম বন্ধ থাকলে টাকা
          রিচার্জ করে চালু করে নিতে হবে। লোন থাকলে পরিশোধ করে নিতে হবে। পূবে
          নিয়ে থাকলে ১ মাস মেয়াদ শেষ হলে আবার নিতে পারবেন। পাবো কি না আগে চেক
          দেওয়া যায় না। গিফট প্যাক এ্যাপসের নির্দিষ্ট জায়গায় দেখতে পারবেন।
        </Text>
        <Text style={styles.rulestext}>
          10. এ্যাড ব্যালেন্স এবং রিফান্ড পলিসি ম্যানুতে দেওয়া আছে দেখে নিবেন।
        </Text>
        <Text style={styles.rulestext}>
          11. যে কোন প্রয়োজনে, হোয়াটসঅ্যাপ, টেলিগ্রাম এ মেসেজ দিবেন রিপ্লাই
          পাবেন। আগেই ডাইরেক্ট অথবা মোবাইল এ কল দিবেন না।
        </Text>
      </ScrollView>
    </View>
  );
};

export default RulesScreen;

const styles = StyleSheet.create({
  rulestext: {
    letterSpacing: 1,
    lineHeight: 25,
    fontSize: 17,
    color: "green",
    marginBottom: 5,
  },
});
