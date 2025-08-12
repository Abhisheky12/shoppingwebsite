import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//fetch all products
export const fetchAdminProducts = createAsyncThunk("user/fetchAdminProducts", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/api/v1/admin/getallproduct");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error while fetching products")

    }
})
//create products
export const createProducts = createAsyncThunk("user/createProducts", async (productdata, { rejectWithValue }) => {
    try {
        const config={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const { data } = await axios.post("/api/v1/admin/createproduct",productdata,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product creation failed")

    }
})
//update product
export const updateProducts = createAsyncThunk("user/updateProducts", async ({id,productdata}, { rejectWithValue }) => {
    try {
        const config={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const { data } = await axios.put(`/api/v1/admin/updateproduct/${id}`,productdata,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product update failed")

    }
})


const adminSlice=createSlice({
    name:"admin",
    initialState:{
        products:[],
        success:false,
        loading:false,
        error:null,
        product:{}
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
            //fetch prduct
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
                //create product
            builder.
                addCase(createProducts.pending, (state, action) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(createProducts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.success=action.payload.success;
                    state.products.push(action.payload.product);
                   
                })
                .addCase(createProducts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload?.message || "Product update failed";
                    
                })
                 //update product
            builder.
                addCase(updateProducts.pending, (state, action) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateProducts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.success=action.payload.success;
                    state.product=action.payload.product;
                   
                })
                .addCase(updateProducts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload?.message || "Product update failed";
                    
                })
}})
export const { removeErrors, removeSuccess, clearStatus } = adminSlice.actions;
export default adminSlice.reducer;