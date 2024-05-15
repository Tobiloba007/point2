import { View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SendPackageSuccess() {
    const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 items-center justify-end bg-white pb-16 px-5"
    style={{paddingTop: StatusBar.currentHeight}}>
         <View className="flex items-center justify-center h-[183px] w-[183px] rounded-full bg-[#DFF3E8]">
               <View className="flex items-center justify-center h-[70.5px] w-[70.5px] rounded-full bg-[#27AE60]">
                    <FontAwesome6 name="check" size={35} color="white" />
               </View>
         </View>

         <View className="flex items-center justify-center w-full mt-[50%]">
             <Text className={`text-3xl text-center text-[#1D2939] font-['bold'] pl-2 pb-[2px]`}>Rider on his way</Text>
             <Text className={`text-sm text-center text-[#1D2939] font-['regular'] pl-2 pb-[2px] mt-1`}>
                  We are sending a rider to pickup {'\n'} item shortly
             </Text>
         </View>

         <View className="flex items-center justify-center w-full mt-14">
              <TouchableOpacity onPress={()=>navigation.navigate('tracking')}
              className="flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6] mb-6">
                  <Text className={`text-base font-[bold] text-[#FFFFFF]`}>Track Package</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('tab')}
              className="flex items-center justify-center h-11 w-full rounded-lg bg-[#EBF8FF]">
                  <Text className={`text-base font-[bold] text-[#0077B6]`}>Go home</Text>
              </TouchableOpacity>
         </View>

    </SafeAreaView>
  )
}