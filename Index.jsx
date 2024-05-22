import React, { useCallback, useEffect, useState } from "react";
import AppStack from "./src/AppStack";
import axios from "axios";
import { setUser } from "./src/features/AuthSlice";
import { useDispatch } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

const Index = () => {
  const [fetchedUser, setFetchedUser] = useState(false);
  const dispatch = useDispatch();

  const [fontsLoaded, fontError] = useFonts({
    black: require("./fonts/Satoshi-Black.otf"),
    bold: require("./fonts/Satoshi-Bold.otf"),
    medium: require("./fonts/Satoshi-Medium.otf"),
    regular: require("./fonts/Satoshi-Regular.otf"),
    light: require("./fonts/Satoshi-Light.otf"),
  });

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get("url");
      if (response.status === 200) {
        dispatch(setUser(response.data.data.user_data));
        setFetchedUser(true);
      }
    } catch (error) {
      console.log("error fetching user", error);
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fetchedUser && !fontsLoaded && !fontError) {
    return;
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppStack />
    </View>
  );
};

export default Index;
