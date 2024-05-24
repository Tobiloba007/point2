import React, { useCallback, useEffect, useState } from "react";
import AppStack from "./src/AppStack";
import axios from "axios";
import { setLoginToken, setUser } from "./src/features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [fetchedUser, setFetchedUser] = useState(false);
  const [accessTokenIsSet, setAccessTokenIsSet] = useState(false);
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.auth.token);

  const [fontsLoaded, fontError] = useFonts({
    black: require("./fonts/Satoshi-Black.otf"),
    bold: require("./fonts/Satoshi-Bold.otf"),
    medium: require("./fonts/Satoshi-Medium.otf"),
    regular: require("./fonts/Satoshi-Regular.otf"),
    light: require("./fonts/Satoshi-Light.otf"),
  });

  //   const fetchUser = useCallback(async () => {
  //     try {
  //       const response = await axios.get("url");
  //       if (response.status === 200) {
  //         dispatch(setUser(response.data.data.user_data));
  //         setFetchedUser(true);
  //       }
  //     } catch (error) {
  //       console.log("error fetching user", error);
  //     }
  //   }, []);

  const fetchUser = useCallback(async () => {
    if (accessTokenIsSet) {
      const response = await axios.get("url", {
        headers: {
          Authorization: "Bearer " + access_token ?? "",
        },
      });
      if (response.status === "success") {
        dispatch(setUser(response.data.data.user_data));
        dispatch(setLoginToken(response.data.data.access_token))
        setFetchedUser(true);
      } else {
        console.log("here");
        setFetchedUser(true);
      }
    }
    setFetchedUser(true); // remove later if api is provided
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fetchedUser) {
      await SplashScreen.hideAsync();
    }
  }, [fetchedUser]);

  useEffect(() => {
    if (accessTokenIsSet) {
      fetchUser();
    }
  }, [accessTokenIsSet]);

  useEffect(() => {
    AsyncStorage.getItem("loginToken").then((data) => {
      dispatch(setLoginToken(data));
      setAccessTokenIsSet(true);
    });
  }, []);

  if (!fetchedUser) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("./assets/images/splashScreen.png")}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppStack />
    </View>
  );
};

export default Index;
