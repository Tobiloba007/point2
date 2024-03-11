import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import All from '../components/activityPage/All';
import Delivered from '../components/activityPage/Delivered';
import InTransit from '../components/activityPage/InTransit';
import Canceled from '../components/activityPage/Canceled';

export default function ActivityPage() {
  const [active, setActive] = useState(1);

  const tabs = [
    {
      id: 1,
      title: 'All',
      quantity: 5,
      quantityColor: 'bg-purple-600',
      textColor: '#FFFFFF'
    },
    {
      id: 2,
      title: 'Delivered',
      quantity: 2,
      quantityColor: 'bg-[#27AE60]',
      textColor: '#FFFFFF'
    },
    {
      id: 3,
      title: 'In Transit',
      quantity: 2,
      quantityColor: 'bg-[#F2C94C]',
      textColor: '#1D2939'
    },
    {
      id: 4,
      title: 'Canceled',
      quantity: 5,
      quantityColor: 'bg-red-600',
      textColor: '#FFFFFF'
    },
  ]

  const handleTab = (item) => {
    setActive(item);
  }

  return (
    <View className="flex-1 items-center justify-start w-full bg-white">

         <Text className={`text-lg text-[#344054] font-['bold']`}>Activity</Text>

         <View className={`flex flex-row items-center justify-start w-full mt-5 mb-3 shadow-2xl`}>
         <ScrollView 
         horizontal={true} 
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{}}
         >
             {tabs.map((item) => {
              return(
             <TouchableOpacity key={item.id} onPress={()=>handleTab(item.id)}
             className={`flex flex-row items-center justify-center h-9 border-[#0077B6] bg-[#EBF8FF] border-[1px] 
             px-2 rounded-full mx-[7px] ${active === item.id ? 'opacity-100' : 'opacity-40'}`}>
                 <Text className={`text-sm text-[#344054] font-['medium']`}>{item.title}</Text>
                 <View className={`flex items-center justify-center ${item.quantityColor} h-5 px-2 rounded-full ml-[6px]`}>
                    <Text className={`text-xs text-[${item.textColor}] font-['bold']`}>{item.quantity}</Text>
                 </View>
             </TouchableOpacity>
             )
             })}
          </ScrollView>
         </View>

         <ScrollView showsVerticalScrollIndicator={false}>
         {
          active === 1
          ? <All />
          : active === 2
          ? <Delivered />
          : active === 3
          ? <InTransit />
          : active === 4
          && <Canceled />
         }
         </ScrollView>

    </View>
  )
}