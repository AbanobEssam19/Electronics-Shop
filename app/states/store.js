import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { productsSlice } from "./reducers/productsSlice";
import { cartsSlice } from "./reducers/cartsSlice";
import { modalSlice } from "./reducers/modalSlice";

export default configureStore({
    reducer: {
        userData: userSlice.reducer,
        productsData: productsSlice.reducer,
        cartsData: cartsSlice.reducer,
        modalData: modalSlice.reducer
    }
});