import { Dimensions, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Formik } from "formik";
import * as Yup from "yup";



const SignupSchema = Yup.object().shape({
    customer_name: Yup.string().required(),
    phone_number: Yup.string().required().matches(/^(80|81|90|70|91)\d{8}$/),
    address: Yup.string().required(),
    item_name: Yup.string().required(),
    quantity: Yup.string().required(),
    value: Yup.string().required(),
  });


export default function PickUpDetails() {
    const [dropDown, setDropDown] = useState(false)
    const [selectedOption, setSelelctedOption] = useState('Select Category')
    const [landmark, setLandmark] = useState('')

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

    const handleOption = (item) => {
        setSelelctedOption(item)
        setDropDown(false)
    }

    const handleSubmit = async (values) => {
        const combinedData = {...values, 'category': selectedOption, 'landmark': landmark}
        navigation.goBack()
        console.log(combinedData)
      }

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


        <Formik
          initialValues={{
            customer_name: "",
            phone_number: "",
            address: "",
            item_name: "",
            quantity: "",
            value: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
        <ScrollView contentContainerStyle={{width: ScreenWidth, paddingBottom: 40, paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
        >
        <View className='flex items-start justify-start w-full mt-9'>
               {/*CUSTOMER NAME */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Customer name</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base 
                  font-['regular'] ${touched.customer_name && errors.customer_name && 'border-red-500'} ${touched.customer_name && !errors.customer_name && 'border-[#0077B6]'}`}
                  placeholder='Name'
                  values={values.customer_name}
                  onChangeText={handleChange("customer_name")}
                  onBlur={() => setFieldTouched("customer_name")}
                  keyboardType='default'
                  />
              </View>

                 {/*PHONE */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Phone number</Text>
                  <View className='relative w-full'>
                      <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-[75px] text-[#667085] 
                      text-base font-['regular'] ${touched.phone_number && errors.phone_number && 'border-red-500'} ${touched.phone_number && !errors.phone_number && 'border-[#0077B6]'}`}
                      placeholder='900 000 0000'
                      values={values.phone_number}
                      onChangeText={handleChange("phone_number")}
                      onBlur={() => setFieldTouched("phone_number")}
                      keyboardType='number-pad'
                      />
                      {touched.phone_number && errors.phone_number && <Text className='text-red-500 text-[10px] pt-1'>invalid phone number format</Text>}
                      <View className='absolute top-4 left-4 flex flex-row items-center justify-center'>
                          <Text className={`text-base text-[#101828] font-['regular'] mr-1`}>234</Text>
                          <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
                      </View>
                  </View>
              </View>

                 {/*PICKUP ADDRESS */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Pickup address</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']
                  ${touched.address && errors.address && 'border-red-500'} ${touched.address && !errors.address && 'border-[#0077B6]'}`}
                  placeholder='Select Address'
                  values={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={() => setFieldTouched("address")}
                  keyboardType='default'
                  />
              </View>

                 {/*LANDMARK */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Landmark or B/stop</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']
                  ${landmark !== '' && 'border-[#0077B6]'}`}
                  placeholder='Enter b/stop (optional)'
                  values={landmark}
                  onChangeText={(text)=>setLandmark(text)}
                  keyboardType='default'
                  />
              </View>
        </View>
        
        <Text className={`text-lg text-[#0077B6] font-['bold'] mt-4 mb-5`}>Item details</Text>

        <View className='flex items-start justify-start w-full'>
               {/*ITEM NAME */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Item Name</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']
                  ${touched.item_name && errors.item_name && 'border-red-500'} ${touched.item_name && !errors.item_name && 'border-[#0077B6]'}`}
                  placeholder="Enter Item's Name"
                  values={values.item_name}
                  onChangeText={handleChange("item_name")}
                  onBlur={() => setFieldTouched("item_name")}
                  keyboardType='default'
                  />
              </View>

                 {/*ITEM CATEGORY */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Item Category</Text>
                  <View className='relative w-full'>
                     <TouchableOpacity onPress={()=>setDropDown(!dropDown)}>
                         <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#1D2939] text-base font-['regular']
                                               ${selectedOption !== 'Select Category' && 'border-[#0077B6]'}`}
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
                           <TouchableOpacity key={item.id} onPress={()=>handleOption(item.name)}
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
                      <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base 
                      font-['regular'] ${touched.quantity && errors.quantity && 'border-red-500'} ${touched.quantity && !errors.quantity && 'border-[#0077B6]'}`}
                      placeholder='Quantity'
                      values={values.quantity}
                      onChangeText={handleChange("quantity")}
                      onBlur={() => setFieldTouched("quantity")}
                      keyboardType='number-pad'
                      />
                  </View>

                  <View className='flex items-start justify-start w-[49%] mb-5'>
                      <Text className={`text-sm text-[#101828] font-['bold']`}>Value</Text>
                      <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base 
                      font-['regular'] ${touched.value && errors.value && 'border-red-500'} ${touched.value && !errors.value && 'border-[#0077B6]'}`}
                      placeholder='Value (₦)'
                      values={values.value}
                      onChangeText={handleChange("value")}
                      onBlur={() => setFieldTouched("value")}
                      keyboardType='number-pad'
                      />
                  </View>
              </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity onPress={handleSubmit}
        disabled={!isValid || selectedOption === 'Select Category'}
        className={`flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6] mt-12 ${!isValid && 'opacity-30'} ${selectedOption === 'Select Category' && 'opacity-30'}`}>
              <Text className={`text-base text-[#FFFFFF] font-['bold'] ml-2`}>Save</Text>
        </TouchableOpacity>

        </ScrollView>
        )}
        </Formik>
    </SafeAreaView>
  )
}
