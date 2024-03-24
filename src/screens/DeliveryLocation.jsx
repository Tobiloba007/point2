import { Dimensions, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';



export default function DeliveryLocation() {
    const navigation = useNavigation();

    const ScreenWidth = Dimensions.get('window').width;


  return (
    <SafeAreaView className="flex items-start justify-start w-full h-full bg-white pt-8">
            {/*HEADER */}
        <View className='relative flex items-start justify-start w-full bg-white pb-1 shadow-2xl px-5'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-5 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`text-2xl text-[#101828] font-['bold'] mt-9`}>Delivery Location 1</Text>
        </View>

        <ScrollView contentContainerStyle={{width: ScreenWidth, paddingBottom: 40, paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
        >
        <View className='flex items-start justify-start w-full mt-9'>
               {/*RECIEVER NAME */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Reciever's name</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']`}
                  placeholder="Enter receiver's name"
                  />
              </View>

                 {/*PHONE */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Reciever Phone number</Text>
                  <View className='relative w-full'>
                      <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-[75px] text-[#667085] text-base font-['regular']`}
                      placeholder='908 16888 42'
                      />
                      <View className='absolute top-[30%] left-4 flex flex-row items-center justify-center'>
                          <Text className={`text-base text-[#101828] font-['regular'] mr-1`}>234</Text>
                          <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
                      </View>
                  </View>
              </View>

                 {/*RECIEVER'S ADDRESS */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Receiver's address</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']`}
                  placeholder='Select Address'
                  />
              </View>

                 {/*LANDMARK */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Landmark or B/stop</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']`}
                  placeholder='Enter b/stop (optional)'
                  />
              </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity onPress={()=>navigation.goBack()} 
        className={`flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6] mt-12`}>
              <Text className={`text-base text-[#FFFFFF] font-['bold'] ml-2`}>Save</Text>
        </TouchableOpacity>

        </ScrollView>
    </SafeAreaView>
  )
}
