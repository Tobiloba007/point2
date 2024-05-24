import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Box from '../../../assets/icon/box2.svg'
import EmptyBox from '../../../assets/icon/box.svg'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getAllOrders, getSingleActivity } from '../../features/actions/General';
// import activity from './ActivityData';



export default function All() {
    const [loading, setLoading] = useState(false)
    const [loadDetails, setLoadDetails] = useState(false)
    const [error, setError] = useState('')
    const [activity, setActivity] = useState([])
    const [empty, setEmpty] = useState(false);


    const navigation = useNavigation();

    const dispatch = useDispatch();


     useEffect(() => {
          dispatch(getAllOrders(setActivity, setLoading, setError, setEmpty))
        //   console.log(activity.length, 'lenght');
     }, [dispatch])


     const handleDetails = (item) => {
        const itemId = item.id
         dispatch(getSingleActivity(setLoadDetails, navigation, itemId))
        //  navigation.navigate('viewDetailsPage')
        // console.log(itemId);
     }

  return (
    <View className="flex items-center justify-start w-full px-5">
         {loading &&
         <View className='flex h-[70vh] w-full items-center justify-center'>
               <ActivityIndicator size="large" color="#0077B6" />
         </View>
        }

           {/* EMPTY ORDERS */}
           {empty &&
            <View className="flex items-center justify-center w-full mt-44">
              <View className='flex items-center justify-center h-32 w-32 rounded-full bg-[#f4fbff]'>
                  <EmptyBox width={60} height={60} />
              </View>
              <Text className={`text-sm text-center text-[#1D2939] font-['medium'] mt-5`}>
                  Start sending packages {'\n'}to see activity here    
               </Text>
            </View>
            }


           {/* ORDERS LIST */}
           {!empty && activity.map((item) => {
            return(
           <View key={item.id} className="flex items-center justify-start w-full rounded-2xl bg-[#F9FAFB] mt-5 p-4">
                <View className="flex flex-row items-start justify-start w-full">
                    <Box />
                    <View className="flex-1 items-start justify-start ml-4">
                         <Text className={`text-sm text-[#344054] font-['bold']`}>
                              {item.package_name}
                         </Text>
                         <Text className={`text-sm text-[#1D2939] font-['regular'] pt-[6px]`}>
                              Tracking ID: {item.tracking_id}
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
                            {item.pickup_location}
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
                             {item.delivery_point_location}
                         </Text>
                    </View>
                </View>

                <View className="flex flex-row items-start justify-between w-full mt-8 pb-2">
                      <View className='flex flex-row items-start justify-start'>
                          <Text className={`text-sm text-[#344054] font-['bold']`}>
                          Status: {
                            item.status === 'ASSIGNEDTORIDER' ? 'Assigned To Rider'
                           :item.status === 'PENDING' ? 'Pending'
                           :item.status === 'INTRANSIT' ? 'In-Transit'
                           :item.status === 'DELIVERED' ? 'Delivered'
                           :item.status === 'CANCELLED' && 'Cancelled'
                          }
                          </Text>
                          <View className="ml-1">
                             <Ionicons name="checkmark-circle-outline" size={20} 
                             color={
                                item.status === 'DELIVERED' ? '#32D583'
                               :item.status === 'CANCELLED' ? '#EB5757'
                               :item.status === 'ASSIGNEDTORIDER' ? '#32D583'
                               :item.status === 'PENDING' ? '#F2994A'
                               :item.status === 'INTRANSIT' && '#F2994A'
                            } 
                             />
                          </View>
                      </View>

                      <Pressable onPress={()=>handleDetails(item)}
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
            )
          })}
           


    </View>
  )
}
