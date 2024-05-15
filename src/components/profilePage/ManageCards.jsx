import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import Mastercard from '../../../assets/icon/logos_mastercard.svg'
import Delete from '../../../assets/icon/delete.svg'
import AddNewCard from './AddNewCard';


export default function ManageCards({setPages, setDeleteCard}) {
    const [addCard, setAddCard] = useState(false)


  return (
    <View className={`flex-1 items-start justify-start w-full bg-white`}>

        <View className='relative flex flex-row items-center justify-center w-full mt-3'>
             <TouchableOpacity onPress={()=>setPages(0)}
             className="absolute left-5 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Payments</Text>
        </View>

        {addCard === false ?
        <View className='flex items-start justify-start w-full mt-12 px-5'>

        <Text className={`text-xs text-[#475467] font-['medium']`}>Cards</Text>


        <View className='flex flex-row items-start justify-between w-full mt-5'>
             <View className='flex flex-row items-center justify-start'>
                 <View className='flex items-center justify-center w-14 h-14 rounded-full bg-[#F2F4F7]'>
                      <Mastercard />
                 </View>
                 <View className='flex items-start justify-start ml-5'>
                      <Text className={`text-base text-[#475467] font-['bold']`}>MASTER CARD</Text>
                      <Text className={`text-sm text-[#475467] font-['medium'] pt-1`}>Debit........45789</Text>
                 </View>
             </View>

             <TouchableOpacity onPress={()=>setDeleteCard(true)}
             className='flex items-center justify-center w-10 h-10 rounded-full bg-[#FCE6E6]'>
                  <Delete />
             </TouchableOpacity>

        </View>


        {/* BUTTON */}
        <View className="flex items-center justify-center w-full mt-24">
             <TouchableOpacity onPress={()=>setAddCard(true)}
             className="flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6]">
                 <Text className={`text-base font-[bold] text-white`}>Add new card</Text>
             </TouchableOpacity>
        </View>

        </View>
        : <AddNewCard setPages={setPages} />
        }



    </View>
  )
}