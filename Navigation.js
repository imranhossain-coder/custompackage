import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./Screens/HomeScreen";
import OfferScreen from "./Screens/OfferScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import AddbalanceScreen from "./Screens/AddbalanceScreen";
import RefundScreen from "./Screens/RefundScreen";
import HistoryScreen from "./Screens/HistoryScreen";
import BuyofferScreen from "./Screens/BuyofferScreen";
import RulesScreen from "./Screens/RulesScreen";
import VideoScreen from "./Screens/VideoScreen";
import HelplineScreen from "./Screens/HelplineScreen";
import RatingScreen from "./Screens/RatingScreen";
import SocialmediaScreen from "./Screens/SocialmediaScreen";
import ForgetPassword from "./Screens/ForgetPassword";
import RequestForgetpass from "./Screens/RequestForgetpass";

const Stack = createNativeStackNavigator();

const Signinstack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_right",
        statusBarStyle: "light",
        statusBarColor: "#006f2d",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="OfferScreen" component={OfferScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AddbalanceScreen" component={AddbalanceScreen} />
      <Stack.Screen name="RefundScreen" component={RefundScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="BuyofferScreen" component={BuyofferScreen} />
      <Stack.Screen name="RulesScreen" component={RulesScreen} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="HelplineScreen" component={HelplineScreen} />
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
      <Stack.Screen name="SocialmediaScreen" component={SocialmediaScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  </NavigationContainer>
);
const Signoutstack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_right",
        statusBarStyle: "light",
        statusBarColor: "#006f2d",
      }}
    >
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="RequestForgetpass" component={RequestForgetpass} />
    </Stack.Navigator>
  </NavigationContainer>
);

export { Signinstack, Signoutstack };
