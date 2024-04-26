import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Camera from '../../../assets/icon/camera.svg'
import Gift from '../../../assets/icon/giftPackage.svg'
import User from '../../../assets/icon/user.svg'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'



export default function Profile({buttons, setPages}) {
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const user = useSelector((state) => state.auth.user)

  // useEffect(()=>{
  //   console.log(user, 'USER DATA');
  // },[])


  return (
    <ScrollView>
    <View className="flex-1 items-center justify-start bg-white px-5">
         <Text className={`text-lg text-[#344054] font-['bold'] pb-[2px]`}>Profile</Text>

         <View className='flex flex-row items-center justify-start w-full mt-5'>
              <View className='relative'>
                   {user.profile_picture === null && 
                    <View className='flex items-center justify-center h-16 w-16 rounded-full bg-[#F9FAFB]'>
                        <User className='w-20 h-20' />
                    </View>
                  }
                   {image && <Image className='w-16 h-16 rounded-full'  source={{ uri: image }} />}
                   <TouchableOpacity onPress={pickImage}
                   className='absolute bottom-0 -right-1 flex items-center justify-center h-6 w-6 rounded-full bg-[#0077B6]'>
                       <Camera />
                   </TouchableOpacity>
              </View>

              <View className='flex items-start justify-start ml-5'>
                  <Text className={`text-lg text-[#1D2939] font-['bold']`}>{user.first_name} {user.last_name}</Text>
                  <Text className={`text-sm text-[#475467] font-['medium'] pt-1`}>{user.email}</Text>
              </View>
         </View>


         {/* SEND A PACKAGE */}
        <View className="flex flex-row items-center justify-between w-full h-[114px] bg-[#FBF1D2] rounded-lg mt-8 pl-3">
              <View className="flex items-start justify-center py-2">
                  <Text className={`text-[13px] text-[#1D2939] font-['medium'] pt-1`}>
                      Use Point 2 riders 10 times{'\n'} and unlock a free delivery as{'\n'} your reward!"         
                  </Text>
                  <Text className={`text-lg text-[#1D2939] font-['bold'] pt-3`}>
                       0/10
                  </Text>
              </View>

              <View className="flex-1 items-end justify-center -mb-[15px]">
                   <Gift />
              </View>
        </View>


        <View className='flex items-center justify-start w-full mt-8'>
            {buttons.map((item) => {
              return(
            <TouchableOpacity key={item.id} onPress={()=>setPages(item.id)}
            className='flex flex-row items-center justify-between w-full h-[45px] bg-[#F9FAFB] px-4 rounded-lg mb-5'>
                <View className='flex flex-row items-center justify-start'>
                     {item.icon}
                     <Text className={`text-base text-[#1D2939] font-['medium'] ml-3`}>{item.name}</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color="#667085" />
            </TouchableOpacity>
            )
            })}
        </View>


        <TouchableOpacity onPress={()=>navigation.navigate('login')}
        className='flex flex-row items-center justify-center w-full h-[45px] bg-[#F2DCDD] px-4 rounded-lg mt-8'>
             <Text className={`text-lg text-[#EB5757] font-['bold'] mr-3`}>Log out</Text>
             <Ionicons name="log-out-outline" size={24} color="#EB5757" />
        </TouchableOpacity>



    </View>
    </ScrollView>
  )
}