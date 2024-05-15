/** @format */

import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Rider from "../../assets/images/rider.jpg";
import Verified from "../../assets/icon/verified.svg";
import Phone from "../../assets/icon/phone2.svg";
import Chat from "../../assets/icon/chat2.svg";
import MapViewDirections from "react-native-maps-directions";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { GOOGLEKEY } from "../_shared";

const Tracking = () => {
  const { width, height } = Dimensions.get("window");
  const handleCallPress = () => {
    const phoneUrl = `tel:${"09023456789"}`;
    Linking.openURL(phoneUrl);
  };
  const [showDirections, setShowDirections] = useState(true);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef(null);
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: 40.76711,
    longitude: -73.979704,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const [origin, setOrigin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [destination, setDestination] = useState({
    latitude: 37.75825,
    longitude: -122.4224,
  });

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        // provider={PROVIDER_GOOGLE}
        // initialRegion={INITIAL_POSITION}
        region={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: Math.abs(origin.latitude - destination.latitude) * 2,
          longitudeDelta:
            Math.abs(origin.longitude - destination.longitude) * 2,
        }}
      >
        <Marker coordinate={origin}>
          <AntDesign name="car" size={20} color="black" />
        </Marker>
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLEKEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>

      {/* BACK BUTTON */}
      <View className="absolute top-0 flex items-start justify-start h-full w-full px-5 mt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0077B6]"
        >
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tracking;
