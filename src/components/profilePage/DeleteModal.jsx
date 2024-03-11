import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Delete from '../../../assets/icon/delete.svg'


export default function DeleteModal({setDeleteCard}) {
  return (
    <View className='absolute bottom-0 flex items-center justify-start w-full pt-6 px-5 bg-white rounded-t-2xl pb-16'>
             <View className='flex items-center justify-center w-14 h-14 rounded-full bg-[#FCE6E6]'>
                  <Delete width={21.33} height={24} />
             </View>

             <Text className={`text-xl text-[#1D2939] font-['bold'] pt-3`}>Are you sure?</Text>

             <View className='flex flex-row items-center justify-between w-full mt-10'>
                  <TouchableOpacity className='flex items-center justify-center w-[48%] h-11 rounded-lg bg-[#0077B6]'>
                       <Text className={`text-base text-white font-['bold']`}>Yes, delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setDeleteCard(false)}
                  className='flex items-center justify-center w-[48%] h-11 rounded-lg bg-[#EBF8FF]'>
                       <Text className={`text-base text-[#0077B6] font-['bold']`}>Go back</Text>
                  </TouchableOpacity>
             </View>

    </View>
  )
}
