import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SliderBox } from "react-native-image-slider-box";
import TextTicker from "react-native-text-ticker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setuserdynamic } from "../slices/navSlices";

const Header = () => {
  const { data: Profiledata = 0 } = useQuery(["profiledata"], () => getData(), {
    refetchInterval: 1500,
  });
  const [notice, setnotice] = useState("");
  const dispatch = useDispatch();
  const [Sliders, setSliders] = useState([]);
  const getData = async () => {
    const usertoken = await AsyncStorage.getItem("Userdata");
    const parsedata = JSON.parse(usertoken);

    let response = await axios({
      method: "post",
      url: "https://offerapp.onrender.com/getUserdata",
      data: {
        phone: parsedata?.phone,
      },
    });

    dispatch(setuserdynamic(response.data));

    return response.data;
  };
  const getnotice = async () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getnotice",
    })
      .then((res) => {
        setnotice(res.data.notice);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSliders = async () => {
    axios({
      method: "get",
      url: "https://offerapp.onrender.com/getsliders",
    })
      .then((res) => {
        setSliders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getnotice();
    getSliders();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.headerprofile}>
        <View style={styles.headerleftside}>
          <Text
            style={{
              fontSize: wp("6%"),
              fontWeight: "400",
              letterSpacing: 1,
              color: "#343f39",
            }}
          >
            HI , {Profiledata?.name}
          </Text>
          <View style={styles.btnwrapper}>
            <View style={[styles.btn, { backgroundColor: "#01b447" }]}>
              <Text style={{ color: "white", fontSize: wp("5%") }}>
                Balance: ৳{Profiledata?.balance}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.headerprofileright}>
          <Image
            source={require("../../assets/appicon.png")}
            style={{ width: 70, height: 70, borderRadius: 50 }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.notice}>
        <View
          style={{
            marginRight: 10,
            backgroundColor: "#ec4120",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Notice :</Text>
        </View>
        <TextTicker
          style={{ fontSize: wp("4%"), color: "#199441" }}
          duration={8000}
          loop
          scrollSpeed={200}
          repeatSpacer={50}
          marqueeDelay={1500}
        >
          {notice == "" ? "Loading" : notice}
        </TextTicker>
      </View>
      {Sliders.length !== 0 ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginVertical: 5,
            height: 100,
          }}
        >
          <SliderBox
            images={Sliders.map((data, index) => {
              return data.imgurl;
            })}
            ImageComponentStyle={{
              width: "95%",
              height: 120,
            }}
            imageLoadingColor="#2196F3"
            autoplay={true}
            onCurrentImagePressed={(index) =>
              Linking.openURL(Sliders[index].imglink)
            }
          />
        </View>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
  },

  headerprofile: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: wp("3%"),
    backgroundColor: "#e5f4ed",
  },
  headerprofileright: {
    alignItems: "center",
    justifyContent: "center",
  },
  notice: {
    backgroundColor: "#ebeeed",
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    height: hp("5%"),
    alignItems: "center",
  },
  btnwrapper: {
    flexDirection: "row",
  },
  btn: {
    height: hp("5%"),
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
    borderRadius: 20,
  },
  headerleftside: {
    alignItems: "center",

    width: "80%",
  },
});
