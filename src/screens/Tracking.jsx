import React from 'react'
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Rider from '../../assets/images/rider.jpg'
import Verified from '../../assets/icon/verified.svg'
import Phone from '../../assets/icon/phone2.svg'
import Chat from '../../assets/icon/chat2.svg'
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'



const Tracking = () => {

    const handleCallPress = () => {
        const phoneUrl = `tel:${'09023456789'}`;
        Linking.openURL(phoneUrl);
      };
    
      const navigation = useNavigation()

  return (
    <View className="flex items-start justify-start w-full h-full bg-gray-300">
           {/*<MapView
           style={{height: '100%', width: '100%'}}
           >
           </MapView>*/}

             {/* BACK BUTTON */}
         <View className='absolute top-0 flex items-start justify-start h-full w-full px-5 mt-10'>
              <TouchableOpacity onPress={()=>navigation.goBack()}
              className='flex items-center justify-center w-12 h-12 rounded-full bg-[#0077B6]'>
                   <AntDesign name="arrowleft" size={20} color="white" />
              </TouchableOpacity>
         </View>

             {/* BOTTOM */}
         <View className='absolute bottom-0 flex items-center justify-start w-full h-56 rounded-t-3xl border-[#D0D5DD] bg-white shadow-2xl shadow-slate-950'>
                 {/* TOP LINE */}
               <View className='border-2 w-12 rounded-lg border-[#98A2B3] mt-3'></View>

               {/* RIDER DETAILS */}
               <View className='flex flex-row items-start justify-center w-full mt-8 px-5'>
                   <View className='relative'>
                      <Image className='w-[54px] h-[54px] rounded-full'
                       source={Rider} alt='Rider' />
                       <View className='absolute -right-1 -top-1'>
                          <Verified />
                       </View>
                   </View>

                   <View className='flex flex-1 items-start ml-5'>
                         <View className='flex flex-row items-center justify-start'>
                              <Text className={`text-xl text-[#344054] font-['bold']`}>Opeyemi Fashina</Text>
                              <View className='flex items-center justify-center h-[22px] w-[62px] bg-[#F2C94C] rounded-2xl ml-2'>
                                    <Text className={`text-xs text-[#344054] font-['bold']`}>Rider</Text>
                              </View>
                         </View>
                         <Text className={`text-sm text-[#344054] font-['medium'] mt-1`}>AJKHR81 | Red Bike</Text>
                   </View>
               </View>

               {/* LINES */}
               <View className='w-full border-[1px] border-[#E4E7EC] mt-4'></View>

                 {/* BUTTONS */}
               <View className='flex flex-row items-center justify-between w-full px-5 mt-5'>
                     <TouchableOpacity onPress={handleCallPress}
                     className='flex flex-row items-center justify-center h-[44px] bg-[#27AE60] rounded-lg w-[47.5%] px-2'>
                         <Phone />
                         <Text className={`text-sm text-[#FFFFFF] font-['bold'] ml-3`}>Call</Text>
                     </TouchableOpacity>

                     <TouchableOpacity onPress={()=>navigation.navigate('chatBox')} 
                     className='flex flex-row items-center justify-center h-[44px] bg-[#EBF8FF] rounded-lg w-[47.5%] px-2'>
                         <Chat />
                         <Text className={`text-sm text-[#0077B6] font-['bold'] ml-3`}>Chat</Text>
                     </TouchableOpacity>
               </View>
         </View>
    </View>
  )
}

export default Tracking
