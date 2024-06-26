import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: '',
        isLoggedIn: false,
        token: null,
        // access_token: null,
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoginToken: (state, action) => {
            state.token = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        // setAccessToken: (state, action) => {
        //     return { ...state, access_token: action.payload };
        //   },
    },
});


export const { setUser, setLoginToken, setLoggedIn } = authSlice.actions;


export default authSlice.reducer;