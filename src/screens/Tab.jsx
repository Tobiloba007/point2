import { View, Text, StatusBar, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import HomeIcon from '../../assets/icon/home.svg'
import HomeIcon2 from '../../assets/icon/home2.svg'
import ActivityIcon from '../../assets/icon/activity.svg'
import ActivityIcon2 from '../../assets/icon/activity2.svg'
import NotificationIcon from '../../assets/icon/notification.svg'
import NotificationIcon2 from '../../assets/icon/notification2.svg'
import ProfileIcon from '../../assets/icon/profile.svg'
import ProfileIcon2 from '../../assets/icon/profile2.svg'
import { Ionicons } from '@expo/vector-icons';
import HomePage from './HomePage'
import ActivityPage from './ActivityPage'
import NotificationPage from './NotificationPage'
import ProfilePage from './ProfilePage'
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import DeleteModal from '../components/profilePage/DeleteModal'
import SendPackage from './SendPackage'


export default function Tab() {
  const [tab, setTab] = useState('Home')
  const [inputModal, setInputModal] = useState(false)
  const [deleteCard, setDeleteCard] = useState(false)


  const handleTab = (active) => {
    setTab(active)
    console.log(tab);
  }

  return (
    <View className="flex-1 justify-end w-full bg-white">
       <StatusBar backgroundColor="#EBF8FF" barStyle="dark-content" />
        <View className='flex-1'>
           {
              tab === 'Home' ? <HomePage setInputModal={setInputModal} />
            : tab === 'Activity' ? <ActivityPage />
            : tab === 'Notification' ? <NotificationPage />
            : tab === 'Profile' ? <ProfilePage setDeleteCard={setDeleteCard} />
            : tab === 'Package' && <SendPackage />
           }
        </View>


        <View className="flex flex-row items-center justify-between w-full bg-white pt-2 shadow-2xl shadow-slate-950">
            <TouchableOpacity onPress={()=>handleTab('Home')} 
            className="flex items-center justify-center w-[20%]">
               {
                tab === 'Home' ? <HomeIcon height={24} width={24} /> : <HomeIcon2 height={24} width={24} />
               }
               <Text className={`text-xs text-[${tab === 'Home' ? '#0077B6' : '#475467'}] font-['regular'] mt-2`}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleTab('Activity')} 
            className="flex items-center justify-center w-[20%]">
               {
                tab === 'Activity' ? <ActivityIcon2 height={24} width={24} /> : <ActivityIcon height={24} width={24} />
               }
               <Text className={`text-xs text-[${tab === 'Activity' ? '#0077B6' : '#475467'}] font-['regular'] mt-2`}>Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleTab('Package')} 
            className="flex items-center justify-center h-[55px] w-[55px] rounded-full bg-[#CCE4F0] p-[3px] mb-9">
                <View className="flex items-center justify-center h-full w-full rounded-full bg-[#0077B6]">
                    <Ionicons name="add-outline" size={18} color="#CCE4F0" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleTab('Notification')} 
            className="flex items-center justify-center w-[20%]">
             {
              tab === 'Notification' ? <NotificationIcon2 height={24} width={24} /> : <NotificationIcon height={24} width={24} />
             }
               <Text className={`text-xs text-[${tab === 'Notification' ? '#0077B6' : '#475467'}] font-['regular'] mt-2`}>Notification</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleTab('Profile')} 
            className="flex items-center justify-center w-[20%]">
               {
                 tab === 'Profile' ? <ProfileIcon2 height={24} width={24} /> : <ProfileIcon height={24} width={24} />
               }
               <Text className={`text-xs text-[${tab === 'Profile' ? '#0077B6' : '#475467'}] font-['regular'] mt-2`}>Profile</Text>
            </TouchableOpacity>

            
        </View>

        {inputModal &&
        <Pressable onPress={()=>setInputModal(false)}
        className='absolute w-full h-full bg-[#A4A4A4] opacity-60'></Pressable>
        }

        {deleteCard &&
        <Pressable onPress={()=>setDeleteCard(false)}
        className='absolute w-full h-full bg-[#A4A4A4] opacity-60'></Pressable>
        }

        {deleteCard && <DeleteModal setDeleteCard={setDeleteCard} />}

        {inputModal && 
          <View className='absolute flex items-center justify-start w-full h-[85%] bg-white z-50 rounded-t-2xl shadow-2xl pt-6 px-5'>
              <View className='flex flex-row items-center justify-between w-full'>
                  <Text className={`text-base text-[#1D2939] font-['medium']`}>Input your address below</Text>
                  <AntDesign onPress={()=>setInputModal(false)}
                  name="closecircleo" size={24} color="#475467" />
              </View>

              <View className="relative items-start justify-start w-full mt-5">
                  <TextInput className="mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-sm font-['regular'] text-[#98A2B3] pl-14"
                  placeholder='street no, b/stop'
                  placeholderTextColor={'#667085'}
                  keyboardType='default'
                  />
                  <View className="absolute bottom-[13px] left-5 flex flex-row items-center justify-start">
                       <Fontisto name="search" size={22} color="#98A2B3" />
                  </View>
              </View>

              <Text className={`text-sm text-left w-full mt-3 text-[#475467] font-['regular']`}>
                 Kindly enter the most accurate address to find you
              </Text>

          </View>
        }
        
    </View>
  )
}