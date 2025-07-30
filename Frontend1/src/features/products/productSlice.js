import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const getProduct=createAsyncThunk("product/getProduct",async(payload,{rejectWithValue})=>{
  try {
      const link="/product/getproducts";
      const {data}=await axios.get(link);
      console.log(data);
      
      return data;
      

  } catch (error) {
    //error.response?.data =object send by backed inside of catch block
      return rejectWithValue(error.response?.data?.message||"An error occured")
  }
})

const productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        productCount:0,
        loading:false,
        error:null
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        }
    },
    //state =initialState object above here 
    extraReducers:(builder)=>{
        builder.addCase(getProduct.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        // in fullfilled case action.payload is the object that is return from the backend in response
        .addCase(getProduct.fulfilled,(state,action)=>{
              state.loading=false;
              state.error=null;
              state.products=action.payload.products;
              state.productCount=action.payload.productCount;
        })
         .addCase(getProduct.rejected,(state,action)=>{
              state.loading=false;
              state.error=action.payload || "Something went wrong";
        })
    }
})

export const{removeErrors}=productSlice.actions;
export default productSlice.reducer;