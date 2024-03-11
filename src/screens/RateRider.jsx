import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Star from '../../assets/icon/Star.svg'
import StarRating from 'react-native-star-rating';




export default function RateRider() {
    const [review, setReview] = useState(false);
    const [starCount, setStarCount] = useState(0);


    const navigation = useNavigation(0);

    const handleStar = (selectedRating) => {
        setRating((prevRating) => {
            // Toggle the selected state for the clicked star and all stars to its left
            return prevRating === selectedRating ? 0 : selectedRating;
          });
    }

  return (
    <SafeAreaView className="flex items-center justify-start w-full h-full bg-white px-5"
    style={{paddingTop: StatusBar.currentHeight}}>
            {/*HEADER */}
        <View className='relative flex flex-row items-center justify-center w-full bg-white pb-7 shadow-2xl'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-0 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Rate Rider</Text>
        </View>



        <Text className={`text-base text-[#475467] font-['bold'] mt-16 w-[70%]`}>
           Your order has been completed leave a rating or 
            <Text onPress={()=>setReview(true)}
            className={`text-[#0077B6]`}> write a review</Text>
        </Text>

        <View className={`flex flex-row items-center justify-center w-[75%] mt-11`}>
            <StarRating
               disabled={false}
               maxStars={5}
               rating={starCount}
               selectedStar={(rating) => setStarCount(rating)}
               starSize={30}
               fullStarColor={'#E2B65F'}
               emptyStarColor={'#F3E2BF'}
               buttonStyle={{marginHorizontal: 10,}}
            />
        </View>


        {/* TEXTAREA */}
        { review &&
        <View className='flex items-center justify-start w-full mt-14'>
             <TextInput className={`border-[1px] border-[#D0D5DD] bg-[#F9FAFB] w-full rounded-2xl text-sm font-['regular'] px-4 pt-4`}
              multiline={true}
              numberOfLines={8} // You can adjust the number of lines displayed
              placeholder="Rider was fast"
              textAlignVertical="top"
             />
             <View className="flex items-center justify-center w-full mt-8">
                <TouchableOpacity className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                    <Text className={`text-base font-[bold] text-white`}>Leave review</Text>
                </TouchableOpacity>
             </View>
        </View>

        }


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})