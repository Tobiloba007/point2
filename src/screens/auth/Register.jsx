import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Eye from '../../../assets/icon/eye.svg'
import EyeSlash from '../../../assets/icon/eye-slash.svg'
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux'
import { registerAccount } from '../../features/actions/Authentication';
import { ActivityIndicator } from 'react-native';





const SignupSchema = Yup.object().shape({
  firstname: Yup.string().min(3).max(50).required(),
  lastname: Yup.string().min(3).max(50).required(),
  phone: Yup.string().required().matches(/^(080|081|090|070|091)\d{8}$/),
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string()
    .min(8)
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function Register() {
  const [eye, setEye] = useState(false)
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;

    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
      dispatch(registerAccount(values, setLoading, setError, navigation))
      // console.log(values);
    }

  return (
    <SafeAreaView className={`flex-1 items-center justify-start bg-white pt-8`}>

        <TouchableOpacity onPress={()=>navigation.goBack()}
        className={`flex flex-row items-center justify-start w-full px-5 pb-3 ${Platform.OS === 'ios' && 'pt-7'}`}>
              <Feather name="arrow-left" size={18} color="#344054" />
              <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{width: screenWidth, alignItems: 'center', paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        >
        <View className="items-start w-full mt-5">
             <Text className={`text-2xl text-[#101828] font-['bold']`}>Create your account</Text>
             <View className="flex flex-row items-center justify-start w-full">
                 <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>Have an account?</Text>
                 <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                    <Text className={`text-sm text-[#0077B6] font-['bold'] mt-3`}> Login</Text>
                 </TouchableOpacity>
             </View>
        </View>


        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
            password_confirmation: "",
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
        <KeyboardAvoidingView className="flex items-center justify-start w-full mt-4">
              {/* PHONE */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Phone number</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular']
                   text-[#344054] pl-[87px] ${touched.phone && errors.phone && 'border-red-500'} 
                   ${touched.phone && !errors.phone && 'border-[#0077B6]'}`}
                  placeholder='90722245789'
                  placeholderTextColor={'#667085'}
                  values={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={() => setFieldTouched("phone")}
                  keyboardType='number-pad'
                  />
                  {touched.phone && errors.phone && <Text className='text-red-500 text-[10px] pt-1'>invalid phone number format</Text>}
                  <View className="absolute top-14 left-4 flex flex-row items-center justify-start">
                      <Text className={`text-base text-[#101828] font-['regular'] mr-1`}>+234</Text>
                      <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
                  </View>
            </View>

              {/* EMAIL */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Email Address</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-14 ${touched.email && errors.email && 'border-red-500'} 
                  ${touched.email && !errors.email && 'border-[#0077B6]'}`}
                  placeholder='example@mail.com'
                  placeholderTextColor={'#667085'}
                  values={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  keyboardType='email-address'
                  />
                  {touched.email && errors.email && <Text className='text-red-500 text-[10px] pt-1'>invalid email format</Text>}
                  <View className="absolute top-14 left-4 flex flex-row items-center justify-start">
                      <Feather name="mail" size={22} color="#667085" />
                  </View>
            </View>

              {/* FIRST NAME */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>First Name</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${touched.firstname && errors.firstname && 'border-red-500'} 
                  ${touched.firstname && !errors.firstname && 'border-[#0077B6]'}`}
                  placeholder='First Name'
                  placeholderTextColor={'#667085'}
                  values={values.firstname}
                  onChangeText={handleChange("firstname")}
                  onBlur={() => setFieldTouched("firstname")}
                  keyboardType='default'
                  />
                  {touched.firstname && errors.firstname && 
                    <Text className='text-red-500 text-[10px] pt-1'>minimum of 2 letters</Text>}
            </View>

              {/* LAST NAME */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Last Name</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${touched.lastname && errors.lastname && 'border-red-500'} 
                  ${touched.lastname && !errors.lastname && 'border-[#0077B6]'}`}
                  placeholder='Last Name'
                  placeholderTextColor={'#667085'}
                  values={values.lastname}
                  onChangeText={handleChange("lastname")}
                  onBlur={() => setFieldTouched("lastname")}
                  keyboardType='default'
                  />
                  {touched.lastname && errors.lastname && 
                    <Text className='text-red-500 text-[10px] pt-1'>minimum of 2 letters</Text>}
            </View>

              {/* PASSWORD */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Password</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular']
                   text-[#344054] pl-5 ${touched.password && errors.password && 'border-red-500'} 
                   ${touched.password && !errors.password && 'border-[#0077B6]'}`}
                  placeholder='********'
                  placeholderTextColor={'#667085'}
                  values={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  keyboardType='default'
                  secureTextEntry={eye ? false : true}
                  />
                  {touched.password && errors.password && 
                    <Text className='text-red-500 text-[10px] pt-1'>password must contain one of (A-Z), (a-z) and (0-9) with minimum characters of 8</Text>}

                  <View  className="absolute top-14 right-4 flex flex-row items-center justify-start">
                      {eye ? <EyeSlash onPress={()=>setEye(!eye)} /> : <Eye onPress={()=>setEye(!eye)} />}
                  </View>
            </View>

              {/* CONFIRM PASSWORD */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Confirm Password</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${touched.password_confirmation && errors.password_confirmation && 'border-red-500'} 
                  ${touched.password_confirmation && !errors.password_confirmation && 'border-[#0077B6]'}`}
                  placeholder='********'
                  placeholderTextColor={'#667085'}
                  values={values.password_confirmation}
                  onChangeText={handleChange("password_confirmation")}
                  onBlur={() => setFieldTouched("password_confirmation")}
                  keyboardType='default'
                  secureTextEntry={eye ? false : true}
                  />
                  {touched.password_confirmation && errors.password_confirmation && 
                    <Text className='text-red-500 text-[10px] pt-1'>passwords do not match</Text>}

                  <View  className="absolute top-14 right-4 flex flex-row items-center justify-start">
                      {eye ? <EyeSlash onPress={()=>setEye(!eye)} /> : <Eye onPress={()=>setEye(!eye)} />}
                  </View>
            </View>

            {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-14">
            <Text className={`text-sm text-red-500 font-['medium'] mb-4 w-full text-start`}>{error}</Text>
                  <TouchableOpacity onPress={handleSubmit}
                  disabled={!isValid}
                  className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${!isValid && 'opacity-30'}`}>
                      {loading 
                       ?<ActivityIndicator size="large" color="#ffffff" />
                       :<Text className={`text-base font-[bold] text-white`}>Create your account</Text>
                      }
                  </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
        )}
        </Formik>

        </ScrollView>



    </SafeAreaView>
  )
}