import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Eye from '../../../assets/icon/eye.svg'
import EyeSlash from '../../../assets/icon/eye-slash.svg'
import { FontAwesome6 } from '@expo/vector-icons';



export default function CreateNewPassword() {
  const [eye, setEye] = useState(false)
    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-white"
    style={{paddingTop: StatusBar.currentHeight}}>

        <TouchableOpacity onPress={()=>navigation.goBack()}
        className="flex flex-row items-center justify-start w-full px-5 pb-3">
              <Feather name="arrow-left" size={18} color="#344054" />
              <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{width: screenWidth, alignItems: 'center', paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        >
        <View className="items-start w-full mt-5">
             <Text className={`text-2xl text-[#101828] font-['bold']`}>Create New Password</Text>
             <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>Please enter new password to continue</Text>
        </View>


        <KeyboardAvoidingView className="flex items-center justify-start w-full mt-4">

              {/* PASSWORD */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Password</Text>
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-5"
                  placeholder='********'
                  placeholderTextColor={'#667085'}
                  keyboardType='default'
                  secureTextEntry={eye ? false : true}
                  />
                  <View  className="absolute bottom-[13px] right-4 flex flex-row items-center justify-start">
                      {eye ? <EyeSlash onPress={()=>setEye(!eye)} /> : <Eye onPress={()=>setEye(!eye)} />}
                  </View>
            </View>

              {/* CONFIRM PASSWORD */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Confirm Password</Text>
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-5"
                  placeholder='********'
                  placeholderTextColor={'#667085'}
                  keyboardType='default'
                  secureTextEntry={eye ? false : true}
                  />
                  <View  className="absolute bottom-[13px] right-4 flex flex-row items-center justify-start">
                      {eye ? <EyeSlash onPress={()=>setEye(!eye)} /> : <Eye onPress={()=>setEye(!eye)} />}
                  </View>
            </View>

            <View className='flex flex-col items-start w-full mt-6'>
               <View className='flex flex-row items-center justify-start w-full'>
                  <FontAwesome6 name="check-circle" size={15} color="#27AE60" />
                  <Text className={`text-xs text-[#27AE60] font-['bold'] ml-2`}>Atleast 8 Characters</Text>
               </View>
               <View className='flex flex-row items-center justify-start w-full mt-3'>
                  <FontAwesome6 name="check-circle" size={15} color="#27AE60" />
                  <Text className={`text-xs text-[#27AE60] font-['bold'] ml-2`}>Atleast 1 Number</Text>
               </View>
               <View className='flex flex-row items-center justify-start w-full mt-3'>
                  <FontAwesome6 name="check-circle" size={15} color="#27AE60" />
                  <Text className={`text-xs text-[#27AE60] font-['bold'] ml-2`}>Both Uppercase and Lowercase Letters</Text>
               </View>
            </View>

              {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-20">
                  <TouchableOpacity onPress={()=>navigation.navigate('resetSuccess')} 
                  className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                      <Text className={`text-base font-[bold] text-white`}>Reset Password</Text>
                  </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>

        </ScrollView>


    </SafeAreaView>
  )
}