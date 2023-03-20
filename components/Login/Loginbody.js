import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { setloginstatus } from "../slices/navSlices";
import NetInfo from "@react-native-community/netinfo";

const Loginbody = () => {
  const Navigation = useNavigation();
  const [looding, setlooding] = useState(false);
  const dispatch = useDispatch();

  const LoginFormSchema = Yup.object().shape({
    phone: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });
  const hanldelogin = async (phone, pass) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        setlooding(true);
        try {
          axios({
            method: "post",
            url: "https://offerapp.onrender.com/login",
            data: {
              phone: phone,
              pass,
            },
          })
            .then(async (res) => {
              await AsyncStorage.setItem("Userdata", JSON.stringify(res.data));
              setlooding(false);
              dispatch(setloginstatus(true));
            })
            .catch((error) => {
              Alert.alert("Invalid Credientials");
              setlooding(false);
              console.log(error);
            });
        } catch (error) {
          Alert.alert("Invalid Credientials");
          setlooding(false);
          console.log(error);
        }
      } else {
        Alert.alert("Pleae Check your Internet");
      }
    });
  };
  return (
    <ScrollView
      style={{
        height: "100%",
        paddingHorizontal: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        onSubmit={(values) => {
          hanldelogin(values.phone, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View style={styles.singupform}>
              <View style={styles.singleinput}>
                <TextInput
                  placeholder="Phone Number"
                  style={styles.input}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.singleinput}>
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>

              <View style={{ width: "100%", alignItems: "center" }}>
                {looding == true ? (
                  <ActivityIndicator animating={true} color="green" size={20} />
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#006f2d",
                      justifyContent: "center",
                      alignItems: "center",
                      width: wp("80%"),
                      height: hp("5%"),
                    }}
                    onPress={() => handleSubmit()}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        )}
      </Formik>
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => Linking.openURL("tel:01622335054")}>
          <Text style={{ fontSize: 19, fontWeight: "bold", color: "#4E6C50" }}>
            Help?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footertext}>
        <View style={styles.singlefootertext}>
          <Text style={{ fontSize: 15, color: "black", marginRight: 8 }}>
            Forget Password ?
          </Text>
          <TouchableOpacity
            onPress={() => Navigation.navigate("RequestForgetpass")}
          >
            <Text
              style={{ fontSize: 19, color: "#006f2d", fontWeight: "bold" }}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.singlefootertext}>
          <Text style={{ fontSize: 15, color: "black", marginRight: 8 }}>
            Create an free Account ?
          </Text>
          <TouchableOpacity onPress={() => Navigation.navigate("SignupScreen")}>
            <Text
              style={{ fontSize: 19, color: "#006f2d", fontWeight: "bold" }}
            >
              Registration
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Loginbody;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: hp("7%"),
    fontWeight: "bold",
    color: "#4E6C50",
    fontSize: 17,
  },
  singleinput: {
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  singupform: {
    width: "100%",
    marginBottom: 10,
    zIndex: -999,
  },

  footertext: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  singlefootertext: {
    marginBottom: 15,
    alignItems: "center",
  },
});
