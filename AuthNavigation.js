import React, { useEffect, useState } from "react";
import { Signinstack, Signoutstack } from "./Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectloginstatus, setUserToken } from "./components/slices/navSlices";
import { useDispatch, useSelector } from "react-redux";
const AuthNavigation = () => {
  const [currentUser, setcurrentUser] = useState(null);
  const loginstatus = useSelector(selectloginstatus);

  const dispatch = useDispatch();

  const Checkuser = async () => {
    const usertoken = await AsyncStorage.getItem("Userdata");
    const parsedata = JSON.parse(usertoken);

    if (loginstatus === null) {
      setcurrentUser(usertoken);
      dispatch(setUserToken(parsedata));
    } else {
      if (loginstatus === false) {
        setcurrentUser(false);
      } else {
        setcurrentUser(true);
        dispatch(setUserToken(parsedata));
      }
    }
  };
  useEffect(() => {
    Checkuser();
  });

  return <>{currentUser ? <Signinstack /> : <Signoutstack />}</>;
};
export default AuthNavigation;
