import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Calendar from '../../../assets/icon/calendar.svg'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderResponse } from '../../features/orderSlice'
import { checkOut, createOrder } from '../../features/actions/General'
import * as Linking from 'expo-linking';




export default function OrderSummary({setTab, data, setPickup, setDeliveryState}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const orderResponse = useSelector((state) => state.order.orderResponse)

    const prices = [
        {
            id: 1,
            title: 'Delivery fee',
            price: `N${data.delivery_fee}`,
        },
        {
            id: 2,
            title: `VAT (${data.vat_percentage}%)`,
            price: `N${data.vat}`,
        },
        {
            id: 3,
            title: 'Discount',
            price: `N${data.discount}`,
        },
    ]

    const navigation = useNavigation();

    const dispatch = useDispatch()

    const values = {"order_id": orderResponse.id, "callback_url": "https://point2-api.test"}

    const handleConfrirm = () => {
      dispatch(checkOut(values, setLoading, setError, Linking, setPickup, setDeliveryState, setTab))
    }



  return (
    <View className='flex items-center justify-start w-full mt-8'>
        <View className='flex flex-row items-center justify-between w-full'>
             <Text className={`text-base text-[#475467] font-['medium']`}>Schedule pick-up date</Text>
             <Calendar />
        </View>

        {/*<View className='flex flex-row items-center justify-between w-full mt-10'>
             <TextInput className={`flex-1 bg-[#F9FAFB] h-9 rounded-lg pl-3 text-sm font-['medium']`}
             placeholder='Apply Coupon Code'
             placeholderTextColor='#98A2B3'
             />
             <TouchableOpacity className='flex items-center justify-center rounded-lg bg-[#003B5B] h-9 px-4 ml-5'>
                   <Text className={`text-sm text-[#FFFFFF] font-['bold']`}>Apply</Text>
             </TouchableOpacity>
           </View>*/}

        <View className='flex items-center justify-start w-full mt-8'>
              {prices.map((item) => {
                return(
                  <View key={item.id} className='flex flex-row items-center justify-between w-full mb-4'>
                      <Text className={`text-base text-[#475467] font-['medium']`}>{item.title}</Text>
                      <Text className={`text-base text-[#1D2939] font-['medium']`}>{item.price}</Text>
                  </View>
                )
              })}
        </View>

        <View className='flex items-center justify-center w-full h-20 rounded-lg mt-1 bg-[#F9FAFB]'>
              <Text className={`text-base text-[#475467] font-['medium']`}>TOTAL</Text>
              <Text className={`text-lg text-[#1D2939] font-['bold']`}>N{data.amount_to_pay}</Text>
        </View>

        {/* ERROR */}
        <Text className={`text-sm text-red-500 font-['medium'] w-full text-start mt-6`}>{error}</Text>

        {/* BUTTON */}
        <TouchableOpacity onPress={handleConfrirm}
        className={`flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6] mt-3`}>
             {loading
               ?<ActivityIndicator size="large" color="#ffffff" />
               :<Text className={`text-base text-[#FFFFFF] font-['bold'] ml-2`}>Confirm Order</Text>
              }
        </TouchableOpacity>

        <View className='flex items-center justify-start w-[90%] mt-11'>
              <Text className={`text-xs text-[#98A2B3] font-['regular'] leading-5 text-center`}>By continuing, you agree to Point2
              <Text className={`text-xs text-[#344054] font-['medium'] leading-5`}> Terms & Condition</Text>
              <Text className={`text-xs text-[#98A2B3] font-['regular'] leading-5`}> and my package align with Point 2 Guidelines</Text>
              </Text>
        </View>

    </View>
  )
}
