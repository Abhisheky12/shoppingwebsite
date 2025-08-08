import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//fetch all products
export const fetchAdminProducts = createAsyncThunk("user/fetchAdminProducts", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/api/v1/admin/getallproduct");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to reset password. Try again")

    }


})

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        products:[],
        success:false,
        loading:false,
        error:null,
    },
    reducers:{
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        },
    },
    extraReducers: (builder) => {
            //register cases
            builder.
                addCase(fetchAdminProducts.pending, (state, action) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.products=action.payload.products;
                   
                })
                .addCase(fetchAdminProducts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload?.message || "Error While Fetching the products";
                    
                })
}})
export const { removeErrors, removeSuccess, clearStatus } = adminSlice.actions;
export default adminSlice.reducer;