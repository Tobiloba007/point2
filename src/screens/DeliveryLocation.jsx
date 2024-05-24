/** @format */

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View, Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDelivery } from "../features/orderSlice";
import { useDispatch } from "react-redux";
import GooglePlaceInput from "../components/map-input";
import { CountryPicker } from "react-native-country-codes-picker";

const SignupSchema = Yup.object().shape({
  delivery_point_name: Yup.string().required(),
  delivery_point_phone: Yup.string()
    .required()
    .matches(/^(080|081|090|070|091)\d{8}$/),
  delivery_point_email: Yup.string().email("Invalid email").required(),
  // delivery_point_location: Yup.string().required(),
});

export default function DeliveryLocation({ route }) {
  const { setDeliveryState } = route.params;
  const [destination, setDestination] = useState(null);
  const [landmark, setLandmark] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("" || "+234");

  const navigation = useNavigation();

  const ScreenWidth = Dimensions.get("window").width;

  const optional = { landmark: landmark };

  const dispatch = useDispatch();

  const handlePlaceSelection = (details) => {
    setDestination(details);
  };

  const handleSubmit = async (values) => {
    const combinedData = {
      ...values,
      delivery_point_name: destination?.formatted_address,
      delivery_point_location: destination?.formatted_address,
      delivery_point_location_coordinate: [
        destination?.geometry?.location?.lat,
        destination?.geometry?.location?.lng,
      ],
    };
    dispatch(setDelivery(combinedData));
    navigation.goBack();
    setDeliveryState(true);
    console.log(combinedData);
  };

  return (
    <SafeAreaView className="flex items-start justify-start w-full h-full bg-white pt-8">
      {/*HEADER */}
      <View className="relative flex items-start justify-start w-full bg-white pb-1 shadow-2xl px-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`absolute left-5 flex flex-row items-center justify-start w-full ${Platform.OS === 'ios' && ' pt-5 w-[85%]'}`}
        >
          <Feather name="arrow-left" size={18} color="#344054" />
          <Text
            className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text className={`text-2xl text-[#101828] font-['bold'] mt-9 ${Platform.OS === 'ios' && ' pt-3 w-[85%]'}`}>
          Delivery Location
        </Text>
      </View>

      <Formik
        initialValues={{
          delivery_point_name: "",
          delivery_point_phone: "",
          delivery_point_email: "",
          delivery_point_location: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
          handleSubmit,
        }) => (
          <ScrollView
            contentContainerStyle={{
              width: ScreenWidth,
              paddingBottom: 40,
              paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex items-start justify-start w-full mt-9">
              {/*RECIEVER NAME */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Reciever's name
                </Text>
                <TextInput
                  className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base 
                  font-['regular'] ${
                    touched.delivery_point_name &&
                    errors.delivery_point_name &&
                    "border-red-500"
                  } ${
                    touched.delivery_point_name &&
                    !errors.delivery_point_name &&
                    "border-[#0077B6]"
                  }`}
                  placeholder="Enter receiver's name"
                  values={values.delivery_point_name}
                  onChangeText={handleChange("delivery_point_name")}
                  onBlur={() => setFieldTouched("delivery_point_name")}
                  keyboardType="default"
                />
              </View>

              {/*PHONE */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Reciever Phone number
                </Text>
                <View className="relative w-full">
                  <TextInput
                    className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-[87px] text-[#667085] 
                      text-base font-['regular'] ${
                        touched.delivery_point_phone &&
                        errors.delivery_point_phone &&
                        "border-red-500"
                      } ${
                      touched.delivery_point_phone &&
                      !errors.delivery_point_phone &&
                      "border-[#0077B6]"
                    }`}
                    placeholder="090 0000 0000"
                    values={values.delivery_point_phone}
                    onChangeText={handleChange("delivery_point_phone")}
                    onBlur={() => setFieldTouched("delivery_point_phone")}
                    keyboardType="number-pad"
                  />
                  {touched.delivery_point_phone &&
                    errors.delivery_point_phone && (
                      <Text className="text-red-500 text-[10px] pt-1">
                        invalid phone number format
                      </Text>
                    )}
                  {/* <View className="absolute top-4 left-4 flex flex-row items-center justify-center">
                    <Text
                      className={`text-base text-[#101828] font-['regular'] mr-1`}
                    >
                      234
                    </Text>
                    <SimpleLineIcons
                      name="arrow-down"
                      size={12}
                      color="#667085"
                    />
                  </View> */}
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    className="absolute top-[18px] left-4 flex flex-row items-center justify-center"
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
                    <SimpleLineIcons
                      name="arrow-down"
                      size={12}
                      color="#667085"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* EMAIL */}
              <View className="relative items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Email Address
                </Text>
                <TextInput
                  className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                    text-[#344054] pl-14 ${
                      touched.delivery_point_email &&
                      errors.delivery_point_email &&
                      "border-red-500"
                    } 
                    ${
                      touched.delivery_point_email &&
                      !errors.delivery_point_email &&
                      "border-[#0077B6]"
                    }`}
                  placeholder="example@mail.com"
                  placeholderTextColor={"#667085"}
                  values={values.delivery_point_email}
                  onChangeText={handleChange("delivery_point_email")}
                  onBlur={() => setFieldTouched("delivery_point_email")}
                  keyboardType="email-address"
                />
                {touched.delivery_point_email &&
                  errors.delivery_point_email && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      invalid email format
                    </Text>
                  )}
                <View className="absolute top-[46px] left-4 flex flex-row items-center justify-start">
                  <Feather name="mail" size={22} color="#667085" />
                </View>
              </View>

              {/*RECIEVER'S ADDRESS */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Receiver's address
                </Text>
                <GooglePlaceInput onSelectPlace={handlePlaceSelection} />
              </View>

              {/*LANDMARK */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Landmark or B/stop
                </Text>
                <TextInput
                  className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base 
                  font-['regular'] ${landmark !== "" && "border-[#0077B6]"}`}
                  placeholder="Enter b/stop (optional)"
                  values={landmark}
                  onChangeText={(text) => setLandmark(text)}
                />
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              className={`flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6] mt-10 ${
                !isValid && "opacity-30"
              }`}
            >
              <Text className={`text-base text-[#FFFFFF] font-['bold'] ml-2`}>
                Save
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>

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
    </SafeAreaView>
  );
}
