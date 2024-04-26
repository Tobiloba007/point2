import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Location from '../../assets/icon/location.svg'
import Box from '../../assets/icon/box.svg'
import Scan from '../../assets/icon/scan.svg'
import Send from '../../assets/icon/send.svg'
import Gift from '../../assets/icon/giftPackage.svg'
import RecentOrders from '../components/splash/homePage/RecentOrders'

export default function HomePage({setInputModal, setTab, location}) {
  return (
    <ScrollView 
    contentContainerStyle={{display: 'flex-1', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20, paddingBottom: 40}}
    showsVerticalScrollIndicator={false}
    >
          {/* LOCATION */}
        <TouchableOpacity onPress={()=>setInputModal(true)}
        className="flex flex-row items-center justify-start w-full pt-8">
             <TouchableOpacity onPress={()=>setInputModal(true)}
             className="flex items-center justify-center w-[44px] h-[44px] bg-[#EBF8FF] rounded-lg">
                <Location width={20.6} height={26.12} />
             </TouchableOpacity>
             <View className="flex flex-1 items-start justify-center ml-3">
                 <Text className={`text-sm text-[#475467] font-['medium]`}>
                     Locations
                 </Text>
                 <Text className={`text-sm text-[#101828] font-['bold'] pt-1`}>
                     {location === "" ? "Set Location" : location}
                 </Text>
             </View>
        </TouchableOpacity>

           {/* TRACK YOUR PACKAGE */}
        <View className="flex items-start justify-center w-full bg-[#EBF8FF] rounded-xl p-4 mt-8">
             <Text className={`text-sm text-[#1D2939] font-['bold']`}>
                Track your package
             </Text>
             <Text className={`text-sm text-[#1D2939] font-['regular'] pt-1`}>
                Please enter your Package Tracking ID             
             </Text>
             <View className="flex flex-row items-center justify-center w-full mt-3">
                     <TextInput className={`relative flex-1 bg-white rounded-lg h-[42px] pl-14 text-sm text-[#98A2B3] font-['regular']`} 
                     placeholder='Tracking ID'
                     />
                     <View className="absolute left-4">
                        <Box width={24.1} height={28.12} />
                     </View>

                  <TouchableOpacity className="flex items-center justify-center h-[42px] w-[42px] rounded-lg bg-[#0077B6] ml-3">
                       <Scan height={24} width={24} />
                  </TouchableOpacity>
             </View>
        </View>

        {/* SEND A PACKAGE */}
        <View className="flex flex-row items-center justify-between w-full h-[100px] bg-[#0077B6] rounded-lg mt-6 pl-5">
            <View className="flex items-start justify-center py-2">
                <Text className={`text-xl text-[#EBF8FF] font-['bold'] pt-1`}>
                    Send a Package           
                </Text>
                <TouchableOpacity onPress={()=>setTab('Package')}
                className="flex flex-row items-center justify-center w-[135px] h-[34px] bg-[#EBF8FF] rounded-lg mt-2">
                   <Text className={`text-xs text-[#0077B6] font-['bold']`}>
                      Request Pickup        
                   </Text>
                   <View className="ml-[6px]">
                      <Send />
                   </View>
                </TouchableOpacity>
            </View>

            <View className="flex items-end justify-center -mb-[3px]">
                 <Gift />
            </View>
        </View>


        {/* RECENT ORDERS */}
        <View className="flex-1 w-full mt-7">
           <RecentOrders setTab={setTab} />
        </View>

    </ScrollView>
  )
}