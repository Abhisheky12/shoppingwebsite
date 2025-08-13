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
//delete product
export const deleteProducts = createAsyncThunk("user/deleteProducts", async ({id}, { rejectWithValue }) => {
    try {
        
        
        const { data } = await axios.delete(`/api/v1/admin/deleteproduct/${id}`);
        
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product deletion failed")

    }
})
// fetch user
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        
        
        const { data } = await axios.get("/api/v1/admin/getallusers");
        
        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || "Failed to fetch users");

    }
})
// get sigle user 
export const getSingleUser = createAsyncThunk("user/getSingleUser", async (id, { rejectWithValue }) => {
    try {
        
        
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        
        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || "Failed to fetch user");

    }
})


const adminSlice=createSlice({
    name:"admin",
    initialState:{
        products:[],
        success:false,
        loading:false,
        error:null,
        product:{},
        deleteLoading:false,
        deleteError:null,
        deletesuccess:null,
        users:[],
        user:{}
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
                    //delete product
            builder.
                addCase(deleteProducts.pending, (state, action) => {
                    state.deleteLoading = true;
                    state.deleteError = null;
                })
                .addCase(deleteProducts.fulfilled, (state, action) => {
                    state.deleteLoading = false;
                    state.deletesuccess=action.payload.success;
                    state.products=state.products.filter((product)=>product._id!==action.payload.product._id)
                   
                })
                .addCase(deleteProducts.rejected, (state, action) => {
                    state.deleteLoading = false;
                    state.deleteError = action.payload?.message || "Product deletion failed";
                    
                })
             //fetch users
            builder.
                addCase(fetchUsers.pending, (state, action) => {
                    state.loading = true;
                    state.deleteError = null;
                })
                .addCase(fetchUsers.fulfilled, (state, action) => {
                    state.loading = false;
                    state.users=action.payload.users
                })
                .addCase(fetchUsers.rejected, (state, action) => {
                    state.loading = false;
                    state.deleteError = action.payload?.message || "Failed to fetch products";
                    
                })
                 //fetch user
            builder.
                addCase(getSingleUser.pending, (state, action) => {
                    state.loading = true;
                    state.deleteError = null;
                })
                .addCase(getSingleUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user=action.payload.user
                })
                .addCase(getSingleUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload?.message || "Failed to fetch products";
                    
                })
}})

export const { removeErrors, removeSuccess, clearStatus } = adminSlice.actions;
export default adminSlice.reducer;