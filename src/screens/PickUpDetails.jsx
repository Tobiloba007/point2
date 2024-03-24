import { Dimensions, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';



export default function PickUpDetails() {
    const [dropDown, setDropDown] = useState(false)
    const [selectedOption, setSelelctedOption] = useState('Select Category')

    const navigation = useNavigation();

    const ScreenWidth = Dimensions.get('window').width;

    const options = [
        {
            id: 1,
            name: 'Computer Accesories',
        },
        {
            id: 2,
            name: 'Documents',
        },
        {
            id: 3,
            name: 'Electronics',
        },
        {
            id: 4,
            name: 'Food',
        },
    ]



  return (
    <SafeAreaView className="flex items-start justify-start w-full h-full bg-white pt-8">
            {/*HEADER */}
        <View className='relative flex items-start justify-start w-full bg-white pb-1 shadow-2xl px-5'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-5 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`text-2xl text-[#101828] font-['bold'] mt-9`}>Pickup details</Text>
        </View>

        <ScrollView contentContainerStyle={{width: ScreenWidth, paddingBottom: 40, paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
        >
        <View className='flex items-start justify-start w-full mt-9'>
               {/*CUSTOMER NAME */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Customer name</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']`}
                  placeholder='Name'
                  />
              </View>

                 {/*PHONE */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Phone number</Text>
                  <View className='relative w-full'>
                      <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-[75px] text-[#667085] text-base font-['regular']`}
                      placeholder='0000 000 0000'
                      />
                      <View className='absolute top-[30%] left-4 flex flex-row items-center justify-center'>
                          <Text className={`text-base text-[#101828] font-['regular'] mr-1`}>234</Text>
                          <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
                      </View>
                  </View>
              </View>

                 {/*PICKUP */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Pickup address</Text>
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
        
        <Text className={`text-lg text-[#0077B6] font-['bold'] mt-4 mb-5`}>Item details</Text>

        <View className='flex items-start justify-start w-full'>
               {/*ITEM NAME */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Item Name</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']`}
                  placeholder="Enter Item's Name"
                  />
              </View>

                 {/*ITEM CATEGORY */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Item Category</Text>
                  <View className='relative w-full'>
                     <TouchableOpacity onPress={()=>setDropDown(!dropDown)}>
                         <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#1D2939] text-base font-['regular']`}
                         value={selectedOption}
                         editable={false}
                         />
                     </TouchableOpacity>
                      <TouchableOpacity onPress={()=>setDropDown(!dropDown)} 
                      className='absolute top-[45%] right-4 flex flex-row items-center justify-center'>
                          {dropDown
                          ?<SimpleLineIcons name="arrow-up" size={12} color="#667085" />
                          :<SimpleLineIcons name="arrow-down" size={12} color="#667085" />
                          }
                      </TouchableOpacity>
                      {dropDown &&
                      <View className='absolute top-14 w-full bg-white border-[1px] z-50 border-[#D0D5DD] rounded-lg shadow-slate-600'>
                           {options.map((item) => {
                            return(
                           <TouchableOpacity key={item.id} onPress={()=>setSelelctedOption(item.name)}
                            className={`flex flex-row items-center justify-between w-full px-4 py-3 ${selectedOption === item.name && 'bg-[#F9FAFB]'}`}>
                               <Text className={`text-[#344054] text-base font-['medium']`}>
                                    {item.name}
                               </Text>
                               {selectedOption === item.name &&
                               <Feather name="check" size={21} color="#0077B6" />
                               }
                           </TouchableOpacity>
                           )
                           })}
                      </View>
                        }
                  </View>
              </View>

                 {/*QUANTITY AND VALUE */}
              <View className='flex flex-row items-center justify-between w-full'>
                  <View className='flex items-start justify-start w-[49%] mb-5'>
                      <Text className={`text-sm text-[#101828] font-['bold']`}>Quantity</Text>
                      <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']`}
                      placeholder='Quantity'
                      />
                  </View>
                  <View className='flex items-start justify-start w-[49%] mb-5'>
                      <Text className={`text-sm text-[#101828] font-['bold']`}>Value</Text>
                      <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']`}
                      placeholder='Value (N)'
                      />
                  </View>
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
