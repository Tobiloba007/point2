<<<<<<< HEAD
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Camera from "../../../assets/icon/camera.svg";
import Gift from "../../../assets/icon/giftPackage.svg";
import User from "../../../assets/icon/user.svg";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../constants/base_urls";
=======
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Camera from '../../../assets/icon/camera.svg'
import Gift from '../../../assets/icon/giftPackage.svg'
import User from '../../../assets/icon/user.svg'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { UploadPicture } from '../../features/actions/General'
>>>>>>> e1eaaa54ae1ad584f554d19dc9b2199264112d1c

export default function Profile({ buttons, setPages }) {
  const access_token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

<<<<<<< HEAD
  const uploadImage = (image, mime) => {
    (async () => {
      try {
        let form = new FormData();
        form.append("profile_picture", {
          uri: image,
          type: mime,
          name: "profile_picture",
        });

        const resp = await axios.post(
          `${BASE_URL}/profile/upload-photo`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + access_token ?? "",
            },
          }
        );
        if (resp.data.status_code == 200) {
          alert(resp.data.message);
        }
      } catch (error) {
        console.log("error uploadig", error);
      }
    })();
  };
=======
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

>>>>>>> e1eaaa54ae1ad584f554d19dc9b2199264112d1c

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
<<<<<<< HEAD
      uploadImage(result.assets[0].uri, result.assets[0].mimeType);
    }
  };
  // useEffect(()=>{
  //   console.log(user, 'USER DATA');
  // },[])
=======

    const formData = new FormData();
    formData.append('profile_picture', {
      uri: image,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    dispatch(UploadPicture(formData, setError, setLoading))
    }
  };

>>>>>>> e1eaaa54ae1ad584f554d19dc9b2199264112d1c

  return (
    <ScrollView>
      <View
        className={`flex-1 items-center justify-start bg-white px-5 ${
          Platform.OS === "ios" && "pb-14"
        }`}
      >
        <Text className={`text-lg text-[#344054] font-['bold'] pb-[2px]`}>
          Profile
        </Text>

<<<<<<< HEAD
        <View className="flex flex-row items-center justify-start w-full mt-5">
          {/* <View className='relative'>
                   {user.profile_picture === null && 
=======
         <View className='flex flex-row items-center justify-start w-full mt-5'>
              <View className='relative'>
                  {image && user.profile_picture === null && 
>>>>>>> e1eaaa54ae1ad584f554d19dc9b2199264112d1c
                    <View className='flex items-center justify-center h-16 w-16 rounded-full bg-[#F9FAFB]'>
                        <User className='w-20 h-20' />
                    </View>
                  }
<<<<<<< HEAD
                   {image && <Image className='w-16 h-16 rounded-full'  source={{ uri: image }} />}
                   <TouchableOpacity onPress={pickImage}
                   className='absolute bottom-0 -right-1 flex items-center justify-center h-6 w-6 rounded-full bg-[#0077B6]'>
                       <Camera />
                   </TouchableOpacity>
              </View> */}
=======
                  {user.profile_picture  !== null  && image === null &&
                    <Image className='w-16 h-16 rounded-full'  source={{ uri: user.profile_picture  }} />
                  }
                  {image  !== null  && 
                    <Image className='w-16 h-16 rounded-full'  source={{ uri: image  }} />
                  }
                  <TouchableOpacity onPress={pickImage}
                  className='absolute bottom-0 -right-1 flex items-center justify-center h-6 w-6 rounded-full bg-[#0077B6]'>
                      <Camera />
                  </TouchableOpacity>
              </View>
>>>>>>> e1eaaa54ae1ad584f554d19dc9b2199264112d1c

          <Pressable onPress={pickImage} style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={
                image === "" || image === undefined
                  ? require("../../../assets/images/no-img.png")
                  : { uri: image }
              }
            />
            <View style={styles.iconContainer}>
              <FontAwesome name="camera" size={24} color="#0077B6" />
            </View>
          </Pressable>

          <View className="flex items-start justify-start ml-5">
            <Text className={`text-lg text-[#1D2939] font-['bold']`}>
              {user.first_name} {user.last_name}
            </Text>
            <Text className={`text-sm text-[#475467] font-['medium'] pt-1`}>
              {user.email}
            </Text>
          </View>
        </View>

        {/* SEND A PACKAGE */}
        <View className="flex flex-row items-center justify-between w-full h-[114px] bg-[#FBF1D2] rounded-lg mt-8 pl-3">
          <View className="flex items-start justify-center py-2">
            <Text className={`text-[13px] text-[#1D2939] font-['medium'] pt-1`}>
              Use Point 2 riders 10 times{"\n"} and unlock a free delivery as
              {"\n"} your reward!"
            </Text>
            <Text className={`text-lg text-[#1D2939] font-['bold'] pt-3`}>
              0/10
            </Text>
          </View>

          <View className="flex-1 items-end justify-center -mb-[15px]">
            <Gift />
          </View>
        </View>

        <View className="flex items-center justify-start w-full mt-8">
          {buttons.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setPages(item.id)}
                className="flex flex-row items-center justify-between w-full h-[45px] bg-[#F9FAFB] px-4 rounded-lg mb-5"
              >
                <View className="flex flex-row items-center justify-start">
                  {item.icon}
                  <Text
                    className={`text-base text-[#1D2939] font-['medium'] ml-3`}
                  >
                    {item.name}
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={15}
                  color="#667085"
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("login")}
          className="flex flex-row items-center justify-center w-full h-[45px] bg-[#F2DCDD] px-4 rounded-lg mt-8"
        >
          <Text className={`text-lg text-[#EB5757] font-['bold'] mr-3`}>
            Log out
          </Text>
          <Ionicons name="log-out-outline" size={24} color="#EB5757" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    // padding: 12,
    overflow: "hidden",
    position: "relative",
    alignSelf: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundColor: "#eee",
  },
  iconContainer: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
