import { Dimensions, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Formik } from "formik";
import * as Yup from "yup";



const SignupSchema = Yup.object().shape({
    name: Yup.string().required(),
    phone_number: Yup.string().required().matches(/^(80|81|90|70|91)\d{8}$/),
    address: Yup.string().required(),
  });

export default function DeliveryLocation() {
    const [landmark, setLandmark] = useState('')

    const navigation = useNavigation();

    const ScreenWidth = Dimensions.get('window').width;

    const handleSubmit = async (values) => {
        // const combinedData = {...values, 'landmark': landmark}
        navigation.goBack()
        // console.log(combinedData)
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
             <Text className={`text-2xl text-[#101828] font-['bold'] mt-9`}>Delivery Location 1</Text>
        </View>


        <Formik
          initialValues={{
            name: "",
            phone_number: "",
            address: "",
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
               {/*RECIEVER NAME */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Reciever's name</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base 
                  font-['regular'] ${touched.name && errors.name && 'border-red-500'} ${touched.name && !errors.name && 'border-[#0077B6]'}`}
                  placeholder="Enter receiver's name"
                  values={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={() => setFieldTouched("name")}
                  keyboardType='default'
                  />
              </View>

                 {/*PHONE */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Reciever Phone number</Text>
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

                 {/*RECIEVER'S ADDRESS */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Receiver's address</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base font-['regular']
                  ${touched.address && errors.address && 'border-red-500'} ${touched.address && !errors.address && 'border-[#0077B6]'}`}
                  placeholder='Address'
                  values={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={() => setFieldTouched("address")}
                  keyboardType='default'
                  />
              </View>

                 {/*LANDMARK */}
              <View className='flex items-start justify-start w-full mb-5'>
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Landmark or B/stop</Text>
                  <TextInput className={`h-11 w-full rounded-lg border-[#D0D5DD] border-[1px] mt-2 pl-4 text-[#667085] text-base 
                  font-['regular'] ${landmark !== '' && 'border-[#0077B6]'}`}
                  placeholder='Enter b/stop (optional)'
                  values={landmark}
                  onChangeText={(text)=>setLandmark(text)}
                  />
              </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity onPress={handleSubmit} 
        disabled={!isValid}
        className={`flex items-center justify-center h-11 w-full rounded-lg bg-[#0077B6] mt-12 ${!isValid && 'opacity-30'}`}>
              <Text className={`text-base text-[#FFFFFF] font-['bold'] ml-2`}>Save</Text>
        </TouchableOpacity>

        </ScrollView>
        )}
        </Formik>
    </SafeAreaView>
  )
}
