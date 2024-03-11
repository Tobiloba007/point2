import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default function EditDetails({setPages}) {
  const [eye, setEye] = useState(false)
    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;

  return (
    <View className="flex items-start justify-start w-full bg-white px-5">

        <View className='relative flex flex-row items-center justify-center w-full mt-3'>
             <TouchableOpacity onPress={()=>setPages(0)}
             className="absolute left-0 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Edit details</Text>
        </View>


        <KeyboardAvoidingView className="flex items-center justify-start w-full mt-8">

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

              {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-24">
                  <TouchableOpacity onPress={()=>navigation.navigate('verifyAccount')} 
                  className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                      <Text className={`text-base font-[bold] text-white`}>Save Changes</Text>
                  </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>


    </View>
  )
}
