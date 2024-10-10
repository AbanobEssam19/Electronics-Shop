import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modalData",

    initialState: {
        data: null
    },

    reducers: {
        udpateModal: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { udpateModal } = modalSlice.actions;
export default modalSlice.reducer;