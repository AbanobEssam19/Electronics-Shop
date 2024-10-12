import { createSlice } from "@reduxjs/toolkit";
import { fetchCarts } from "../APIs/apis";

export const cartsSlice = createSlice({
    name: "cartsData",

    initialState: {
        data: null
    },

    reducers: {
        updateCarts: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCarts.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    }
});

export const { updateCarts } = cartsSlice.actions;
export default cartsSlice.reducer;