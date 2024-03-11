import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Eye from '../../../assets/icon/eye.svg'
import EyeSlash from '../../../assets/icon/eye-slash.svg'


export default function Login() {
  const [eye, setEye] = useState(false)

    const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 items-center justify-start px-5">

    <TouchableOpacity onPress={()=>navigation.goBack()}
    className="flex flex-row items-center justify-start w-full">
          <Feather name="arrow-left" size={18} color="#344054" />
          <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
    </TouchableOpacity>
    
    <View className="items-start w-full mt-8">
         <Text className={`text-2xl text-[#101828] font-['bold']`}>Login</Text>
         <View className="flex flex-row items-center justify-start w-full">
             <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>Don't have an account?</Text>
             <TouchableOpacity onPress={()=>navigation.navigate('register')}>
                <Text className={`text-sm text-[#0077B6] font-['bold'] mt-3`}> Register</Text>
             </TouchableOpacity>
         </View>
    </View>


    <KeyboardAvoidingView className="flex items-center justify-start w-full">

    <View className="relative items-start justify-start w-full mt-10">
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

    <View className="flex items-center justify-center w-full mt-12">
          <TouchableOpacity onPress={()=>navigation.navigate('tab')} 
          className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
              <Text className={`text-base font-[bold] text-white`}>Log in</Text>
          </TouchableOpacity>
    </View>

    <Text onPress={()=>navigation.navigate('forgotPassword')} 
    className={`text-sm text-[#475467] font-['medium'] mt-7`}>Forgot Password?</Text>

    </KeyboardAvoidingView>

    </SafeAreaView>
  )
}