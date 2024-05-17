/** @format */

import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setPickUp } from "../features/orderSlice";
import GooglePlaceInput from "../components/map-input";

const SignupSchema = Yup.object().shape({
  customer_name: Yup.string().required(),
  customer_phone: Yup.string()
    .required()
    .matches(/^(080|081|090|070|091)\d{8}$/),
  customer_email: Yup.string().email("Invalid email").required(),
  // pickup_location: Yup.string().required(),
  package_name: Yup.string().required(),
});

export default function PickUpDetails({ route }) {
  const { setPickup } = route.params;
  const [dropDown, setDropDown] = useState(false);
  const [selectedOption, setSelelctedOption] = useState("Select Category");
  const [landmark, setLandmark] = useState("");
  const [origin, setOrigin] = useState(null);

  const navigation = useNavigation();

  const ScreenWidth = Dimensions.get("window").width;

  const options = [
    {
      id: 1,
      name: "Computer Accesories",
    },
    {
      id: 2,
      name: "Documents",
    },
    {
      id: 3,
      name: "Electronics",
    },
    {
      id: 4,
      name: "Food",
    },
    {
      id: 5,
      name: "Others",
    },
  ];

  const handleOption = (item) => {
    setSelelctedOption(item);
    setDropDown(false);
  };

  const handlePlaceSelection = (details) => {
    setOrigin(details);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const combinedData = {
      ...values,
      package_category: selectedOption,
      pickup_location: origin?.formatted_address,
      pickup_location_coordinate: [
        origin?.geometry?.location?.lat,
        origin?.geometry?.location?.lng,
      ],
    };
    navigation.goBack();
    dispatch(setPickUp(combinedData));
    setPickup(true);
    console.log(combinedData);
  };

  return (
    <SafeAreaView className="flex items-start justify-start w-full h-full bg-white pt-8">
      {/*HEADER */}
      <View className="relative flex items-start justify-start w-full bg-white pb-1 shadow-2xl px-5">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-5 flex flex-row items-center justify-start w-full"
        >
          <Feather name="arrow-left" size={18} color="#344054" />
          <Text
            className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text className={`text-2xl text-[#101828] font-['bold'] mt-9`}>
          Pickup details
        </Text>
      </View>

      <Formik
        initialValues={{
          customer_name: "",
          customer_phone: "",
          customer_email: "",
          pickup_location: "",
          package_name: "",
          // quantity: "",
          // value: "",
        }}
        validationSchema={""}
        onSubmit={handleSubmit}
        resetForm={false}
        //   isInitialValid={true}
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
              paddingBottom: 140,
              paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex items-start justify-start w-full mt-9">
              {/*CUSTOMER NAME */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Customer name
                </Text>
                <TextInput
                  className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base 
                  font-['regular'] ${
                    touched.customer_name &&
                    errors.customer_name &&
                    "border-red-500"
                  } ${
                    touched.customer_name &&
                    !errors.customer_name &&
                    "border-[#0077B6]"
                  }`}
                  placeholder="Name"
                  values={values.customer_name}
                  onChangeText={handleChange("customer_name")}
                  onBlur={() => setFieldTouched("customer_name")}
                  keyboardType="default"
                />
              </View>

              {/*PHONE */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Phone number
                </Text>
                <View className="relative w-full">
                  <TextInput
                    className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-[75px] text-[#667085] 
                      text-base font-['regular'] ${
                        touched.customer_phone &&
                        errors.customer_phone &&
                        "border-red-500"
                      } ${
                      touched.customer_phone &&
                      !errors.customer_phone &&
                      "border-[#0077B6]"
                    }`}
                    placeholder="090 0000 0000"
                    values={values.customer_phone}
                    onChangeText={handleChange("customer_phone")}
                    onBlur={() => setFieldTouched("customer_phone")}
                    keyboardType="number-pad"
                  />
                  {touched.customer_phone && errors.customer_phone && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      invalid phone number format
                    </Text>
                  )}
                  <View className="absolute top-4 left-4 flex flex-row items-center justify-center">
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
                  </View>
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
                    touched.customer_email &&
                    errors.customer_email &&
                    "border-red-500"
                  } 
                  ${
                    touched.customer_email &&
                    !errors.customer_email &&
                    "border-[#0077B6]"
                  }`}
                  placeholder="example@mail.com"
                  placeholderTextColor={"#667085"}
                  values={values.email}
                  onChangeText={handleChange("customer_email")}
                  onBlur={() => setFieldTouched("customer_email")}
                  keyboardType="email-address"
                />
                {touched.customer_email && errors.customer_email && (
                  <Text className="text-red-500 text-[10px] pt-1">
                    invalid email format
                  </Text>
                )}
                <View className="absolute top-[46px] left-4 flex flex-row items-center justify-start">
                  <Feather name="mail" size={22} color="#667085" />
                </View>
              </View>

              {/*PICKUP ADDRESS */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Pickup address
                </Text>
                <GooglePlaceInput onSelectPlace={handlePlaceSelection} />
              </View>

              {/*LANDMARK */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Landmark or B/stop
                </Text>
                <TextInput
                  className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']
                  ${landmark !== "" && "border-[#0077B6]"}`}
                  placeholder="Enter b/stop (optional)"
                  values={landmark}
                  onChangeText={(text) => setLandmark(text)}
                  keyboardType="default"
                />
              </View>
            </View>

            <Text className={`text-lg text-[#0077B6] font-['bold'] mt-4 mb-5`}>
              Item details
            </Text>

            <View className="flex items-start justify-start w-full">
              {/*ITEM NAME */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Item Name
                </Text>
                <TextInput
                  className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']
                  ${
                    touched.package_name &&
                    errors.package_name &&
                    "border-red-500"
                  } ${
                    touched.package_name &&
                    !errors.package_name &&
                    "border-[#0077B6]"
                  }`}
                  placeholder="Enter Item's Name"
                  values={values.package_name}
                  onChangeText={handleChange("package_name")}
                  onBlur={() => setFieldTouched("package_name")}
                  keyboardType="default"
                />
              </View>

              {/*ITEM CATEGORY */}
              <View className="flex items-start justify-start w-full mb-5">
                <Text className={`text-sm text-[#101828] font-['bold']`}>
                  Item Category
                </Text>
                <View className="relative w-full">
                  <TouchableOpacity onPress={() => setDropDown(!dropDown)}>
                    <TextInput
                      className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#1D2939] text-base font-['regular']
                                               ${
                                                 selectedOption !==
                                                   "Select Category" &&
                                                 "border-[#0077B6]"
                                               }`}
                      value={selectedOption}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setDropDown(!dropDown)}
                    className="absolute top-[45%] right-4 flex flex-row items-center justify-center"
                  >
                    {dropDown ? (
                      <SimpleLineIcons
                        name="arrow-up"
                        size={12}
                        color="#667085"
                      />
                    ) : (
                      <SimpleLineIcons
                        name="arrow-down"
                        size={12}
                        color="#667085"
                      />
                    )}
                  </TouchableOpacity>
                  {dropDown && (
                    <View className="absolute top-14 w-full bg-white border-[1px] z-50 border-[#D0D5DD] rounded-lg shadow-slate-600">
                      {options.map((item) => {
                        return (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => handleOption(item.name)}
                            className={`flex flex-row items-center justify-between w-full px-4 py-3 ${
                              selectedOption === item.name && "bg-[#F9FAFB]"
                            }`}
                          >
                            <Text
                              className={`text-[#344054] text-base font-['medium']`}
                            >
                              {item.name}
                            </Text>
                            {selectedOption === item.name && (
                              <Feather name="check" size={21} color="#0077B6" />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              onPress={handleSubmit}
              // disabled={!isValid || selectedOption === "Select Category"}
              className={`flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6] mt-12 ${
                !isValid && "opacity-30"
              } ${selectedOption === "Select Category" && "opacity-30"}`}
            >
              <Text className={`text-base text-[#FFFFFF] font-['bold'] ml-2`}>
                Save
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#888",
    borderWidth: 1,
    width: "100%",
  },
});
