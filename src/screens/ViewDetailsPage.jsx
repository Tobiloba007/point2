/** @format */

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Box from "../../assets/icon/box3.svg";
import Line from "../../assets/icon/line.svg";
import Copy from "../../assets/icon/copy.svg";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// import * as Clipboard from 'expo-clipboard';

export default function ViewDetailsPage({ route }) {
  const { data } = route.params;


  const [copiedText, setCopiedText] = useState(data.package_name);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data.package_name);
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex items-start justify-start w-full h-full bg-white px-5 pt-8">
      {/*HEADER */}
      <View className="relative flex flex-row items-center justify-center w-full bg-white pb-7 shadow-2xl">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0 flex flex-row items-center justify-start w-full"
        >
          <Feather name="arrow-left" size={18} color="#344054" />
          <Text
            className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text
          className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}
        >
          Package Details
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ width: "100%", paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        {/* PRODUCT */}
        <View className="flex flex-row items-start justify-start w-full mt-8">
          <View className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#EBF8FF]">
            <Box />
          </View>
          <View className="flex-1 items-start justify-start ml-5">
            <Text className={`text-sm text-[#344054] font-['bold']`}>
              {data.package_name}
            </Text>
            <View className="flex flex-row items-center justify-start">
              <Text
                className={`text-sm text-[#1D2939] font-['regular'] pt-[6px]`}
              >
                Tracking ID: {copiedText}
              </Text>
              <TouchableOpacity onPress={copyToClipboard} className="ml-2">
                <Copy />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* PRODUCT DETAILS */}
        <View className="flex flex-row items-start justify-start w-full mt-8">
          <View className="flex items-start justify-start">
            <Text className={`text-xs text-[#475467] font-['medium']`}>
              Recipient Name
            </Text>
            <Text className={`text-sm text-[#344054] font-['bold'] pt-1`}>
              {data.recepient_name}
            </Text>
          </View>

          <View className="flex items-start justify-start ml-12">
            <Text className={`text-xs text-[#475467] font-['medium']`}>
              Package Weight
            </Text>
            <Text className={`text-sm text-[#344054] font-['bold'] pt-1`}>
              30 KG
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-start justify-start w-full mt-5">
          <View className="flex items-start justify-start">
            <Text className={`text-xs text-[#475467] font-['medium']`}>
              Expected Delivery Time
            </Text>
            <Text className={`text-sm text-[#344054] font-['bold'] pt-1`}>
              {data.time}
            </Text>
          </View>

          <View className="flex items-start justify-start ml-12">
            <Text className={`text-xs text-[#475467] font-['medium']`}>
              Amount Paid (N)
            </Text>
            <Text className={`text-sm text-[#344054] font-['bold'] pt-1`}>
               ₦{data.amount}
            </Text>
          </View>
        </View>

        <View className="flex items-center justify-start rounded-2xl bg-[#F9FAFB] mt-5 p-4">
          <View className="flex flex-row items-start justify-start w-full">
            <Octicons name="dot-fill" size={20} color="#CCE4F0" />
            <View className="flex-1 items-start justify-start ml-2 pt-[2px]">
              <Text className={`text-xs text-[#1D2939] font-['medium']`}>
                From
              </Text>
              <Text className={`text-sm text-[#344054] font-['bold'] pt-[2px]`}>
                {data.pickup_location}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-start justify-start w-full mt-5">
            <Octicons name="dot-fill" size={20} color="#32D583" />
            <View className="flex-1 items-start justify-start ml-2 pt-[2px]">
              <Text className={`text-xs text-[#1D2939] font-['medium']`}>
                Shipped to
              </Text>
              <Text className={`text-sm text-[#344054] font-['bold'] pt-[2px]`}>
                {data.delivery_point_location}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-start justify-start w-full mt-8 pb-2 pl-5">
            <Text className={`text-sm text-[#344054] font-['bold']`}>
            Status: {
              data.status === 'ASSIGNEDTORIDER' ? 'Assigned To Rider'
             :data.status === 'PENDING' ? 'Pending'
             :data.status === 'INTRANSIT' ? 'In-Transit'
             :data.status === 'DELIVERED' ? 'Delivered'
             :data.status === 'CANCELLED' && 'Cancelled'
            }
            </Text>
            <View className="ml-1">
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={
                  data.status === 'DELIVERED' ? '#32D583'
                 :data.status === 'CANCELLED' ? '#EB5757'
                 :data.status === 'ASSIGNEDTORIDER' ? '#32D583'
                 :data.status === 'PENDING' ? '#F2994A'
                 :data.status === 'INTRANSIT' && '#F2994A'
              }
              />
            </View>
          </View>
        </View>

        {/* PRODUCT STATUSES */}
        <View className="flex items-start justify-start w-full mt-6">
          {/* PICKED UP */}
          <View className="flex flex-row items-start justify-start w-full">
            <View className="flex items-center justify-start">
              <Octicons name="dot-fill" size={18} color="#0077B6" />
              <View className="-mt-[6px]">
                <Line />
              </View>
            </View>

            <View className="flex items-start ml-4">
              <Text className={`text-base text-[#344054] font-['bold']`}>
                Picked Up
              </Text>
              <Text className={`text-sm text-[#475467] font-['regular']`}>
                {data.pickup_location}
              </Text>
            </View>
          </View>

          {/* CONFIRMATION CODE */}
          <View className="flex flex-row items-start justify-start w-full -mt-3">
            <View className="flex items-center justify-start">
              <Octicons name="dot-fill" size={18} color="#0077B6" />
              <View className="-mt-[6px]">
                <Line />
              </View>
            </View>

            <View className="flex items-start ml-4">
              <Text className={`text-base text-[#344054] font-['bold']`}>
                Confirmation Code Generated
              </Text>
              <View className="flex flex-row items-center justify-start mt-1">
                <Text className={`text-sm text-[#475467] font-['medium']`}>
                  KJ676
                </Text>
                <TouchableOpacity className="ml-2">
                  <Copy />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* IN TRANSIT */}
          <View className="flex flex-row items-start justify-start w-full -mt-3">
            <View className="flex items-center justify-start">
              <Octicons name="dot-fill" size={18} color="#0077B6" />
              <View className="-mt-[6px]">
                <Line />
              </View>
            </View>

            <View className="flex items-start ml-4">
              <Text className={`text-base text-[#344054] font-['bold']`}>
                In Transit
              </Text>
              <Text className={`text-sm text-[#475467] font-['regular']`}>
                Package picked up by rider
                <Text className={`font-['medium']`}> (KJA-884-RM)</Text>
              </Text>
            </View>
          </View>

          {/* DELIVERED */}
          <View className="flex flex-row items-start justify-start w-full -mt-3">
            <View className="flex items-center justify-start">
              <Octicons name="dot-fill" size={18} color="#27AE60" />
            </View>

            <View className="flex items-start ml-4">
              <Text className={`text-base text-[#344054] font-['bold']`}>
                Delivered
              </Text>
              <Text className={`text-sm text-[#475467] font-['regular']`}>
                {data.delivery_point_location}
              </Text>
            </View>
          </View>
        </View>

        {/* BUTTON */}
        {/*<View className="flex items-center justify-center mt-14">
               <TouchableOpacity onPress={()=>navigation.navigate('rateRider')}
               className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                   <Text className={`text-base font-[bold] text-white`}>Rate Rider</Text>
               </TouchableOpacity>
           </View>*/}

        {/* BUTTON */}
        <View className="flex items-center justify-center mt-14">
          <TouchableOpacity
            onPress={() => navigation.navigate("tracking", { data: data })}
            className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]"
          >
            <Text className={`text-base font-[bold] text-white`}>
              Live Tracking
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
