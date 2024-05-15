import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        pickup: '',
        delivery: '',
        orderResponse: '',
        orderCharges: ''
    },

    reducers: {
        setPickUp: (state, action) => {
            state.pickup = action.payload;
        },
        setDelivery: (state, action) => {
            state.delivery = action.payload;
        },
        setOrderResponse: (state, action) => {
            state.orderResponse = action.payload;
        },
        setOrderCharges: (state, action) => {
            state.orderCharges = action.payload;
        },
    },
});


export const { setPickUp, setDelivery, setOrderResponse, setOrderCharges } = orderSlice.actions;


export default orderSlice.reducer;