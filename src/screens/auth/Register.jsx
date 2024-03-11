import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Eye from '../../../assets/icon/eye.svg'
import EyeSlash from '../../../assets/icon/eye-slash.svg'



export default function Register() {
  const [eye, setEye] = useState(false)
    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-white">

        <TouchableOpacity onPress={()=>navigation.goBack()}
        className="flex flex-row items-center justify-start w-full px-5 pb-3">
              <Feather name="arrow-left" size={18} color="#344054" />
              <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{width: screenWidth, alignItems: 'center', paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        >
        <View className="items-start w-full mt-5">
             <Text className={`text-2xl text-[#101828] font-['bold']`}>Create your account</Text>
             <View className="flex flex-row items-center justify-start w-full">
                 <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>Have an account?</Text>
                 <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                    <Text className={`text-sm text-[#0077B6] font-['bold'] mt-3`}> Login</Text>
                 </TouchableOpacity>
             </View>
        </View>


        <KeyboardAvoidingView className="flex items-center justify-start w-full mt-4">
              {/* PHONE */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Phone number</Text>
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-[87px]"
                  placeholder='90722245789'
                  placeholderTextColor={'#667085'}
                  keyboardType='number-pad'
                  />
                  <View className="absolute bottom-[13px] left-4 flex flex-row items-center justify-start">
                      <Text className={`text-base text-[#101828] font-['regular'] mr-1`}>+234</Text>
                      <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
                  </View>
            </View>

              {/* EMAIL */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Email Address</Text>
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-14"
                  placeholder='example@mail.com'
                  placeholderTextColor={'#667085'}
                  keyboardType='email-address'
                  />
                  <View className="absolute bottom-[13px] left-4 flex flex-row items-center justify-start">
                      <Feather name="mail" size={22} color="#667085" />
                  </View>
            </View>

              {/* FIRST NAME */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>First Name</Text>
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-5"
                  placeholder='First Name'
                  placeholderTextColor={'#667085'}
                  keyboardType='default'
                  />
            </View>

              {/* LAST NAME */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Last Name</Text>
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-5"
                  placeholder='Last Name'
                  placeholderTextColor={'#667085'}
                  keyboardType='default'
                  />
            </View>

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

              {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-20">
                  <TouchableOpacity onPress={()=>navigation.navigate('verifyAccount')} 
                  className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                      <Text className={`text-base font-[bold] text-white`}>Create your account</Text>
                  </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>

        </ScrollView>


    </SafeAreaView>
  )
}