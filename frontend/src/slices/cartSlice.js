import {createSlice} from '@reduxjs/toolkit';

const initialState= localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cart')) : {cartItems:[]}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        initialState,
        reducers:{}
    },
});

export default cartSlice.reducer;