import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { setloginstatus } from "../slices/navSlices";

const Signupbody = () => {
  const Navigation = useNavigation();
  const [looding, setlooding] = useState(false);
  const dispatch = useDispatch();
  const LoginFormSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().required("email is required"),
    phone: Yup.string().required("phone is required"),
    password: Yup.string().required("password is required"),
  });
  const hanldelogin = async (name, email, phone, password) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        try {
          axios({
            method: "post",
            url: "https://offerapp.onrender.com/register",
            data: {
              name,
              email,
              phone,
              password,
              balance: 0,
            },
          })
            .then(async (res) => {
              await AsyncStorage.setItem("Userdata", JSON.stringify(res.data));
              setlooding(false);
              dispatch(setloginstatus(true));
            })
            .catch((error) => {
              Alert.alert("Registration Failed");
              setlooding(false);
            });
        } catch (error) {
          setlooding(false);

          console.log(error);
          Alert.alert("Internal Problem");
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
          name: "",
          email: "",
          phone: "",
          password: "",
        }}
        onSubmit={(values) => {
          hanldelogin(values.name, values.email, values.phone, values.password);
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
                <View
                  style={{
                    width: wp("12%"),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderColor: "#f4f5f4",
                  }}
                >
                  <Ionicons name="person-outline" size={30} />
                </View>

                <TextInput
                  placeholder="Name"
                  style={styles.input}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.singleinput}>
                <View
                  style={{
                    width: wp("12%"),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderColor: "#f4f5f4",
                  }}
                >
                  <AntDesign name="mail" size={30} style={styles.inputicon} />
                </View>
                <TextInput
                  placeholder="email"
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>

              <View style={styles.singleinput}>
                <View
                  style={{
                    width: wp("12%"),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderColor: "#f4f5f4",
                  }}
                >
                  <AntDesign name="phone" size={30} style={styles.inputicon} />
                </View>
                <TextInput
                  placeholder="Phone"
                  style={styles.input}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
              </View>
              <View style={styles.singleinput}>
                <View
                  style={{
                    width: wp("12%"),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderColor: "#f4f5f4",
                  }}
                >
                  <AntDesign name="lock1" size={30} style={styles.inputicon} />
                </View>
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>

              {looding === true ? (
                <ActivityIndicator animating={true} color="red" />
              ) : (
                <View style={{ width: "100%", alignItems: "center" }}>
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
                      Registration
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
            Haven't Account ?
          </Text>
          <TouchableOpacity onPress={() => Navigation.navigate("LoginScreen")}>
            <Text
              style={{ fontSize: 19, color: "#006f2d", fontWeight: "bold" }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signupbody;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: hp("7%"),
    fontWeight: "bold",
    color: "#4E6C50",
    fontSize: 17,
    marginLeft: 10,
  },
  singleinput: {
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
    flexDirection: "row",
  },
  singupform: {
    width: "100%",
    marginBottom: 10,
  },

  footertext: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  singlefootertext: {
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
  },
});
