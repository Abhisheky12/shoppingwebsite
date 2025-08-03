import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


//register api
export const register = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
    try {

        const config = {
            Headers: {
                "content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.post('/api/v1/register', userData, config);
        return data;

    }
    catch (error) {

        return rejectWithValue(error.response?.data || "Registration failed. Please try again later ")

    }
}
)

//login api

export const login = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {

    try {

        const config = {
            Headers: {
                "content-Type": "application/json"
            }
        }
        const { data } = await axios.post('/api/v1/login', { email, password }, config);
        return data;


    } catch (error) {

        return rejectWithValue(error.response?.data || "Login failed. Please try again later ")

    }

})
//load user
export const loadUser = createAsyncThunk("user/loaduser", async (_, { rejectWithValue }) => {

    try {
        const { data } = await axios.get("/api/v1/fetchprofile");
        return data;
    } catch (error) {

        return rejectWithValue(error.response?.data || "Failed to load user profile. Try again")

    }


})
//logout
//load user
export const logout = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {

    try {
        const { data } = await axios.post("/api/v1/logout",{withCredentials:true});
        return data;
    } catch (error) {

        return rejectWithValue(error.response?.data || "Failed to logout. Try again")

    }


})


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated: false,
    },
    reducers: {
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
            addCase(register.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Registration failed. Please try again later";
                state.user = null;
                state.isAuthenticated = false;
            })
        //login cases
        builder.
            addCase(login.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);


            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Login failed. Please try again later";
                state.user = null;
                state.isAuthenticated = false;
            })
        //load user

        builder.
            addCase(loadUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);


            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to load user profile. Try again";
                state.user = null;
                state.isAuthenticated = false;
            })
        //logout
        builder.
            addCase(logout.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = null;
                state.isAuthenticated = false;
              


            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to load user profile. Try again"
               

            })
    }
})

export const { removeErrors, removeSuccess, clearStatus } = userSlice.actions;
export default userSlice.reducer;