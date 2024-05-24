/** @format */

import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlaceInput = ({ onSelectPlace }) => {
  // const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
  const apiKey = "AIzaSyCwBek1VbADBzfIdYFW0R6UQmCoogeqyoc"
  
  return (
    <GooglePlacesAutocomplete
      styles={{
        textInputContainer: {
          width: "100%",
        },
        textInput: {
          height: 40,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#D0D5DD",
          paddingHorizontal: 16,
        },
      }}
      fetchDetails
      placeholder="Search"
      enableHighAccuracyLocation
      keyboardShouldPersistTaps="handled"
      onPress={(data, details = null) => {
        onSelectPlace(details);
      }}
      query={{
        key: apiKey,
        language: "en",
        components: "country:ng",
      }}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      listViewDisplayed="auto"
      debounce={200}
    />
  );
};

export default GooglePlaceInput;
