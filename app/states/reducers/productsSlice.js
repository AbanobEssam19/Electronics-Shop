import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../APIs/apis";

export const productsSlice = createSlice({
    name: "productsData",

    initialState: {
        data: null
    },

    reducers: {
        udpateProducts: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    }
});

export const { udpateProducts } = productsSlice.actions;
export default productsSlice.reducer;