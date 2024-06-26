import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CountryPicker } from "react-native-country-codes-picker";
import Layout from "../../../layouts/layout";
import axios from "axios";
import { BASE_URL } from "../../../constants/base_urls";

export default function EditDetails({ setPages }) {
  const user = useSelector((state) => state.auth.user);
  const access_token = useSelector((state) => state.auth.token);

  const [eye, setEye] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const insets = useSafeAreaInsets();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("" || "+234");

  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;

  const values = {
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    email: email,
  };

  const handleSubmit = async () => {
    // setPages(0);
    try {
      const resp = await axios.post(
        `${BASE_URL}/profile/edit-details`,
        { ...values },
        {
          headers: {
            Authorization: "Bearer " + access_token ?? "",
          },
        }
      );
      console.log(resp);
      if (resp.data.status_code === 200) {
        alert(resp.data.message);
        // fetch user func here
      }
    } catch (error) {
      console.log("error editing user", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        width: screenWidth,
        paddingBottom: 40,
        paddingTop: insets.top,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex items-start justify-start w-full bg-white px-5">
        <View className="relative flex flex-row items-center justify-center w-full mt-3">
          <TouchableOpacity
            onPress={() => setPages(0)}
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
            Edit details
          </Text>
        </View>

        <KeyboardAvoidingView className="flex items-center justify-start w-full mt-8">
          {/* FIRST NAME */}
          <View className="relative items-start justify-start w-full mt-3">
            <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
              First Name
            </Text>
            <TextInput
              className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5`}
              placeholder="First Name"
              placeholderTextColor={"#667085"}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              keyboardType="default"
            />
          </View>

          {/* LAST NAME */}
          <View className="relative items-start justify-start w-full mt-3">
            <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
              Last Name
            </Text>
            <TextInput
              className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-5"
              placeholder="Last Name"
              placeholderTextColor={"#667085"}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              keyboardType="default"
            />
          </View>

          {/* PHONE */}
          <View className="relative items-start justify-start w-full mt-3">
            <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
              Phone number
            </Text>
            <TextInput
              className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-[87px]"
              placeholder="90722245789"
              placeholderTextColor={"#667085"}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType="number-pad"
            />
            {/* <View className="absolute bottom-[13px] left-4 flex flex-row items-center justify-start">
              <Text
                className={`text-base text-[#101828] font-['regular'] mr-1`}
              >
                +234
              </Text>
              <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
            </View> */}
            <TouchableOpacity
              onPress={() => setShow(true)}
              className="absolute top-[57px] left-4 flex flex-row items-center justify-start"
            >
              <Text
                // style={{
                //   color: "white",
                //   fontSize: 20,
                // }}
                className={`text-base text-[#101828] font-['regular'] mr-1`}
              >
                {countryCode}
              </Text>
              <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
            </TouchableOpacity>
          </View>

          {/* EMAIL */}
          <View className="relative items-start justify-start w-full mt-3">
            <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
              Email Address
            </Text>
            <TextInput
              className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-14"
              placeholder="example@mail.com"
              placeholderTextColor={"#667085"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            <View className="absolute bottom-[13px] left-4 flex flex-row items-center justify-start">
              <Feather name="mail" size={22} color="#667085" />
            </View>
          </View>

          {/* BUTTON */}
          <View className="flex items-center justify-center w-full mt-12">
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]"
            >
              <Text className={`text-base font-[bold] text-white`}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      <CountryPicker
        onBackdropPress={() => setShow(false)}
        style={{
          modal: {
            height: 500,
          },
        }}
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </ScrollView>
  );
}
