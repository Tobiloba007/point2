/** @format */

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setDelivery,
  setOrderCharges,
  setOrderResponse,
  setPickUp,
} from "../orderSlice";

const BASE_URL = "https://api.test-point2api.online/api";

//  GET CHARGES
export const getCharges = (values, setError) => async (dispatch) => {
  const loginToken = await AsyncStorage.getItem("loginToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${loginToken}`,
  };
  console.log(loginToken);
  //  setLoading(true)
  try {
    const response = await axios.post(
      `${BASE_URL}/user/orders/get-charges`,
      values,
      { headers }
    );
    if (response.status === 200) {
      // console.log(response.data.message);
      // console.log(response.data);
      dispatch(setOrderCharges(response.data.data));
    } else if (response.status !== 200) {
      console.log("Registration failed with status code:", response.status);
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.message);
      console.error("API Error:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received (e.g., network issue)
      setError("Please check your internet connection...");
      console.error("Network Error:", error.request);
    }
  }

  // setLoading(false)
};

//  CREATE ORDER
export const createOrder =
  (oderValues, setLoading, setError, setSummary) => async (dispatch) => {
    const loginToken = await AsyncStorage.getItem("loginToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/orders/create`,
        oderValues,
        { headers }
      );

      if (response.status === 201) {
        // console.log(response.data.message);
        // console.log(response.data.data);
        // console.log(response.data.data);

        dispatch(setOrderResponse(response.data.data));
        setSummary(true);
        dispatch(setDelivery(""));
        dispatch(setPickUp(""));
      } else if (response.status !== 201) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
        console.error("API Error:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoading(false);
  };

//  CHECKOUT
export const checkOut =
  (
    values,
    setLoading,
    setError,
    Linking,
    setPickup,
    setDeliveryState,
    setTab
  ) =>
  async (dispatch) => {
    const loginToken = await AsyncStorage.getItem("loginToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/orders/order-checkout`,
        values,
        { headers }
      );
      if (response.status === 200) {
        // console.log(response.data.message);
        // console.log(response.data.data);
        Linking.openURL(response.data.data.authorization_url);
        setTab("Home");
        setPickup(true);
        setDeliveryState(true);
      } else if (response.status !== 200) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        // console.error('API Error:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoading(false);
  };

// ACTIVITY
export const getAllOrders =
  (setActivity, setLoading, setError, setEmpty) => async () => {
    setLoading(true);
    const loginToken = await AsyncStorage.getItem("loginToken");
    const headers = {
      Authorization: `Bearer ${loginToken}`,
    };
    try {
      const response = await axios.get(`${BASE_URL}/user/orders/getorders`, {
        headers,
      });
      if (response.status === 200) {
        setActivity(response.data.data.orders.data);
        // console.log(response.data.data.orders.data)
        if (response.data.data.orders.data.length === 0) {
          setEmpty(true);
        }
      } else if (response.status !== 200) {
        console.log("request failed status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.error("API Error:", error.response.status);
      } else if (error.request) {
        //   console.log(error.response.);
        setError("Please check your internet connection...");
      }
    }

    setLoading(false);
  };

// ACTIVITY
export const getSingleActivity =
  (setLoadDetails, navigation, itemId) => async () => {
    setLoadDetails(true);
    const loginToken = await AsyncStorage.getItem("loginToken");
    const headers = {
      Authorization: `Bearer ${loginToken}`,
    };
    try {
      const response = await axios.get(
        `${BASE_URL}/user/orders/getorders?id=${itemId}`,
        { headers }
      );
      if (response.status === 200) {
        // console.log(response.data.data, 'datas')
        const data = response.data.data;
        navigation.navigate("viewDetailsPage", { data });
      } else if (response.status !== 200) {
        console.log("request failed status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.error("API Error:", error.response.status);
      } else if (error.request) {
        //   console.log(error.response.);
        //   setError('Please check your internet connection...')
      }
    }

    setLoadDetails(false);
  };



  // UPLOAD PICTURE
  export const UploadPicture = (formData, setError, setLoading) => async (dispatch) => {
    const loginToken = await AsyncStorage.getItem('loginToken');
    const headers = {
      'Authorization': `Bearer ${loginToken}`,
      'Content-Type': 'multipart/form-data',
    };
    setLoading(true)
     try{
       const response = await axios.post(`${BASE_URL}/profile/upload-photo`, formData, { headers });
       if (response.status === 200) {
         console.log(response.data.message)
       } else if (response.status !== 200) {
         console.log('picture upload failed with status code:', response.status);
       } 
     } catch(error) {
         if (error.response) {
           // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
           setError(error.response, 'ERROR')
           // console.log(error.response.data.message)
           console.error('API Error:', error.response.data.status);
         } else if (error.request) {
           // The request was made but no response was received (e.g., network issue)
           setError('Please check your internet connection...')
           console.error('Network Error:', error.request);
         } 
       };
     
       setLoading(false)
}


// EDIT DETAILS
export const editDetails = (values, setError, setSuccess, setLoading) => async () => {
    const loginToken = await AsyncStorage.getItem("loginToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`,
    };
    setLoading(true);
    setError('')
    setSuccess('')
    try {
      const response = await axios.post(`${BASE_URL}/profile/edit-details`, values, { headers }
      );
      if (response.status === 200) {
        setSuccess(response.data.message)
        // console.log(response.data.message);
      } else if (response.status !== 200) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        setError(error.response.message);
        console.log(error.response);
        console.error("API Error:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoading(false);
  };