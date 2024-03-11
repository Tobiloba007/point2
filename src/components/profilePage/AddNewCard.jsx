import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MasterCard from '../../../assets/icon/logos_mastercard.svg'



export default function AddNewCard({setPages}) {
  const [eye, setEye] = useState(false)


  return (
    <View className="flex items-start justify-start w-full bg-white mt-9 px-5">

        <KeyboardAvoidingView className="flex items-center justify-start w-full">

              {/* CARD HOLDERS NAME */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Card Holder’s Name</Text>
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-5"
                  placeholder='enter name on card'
                  placeholderTextColor={'#667085'}
                  keyboardType='default'
                  />
            </View>

            {/* CARD NUMBER */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Card Number</Text>
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-4"
                  placeholder='0000 0000 0000'
                  placeholderTextColor={'#667085'}
                  keyboardType='email-address'
                  />
                  <View className="absolute bottom-[13px] right-4 flex flex-row items-center justify-start">
                       <MasterCard />
                  </View>
            </View>

            {/* CCV AND EXPIRATION */}
            <View className='flex flex-row items-center justify-between w-full'>
                   {/* CCV */}
                  <View className="relative items-start justify-start w-[47.5%] mt-3">
                      <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>CCV</Text>
                      <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-5"
                      placeholder='123'
                      placeholderTextColor={'#667085'}
                      keyboardType='default'
                      />
                  </View>

                   {/* CCV */}
                  <View className="relative items-start justify-start w-[47.5%] mt-3">
                      <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Expiration</Text>
                      <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] pl-5"
                      placeholder='12/28'
                      placeholderTextColor={'#667085'}
                      keyboardType='default'
                      />
                  </View>
            </View>



              {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-28">
                  <TouchableOpacity onPress={()=>setPages(0)} 
                  className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                      <Text className={`text-base font-[bold] text-white`}>Save</Text>
                  </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>


    </View>
  )
}