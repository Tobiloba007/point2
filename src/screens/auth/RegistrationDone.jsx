import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RegistrationDone() {
    const navigation = useNavigation();

  return (
    <SafeAreaView className={`flex-1 items-center justify-end bg-white pb-24 px-5 ${Platform.OS === 'ios' && 'mb-14'}`}>
         <View className="flex items-center justify-center h-[183px] w-[183px] rounded-full bg-[#DFF3E8]">
               <View className="flex items-center justify-center h-[70.5px] w-[70.5px] rounded-full bg-[#27AE60]">
                    <FontAwesome6 name="check" size={35} color="white" />
               </View>
         </View>

         <View className={`flex items-center justify-center w-full mt-[50%]`}>
             <Text className={`text-3xl text-[#1D2939] font-['bold'] pl-2 pb-[2px]`}>You're in, Jimoh</Text>
             <Text className={`text-sm text-center text-[#1D2939] font-['regular'] pl-2 pb-[2px] mt-1`}>
                  Welcome onboard, you can start sending {"\n"} packages with our trusted riders
             </Text>
         </View>

         <View className={`flex items-center justify-center w-full mt-14 ${Platform.OS === 'ios' && 'w-[85%]'}`}>
              <TouchableOpacity onPress={()=>navigation.navigate('tab')}
              className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                  <Text className={`text-base font-[bold] text-[#FFFFFF]`}>Go home</Text>
              </TouchableOpacity>
         </View>

    </SafeAreaView>
  )
}