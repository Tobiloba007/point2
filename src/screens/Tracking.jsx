/** @format */

import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
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




const Tracking = ({ route }) => {
  const { data } = route.params;
  
  // const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
  const apiKey = "AIzaSyCwBek1VbADBzfIdYFW0R6UQmCoogeqyoc"
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

  const originLatitude = data?.pickup_location_coordinate
    ? data.pickup_location_coordinate[0]
    : null;
  const originLongitude = data?.pickup_location_coordinate
    ? data.pickup_location_coordinate[1]
    : null;
  const destinationLatitude = data?.delivery_point_location_coordinate
    ? data.delivery_point_location_coordinate[0]
    : null;
  const destinationLongitude = data?.delivery_point_location_coordinate
    ? data.delivery_point_location_coordinate[1]
    : null;

  const [origin, setOrigin] = useState({
    latitude: originLatitude,
    longitude: originLongitude,
  });
  const [destination, setDestination] = useState({
    latitude: destinationLatitude,
    longitude: destinationLongitude,
  });

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

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
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        // initialRegion={INITIAL_POSITION}
        region={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: Math.abs(origin.latitude - destination.latitude) * 2,
          longitudeDelta:
            Math.abs(origin.longitude - destination.longitude) * 2,
        }}
        scrollEnabled={true}
        rotateEnabled={true}
        showsUserLocation={true}
        followUserLocation={true}
        loadingEnabled={true}
        pitchEnabled={true}
        showsIndoorLevelPicker={true}
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
            apikey={apiKey}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
        <View style={{ padding: 26 }}>
          <TouchableOpacity style={styles.button} onPress={traceRoute}>
            <AntDesign name="arrowsalt" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text>back</Text>
        </TouchableOpacity>
        <View
          style={{
            padding: 16,
            position: "absolute",
            right: 10,
          }}
        >
          {distance && duration ? (
            <View>
              <Text>Distance: {distance.toFixed(2)}</Text>
              <Text>Duration: {Math.ceil(duration)} min</Text>
            </View>
          ) : null}
        </View>
      </MapView>
    </View>
  );
};

export default Tracking;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  map: {
    height: "100%",
    flex: 1,
    width: "100%",
  },

  button: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2.22,
    elevation: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
  },
});