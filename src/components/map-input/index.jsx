/** @format */

import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLEKEY } from "../../_shared";



const GooglePlaceInput = ({ onSelectPlace }) => {
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
        key: GOOGLEKEY,
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
