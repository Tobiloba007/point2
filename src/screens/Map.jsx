import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



export default function Map() {

  return (
    <View className='flex-1 items-center justify-center w-full px-5'>
        <GooglePlacesAutocomplete
         placeholder="Type a place"
         query={{key: 'AIzaSyBBqN-aSPQxao68qfjhmylvyVtccZNcW2E'}}
         fetchDetails={true}
         onPress={(data, details = null) => console.log(data, details)}
         onFail={error => console.log(error)}
         onNotFound={() => console.log('no results')}
         styles={{
            textInputContainer: {
              backgroundColor: 'white',
              marginTop: 100,
              width: '100%',
              height: 38,
              paddingHorizontal: 20,
              borderRadius: 5
            },
            textInput: {
              height: '100%',
              width: '100%',
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />

    </View>
  )
}