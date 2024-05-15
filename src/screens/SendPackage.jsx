/** @format */

import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import OrderSummary from "../components/sendPackage/OrderSummary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getCharges } from "../features/actions/General";
import getDistanceFromLatLonInKm from "../_shared/utils";

export default function SendPackage({ setTab }) {
  const details = [
    {
      id: 1,
      title: "PICKUP",
      desc: "Enter Pickup Details",
      link: "pickUpDetails",
    },
    {
      id: 2,
      title: "Delivery Location 1",
      desc: "Enter Delivery Details",
      link: "deliveryLocation",
    },
  ];

  const navigation = useNavigation();

  const [delivery, setDelivery] = useState("STANDARD_DELIVERY");
  const [payment, setPayment] = useState("card");
  const [whoPays, setWhoPays] = useState("sender");
  const [summary, setSummary] = useState(false);
  const [pickUp, setPickup] = useState(false);
  const [deliveryState, setDeliveryState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [coupon, setCoupon] = useState("");

  https: hanldeDelivery = (item) => {
    setDelivery(item);
  };

  hanldePayment = (item) => {
    setPayment(item);
  };

  hanldeWhoPays = (item) => {
    setWhoPays(item);
  };

  const deliveryType = { delivery_type: delivery };

  const dispatch = useDispatch();
  const pickUpData = useSelector((state) => state.order.pickup);
  const deliveryData = useSelector((state) => state.order.delivery);

  const oderValues = {
    ...pickUpData,
    ...deliveryData,
    ...deliveryType,
  };

  handleSummary = () => {
    let pickupLatitude, pickupLongitude;
    if (
      oderValues.pickup_location_coordinate &&
      oderValues.pickup_location_coordinate.length >= 2
    ) {
      pickupLatitude = oderValues.pickup_location_coordinate[0];
      pickupLongitude = oderValues.pickup_location_coordinate[1];
    } else {
      console.log("Pickup location coordinate is not properly defined.");
    }

    // Extract delivery point location latitude and longitude
    let deliveryLatitude, deliveryLongitude;
    if (
      oderValues.delivery_point_location_coordinate &&
      oderValues.delivery_point_location_coordinate.length >= 2
    ) {
      deliveryLatitude = oderValues.delivery_point_location_coordinate[0];
      deliveryLongitude = oderValues.delivery_point_location_coordinate[1];
    } else {
      console.log(
        "Delivery point location coordinate is not properly defined."
      );
    }
    const distanceS = getDistanceFromLatLonInKm(
      pickupLatitude,
      pickupLongitude,
      deliveryLatitude,
      deliveryLongitude
    );
    const formattedDistance = distanceS.toFixed(2);
    const payload = {
      ...oderValues,
      pickup_location_coordinate: [pickupLatitude, pickupLongitude],
      delivery_point_location_coordinate: [deliveryLatitude, deliveryLongitude],
      km: formattedDistance,
    };
    console.log("formattedDistance", formattedDistance);
    console.log("payloadd::", payload);

    dispatch(createOrder(payload, setLoading, setError, setSummary));
    dispatch(getCharges(formattedDistance, setLoading, setError));
  };

  const data = useSelector((state) => state.order.orderCharges);

  return (
    <SafeAreaView className="flex items-start justify-start w-full h-full bg-white px-5 pt-8">
      {/*HEADER */}
      <View className="relative flex items-start justify-start w-full bg-white pb-1 shadow-2xl">
        <TouchableOpacity
          onPress={() => setTab("Home")}
          className="absolute left-0 flex flex-row items-center justify-start w-full"
        >
          <Feather name="arrow-left" size={18} color="#344054" />
          <Text
            className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text className={`text-2xl text-[#101828] font-['bold'] mt-9`}>
          New Order
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/*PICKUP AND DELIVERY LOCATIONS TABS */}
        <View className="flex items-center justify-start w-full mt-9">
          {details.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate(item.link, {
                    setPickup,
                    setDeliveryState,
                  })
                }
                className={`flex flex-row items-start justify-between w-full rounded-lg bg-[#F9FAFB]
                             h-[58px] p-2 px-3 mb-5 ${
                               item.id === 1 &&
                               pickUp === true &&
                               "border-[1px] border-[#0077B6] "
                             }
                             ${
                               item.id === 2 &&
                               deliveryState === true &&
                               "border-[1px] border-[#0077B6] "
                             }`}
              >
                <View className="flex items-start justify-start">
                  <Text className={`text-sm text-[#344054] font-['medium']`}>
                    {item.title}
                  </Text>
                  <Text
                    className={`text-xs text-[#667085] font-['medium'] pt-1`}
                  >
                    {item.desc}
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={14}
                  color="black"
                />
              </TouchableOpacity>
            );
          })}

          {/*<TouchableOpacity onPress={()=>navigation.navigate('deliveryLocation')}
              className='flex flex-row items-center justify-between w-full rounded-lg bg-[#D9F2FF] h-[48px] p-2 px-3 mb-5'>
                 <Text className={`text-sm text-[#0077B6] font-['bold']`}>Add New Delivery Location</Text>
                 <Ionicons name="add-circle-outline" size={24} color="#0077B6" />
          </TouchableOpacity>*/}
        </View>

        {/*DELIVERY TYPES */}
        <View className="flex items-start justify-start w-full mt-3">
          <Text className={`text-sm text-[#344054] font-['bold'] mb-5`}>
            Delivery type
          </Text>

          <TouchableOpacity
            onPress={() => hanldeDelivery("STANDARD_DELIVERY")}
            className="flex flex-row items-center justify-start mb-4"
          >
            <View
              className={`h-5 w-5 rounded-full bg-[#D9D9D9] ${
                delivery === "STANDARD_DELIVERY" &&
                "bg-[#EBF8FF] border-2 border-[#0077B6]"
              }`}
            />
            <Text className={`text-sm text-[#344054] font-['medium'] ml-2`}>
              Standard Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => hanldeDelivery("EXPRESS_DELIVERY")}
            className="flex flex-row items-center justify-start mb-4"
          >
            <View
              className={`h-5 w-5 rounded-full bg-[#D9D9D9] ${
                delivery === "EXPRESS_DELIVERY" &&
                "bg-[#EBF8FF] border-2 border-[#0077B6]"
              }`}
            />
            <Text className={`text-sm text-[#344054] font-['medium'] ml-2`}>
              Express Delivery
            </Text>
          </TouchableOpacity>
        </View>

        {/* PAYMENT METHOD */}
        <View className="flex items-start justify-start w-full mt-3">
          <Text className={`text-sm text-[#344054] font-['bold'] mb-5`}>
            Payment Method
          </Text>

          <TouchableOpacity
            onPress={() => hanldePayment("card")}
            className="flex flex-row items-center justify-start mb-4"
          >
            <View
              className={`h-5 w-5 rounded-full bg-[#D9D9D9] ${
                payment === "card" && "bg-[#EBF8FF] border-2 border-[#0077B6]"
              }`}
            />
            <Text className={`text-sm text-[#344054] font-['medium'] ml-2`}>
              Card Payment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => hanldePayment("transfer")}
            className="flex flex-row items-center justify-start mb-4"
          >
            <View
              className={`h-5 w-5 rounded-full bg-[#D9D9D9] ${
                payment === "transfer" &&
                "bg-[#EBF8FF] border-2 border-[#0077B6]"
              }`}
            />
            <Text className={`text-sm text-[#344054] font-['medium'] ml-2`}>
              Pay with Transfer
            </Text>
          </TouchableOpacity>

          {/* SENDER AND RECIEVER PAY */}
          {payment === "transfer" && (
            <View className="flex items-start justify-center border-[1px] border-[#E4E7EC] h-[82px] w-full rounded-lg mb-5 pl-4">
              <TouchableOpacity
                onPress={() => hanldeWhoPays("sender")}
                className="flex flex-row items-center justify-start mb-4"
              >
                <View
                  className={`h-5 w-5 rounded-full bg-[#D9D9D9] ${
                    whoPays === "sender" &&
                    "bg-[#EBF8FF] border-2 border-[#0077B6]"
                  }`}
                />
                <Text className={`text-sm text-[#344054] font-['medium'] ml-2`}>
                  Sender Pay
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => hanldeWhoPays("reciever")}
                className="flex flex-row items-center justify-start"
              >
                <View
                  className={`h-5 w-5 rounded-full bg-[#D9D9D9] ${
                    whoPays === "reciever" &&
                    "bg-[#EBF8FF] border-2 border-[#0077B6]"
                  }`}
                />
                <Text className={`text-sm text-[#344054] font-['medium'] ml-2`}>
                  Reciever Pay
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ADD NEW CARD */}
          <TouchableOpacity className="flex flex-row items-center justify-start mb-4">
            <Feather name="plus" size={24} color="#0077B6" />
            <Text className={`text-sm text-[#0077B6] font-['medium'] ml-2`}>
              Add new Card
            </Text>
          </TouchableOpacity>

          {/* COUPON */}
          <View className="flex flex-row items-center justify-between w-full mt-3">
            <TextInput
              className={`flex-1 bg-[#F9FAFB] h-9 rounded-lg pl-3 text-sm font-['medium']`}
              placeholder="Apply Coupon Code"
              placeholderTextColor="#98A2B3"
              value={coupon}
              onChangeText={(text) => setCoupon(text)}
            />
            <TouchableOpacity
              disabled={coupon === ""}
              className={`flex items-center justify-center rounded-lg bg-[#003B5B] h-9 px-4 ml-5  ${
                coupon === "" && "opacity-60"
              }`}
            >
              <Text className={`text-sm text-[#FFFFFF] font-['bold']`}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ERROR */}
        <Text
          className={`text-sm text-red-500 font-['medium'] w-full text-start mt-6`}
        >
          {error}
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleSummary}
          className={`flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6] mt-3 ${
            summary && "opacity-30"
          }`}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text className={`text-base text-[#FFFFFF] font-['bold'] ml-2`}>
              Order Summary
            </Text>
          )}
        </TouchableOpacity>

        {summary && (
          <OrderSummary
            setTab={setTab}
            data={data}
            oderValues={oderValues}
            setPickup={setPickup}
            setDeliveryState={setDeliveryState}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
