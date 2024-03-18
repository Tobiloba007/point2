import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Delivered from '../../assets/icon/delivered.svg'
import Picked from '../../assets/icon/picked.svg'
import Completed from '../../assets/icon/complete.svg'
import { useNavigation } from '@react-navigation/native'

export default function NotificationPage() {
  const navigation = useNavigation();
  

  const notifications = [
    {
      id: 1,
      status_id: 'delivered',
      icons: <Delivered />,
      title: 'Package  (#563235SA5D)',
      status: 'delivered',
      content: 'Your package has been delivered to Bayo Idris (54, wulemotu street)'
    },
    {
      id: 2,
      status_id: 'in_transit',
      icons: <Picked />,
      title: 'Package  (#563235SA5D)',
      status: ' picked up',
      content: 'Your package has been picked up,',
      estimated_time: 'Expected delivery time: 54m'
    },
    {
      id: 3,
      status_id: 'pending',
      icons: <Completed />,
      title: 'Complete Order',
      content: 'Complete sending your order for pickup request'
    },
  
  ]

  const handlePress = () => {
    navigation.navigate('viewDetailsPage')
  }

  return (
    <View className="flex-1 items-center justify-start w-full bg-white px-5">
         <Text className={`text-lg text-[#344054] font-['bold']`}>Notifications</Text>


         <ScrollView contentContainerStyle={{width: '100%'}}
          showsVerticalScrollIndicator={false}
         >

         <View className='flex flex-col items-start justify-start w-full mt-6'>
              <Text className={`text-xs text-[#667085] font-['medium'] mb-5`}>Today</Text>

              <View className='flex flex-col items-start justify-start w-full'>
                  {notifications.map((item) => {
                    return(
                  <TouchableOpacity key={item.id} onPress={handlePress} 
                  className='flex flex-row items-start justify-start w-full mb-6'>
                              {/* ICON */}
                       <View className={`flex items-center justify-center h-[42px] w-[42px] rounded-full 
                       bg-[${item.status_id === 'delivered' ? '#DBF3E5' : item.status_id === 'in_transit' ? '#EBF8FF' : item.status_id === 'pending' && '#FBF1D2'}]`}>
                            {item.icons}
                       </View>
                       <View className='flex flex-col items-start justify-start flex-1 ml-4'>
                            <Text className={`text-sm text-[#1D2939] font-['bold']`}>
                                {item.title} <Text className={`font-['medium']`}>{item.status}</Text>
                            </Text>
                            <Text className={`text-sm text-[#667085] font-['regular'] mt-2`}>
                                 {item.content} <Text className={`text-sm text-[#0077B6] font-['medium'] mt-2`}>
                                      {item.estimated_time}
                                 </Text>
                            </Text>
                       </View>
                  </TouchableOpacity>
                  )
                  })}
              </View>
         </View>

         <View className='flex flex-col items-start justify-start w-full'>
              <Text className={`text-xs text-[#667085] font-['medium'] mb-5`}>Yesterday</Text>

              <View className='flex flex-col items-start justify-start w-full'>
                  {notifications.map((item) => {
                    return(
                  <TouchableOpacity key={item.id} onPress={handlePress}
                  className='flex flex-row items-start justify-start w-full mb-7'>
                              {/* ICON */}
                       <View className={`flex items-center justify-center h-[42px] w-[42px] rounded-full 
                       bg-[${item.status_id === 'delivered' ? '#DBF3E5' : item.status_id === 'in_transit' ? '#EBF8FF' : item.status_id === 'pending' && '#FBF1D2'}]`}>
                            {item.icons}
                       </View>
                       <View className='flex flex-col items-start justify-start flex-1 ml-4'>
                            <Text className={`text-sm text-[#1D2939] font-['bold']`}>
                                {item.title} <Text className={`font-['medium']`}>{item.status}</Text>
                            </Text>
                            <Text className={`text-sm text-[#667085] font-['regular'] mt-2`}>
                                 {item.content} <Text className={`text-sm text-[#0077B6] font-['medium'] mt-2`}>
                                      {item.estimated_time}
                                 </Text>
                            </Text>
                       </View>
                  </TouchableOpacity>
                  )
                  })}
              </View>
         </View>

         </ScrollView>

    </View>
  )
}