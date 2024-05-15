import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Test = () => {
    const navigation = useNavigation();


  return (
    <View className='flex-1 justify-center items-center'>
        <TouchableOpacity onPress={()=>navigation.navigate('test2')}>
            <Text className={`text-green-600 font-['black']`}>Button</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Test
