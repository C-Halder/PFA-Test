import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GETPRODUCTS } from '../api/api';
import Toast from 'react-native-toast-message';


export const getProducts = createAsyncThunk('/products', async ( payload,  { rejectWithValue }) => {
    try {
        const res = await GETPRODUCTS();
        if (res?.data?.products) {
            return res.data.products;
        } else {
            Toast.show({
                type: "error",
                text1: "No Products Found!",
                text2: res?.data?.message,
            });
            return res.data;
        }
    } catch (exc) {
        Toast.show({
            type: "error",
            text1: "Something Went Wrong!",
            text2: exc.response.data.message,
        });
        return rejectWithValue(exc.response.data);
    }
});


const UserSlice = createSlice({
    name: "userSlice",
    initialState: {
        status: false,
        products: [],
        cart:[]
    },
    reducers: {
        logOut(state, { payload }) {
            AsyncStorage.removeItem("@user");
            payload.replace("login");
        },
        loginByAsync(state, { payload }) {
            state.user = payload.data;
        },
        addToCart(state, {payload}){
            const data = [...state.cart];
            data.push(payload);
            state.cart = data;
            console.log(state.cart);
            Toast.show({
                type: "success",
                text1: "Product added successfully",
                text2: payload?.title,
            });
        }
    },
    extraReducers: builder => {
        builder.addCase(getProducts.pending, (state, { payload }) => {
            state.status = true;
        })
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.status = false;
            state.products = payload;
        })
        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.status = false;
        })
    }
});

export const { logOut, loginByAsync, addToCart } = UserSlice.actions;
export default UserSlice.reducer;