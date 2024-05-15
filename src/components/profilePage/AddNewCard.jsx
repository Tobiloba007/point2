import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MasterCard from '../../../assets/icon/logos_mastercard.svg'
import { Formik } from "formik";
import * as Yup from "yup";



const AddCardSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required(),
  card_number: Yup.string().min(14).max(14).required(),
  ccv_number: Yup.string().min(3).max(3).required(),
  expiration_date: Yup.string().min(4).max(5).required(),
});

export default function AddNewCard({setPages}) {
  const [eye, setEye] = useState(false)


  const screenWidth = Dimensions.get('window').width;


  const handleSubmit = async (values) => {
    setPages(0)
    // console.log(values)
  }

  return (
    <ScrollView contentContainerStyle={{width: screenWidth, paddingBottom: 40}}
      showsVerticalScrollIndicator={false}
      >
    <View className="flex items-start justify-start w-full bg-white mt-9 px-5">

        <Formik
        initialValues={{
          name: "",
          card_number: "",
          ccv_number: "",
          expiration_date: "",
        }}
        validationSchema={AddCardSchema}
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
        <KeyboardAvoidingView className="flex items-center justify-start w-full">

              {/* CARD HOLDERS NAME */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Card Holder's Name</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${touched.name && errors.name && 'border-red-500'} ${touched.name && !errors.name && 'border-[#0077B6]'}`}
                  placeholder='enter name on card'
                  placeholderTextColor={'#667085'}
                  values={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={() => setFieldTouched("name")}
                  keyboardType='default'
                  />
            </View>

            {/* CARD NUMBER */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Card Number</Text>
                  <TextInput className={`-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-4 ${touched.card_number && errors.card_number && 'border-red-500'} ${touched.card_number && !errors.card_number && 'border-[#0077B6]'}`}
                  placeholder='0000 0000 0000'
                  placeholderTextColor={'#667085'}
                  values={values.card_number}
                  onChangeText={handleChange("card_number")}
                  onBlur={() => setFieldTouched("card_number")}
                  keyboardType='default'
                  />
                  <View className="absolute bottom-[13px] right-4 flex flex-row items-center justify-start">
                       <MasterCard />
                  </View>
            </View>

            {/* CCV AND EXPIRATION */}
            <View className='flex flex-row items-center justify-between w-full'>
                   {/* CCV */}
                  <View className="relative items-start justify-start w-[47.5%] mt-3">
                      <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>CCV</Text>
                      <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                      text-[#344054] pl-5 ${touched.ccv_number && errors.ccv_number && 'border-red-500'} ${touched.ccv_number && !errors.ccv_number && 'border-[#0077B6]'}`}
                      placeholder='123'
                      placeholderTextColor={'#667085'}
                      values={values.ccv_number}
                      onChangeText={handleChange("ccv_number")}
                      onBlur={() => setFieldTouched("ccv_number")}
                      keyboardType='number-pad'
                      />
                  </View>

                   {/* EXPIRATION */}
                  <View className="relative items-start justify-start w-[47.5%] mt-3">
                      <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Expiration</Text>
                      <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                      text-[#344054] pl-5 ${touched.expiration_date && errors.expiration_date && 'border-red-500'} ${touched.expiration_date && !errors.expiration_date && 'border-[#0077B6]'}`}
                      placeholder='12/28'
                      placeholderTextColor={'#667085'}
                      values={values.expiration_date}
                      onChangeText={handleChange("expiration_date")}
                      onBlur={() => setFieldTouched("expiration_date")}
                      keyboardType='default'
                      />
                  </View>
            </View>



              {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-28">
                  <TouchableOpacity onPress={handleSubmit} 
                  disabled={!isValid}
                  className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${!isValid && 'opacity-30'}`}>
                      <Text className={`text-base font-[bold] text-white`}>Save</Text>
                  </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
        )}
        </Formik>


    </View>
    </ScrollView>
  )
}