import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../APIs/apis";

export const userSlice = createSlice({
    name: "userData",

    initialState: {
        data: null
    },

    reducers: {
        udpateUser: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
});

export const { udpateUser } = userSlice.actions;
export default userSlice.reducer;