import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Box from '../../../assets/icon/box2.svg'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default function Canceled() {
    const navigation = useNavigation();


  return (
    <View className="flex items-center justify-start w-full px-5">

           {/* EMPTY ORDERS */}
           {/*<View className="flex items-center justify-center w-full mt-40">
              <EmptyBox />
              <Text className={`text-sm text-center text-[#1D2939] font-['regular'] mt-5`}>
                  Start sending packages {'\n'}to see activity here     
               </Text>
           </View>*/}

           {/* First */}
           <View className="flex items-center justify-start w-full rounded-2xl bg-[#F9FAFB] mt-5 p-4">
                <View className="flex flex-row items-start justify-start w-full">
                    <Box />
                    <View className="flex-1 items-start justify-start ml-4">
                         <Text className={`text-sm text-[#344054] font-['bold']`}>
                              Standing Fan  ( Black )
                         </Text>
                         <Text className={`text-sm text-[#1D2939] font-['regular'] pt-[6px]`}>
                              Tracking ID: 5654F4DSA545Q
                         </Text>
                    </View>
                </View>

                <View className="flex flex-row items-start justify-start w-full mt-5">
                    <Octicons name="dot-fill" size={20} color="#CCE4F0" />
                    <View className="flex-1 items-start justify-start ml-2 pt-[2px]">
                         <Text className={`text-xs text-[#1D2939] font-['medium']`}>
                             From
                         </Text>
                         <Text className={`text-sm text-[#344054] font-['bold'] pt-[2px]`}>
                             Idumota Store, Orile Agege
                         </Text>
                    </View>
                </View>

                <View className="flex flex-row items-start justify-start w-full mt-5">
                    <Octicons name="dot-fill" size={20} color="#32D583" />
                    <View className="flex-1 items-start justify-start ml-2 pt-[2px]">
                         <Text className={`text-xs text-[#1D2939] font-['medium']`}>
                             Shipped to
                         </Text>
                         <Text className={`text-sm text-[#344054] font-['bold'] pt-[2px]`}>
                             32, Sangodiya Avenue
                         </Text>
                    </View>
                </View>

                <View className="flex flex-row items-start justify-between w-full mt-8 pb-2">
                      <View className='flex flex-row items-start justify-start'>
                          <Text className={`text-sm text-[#344054] font-['bold']`}>
                              Status: Cancelled
                          </Text>
                          <View className="ml-1">
                             <Ionicons name="checkmark-circle-outline" size={20} color="#EB5757" />
                          </View>
                      </View>

                      <Pressable onPress={()=>navigation.navigate('viewDetailsPage')}
                      className='flex flex-row items-center justify-start'>
                          <Text className={`text-sm text-[#0077B6] font-['bold']`}>
                               View Details
                          </Text>
                          <View className='mt-1 ml-1'>
                              <MaterialIcons name="arrow-forward-ios" size={12} color="#0077B6" />
                          </View>
                      </Pressable>
                </View>

           </View>




    </View>
  )
}


