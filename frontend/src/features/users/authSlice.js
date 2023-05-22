import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export const loginUser = createAsyncThunk(
  "accounts/login",
  async ({ email, password } , { rejectWithValue }) => {
    try{
      const response = await axios.post("http://127.0.0.1:8000/accounts/login", {
        email,
        password,}
        );
        console.log(response)
      return response.data;
    }
    catch (e) {
      return rejectWithValue(e.response.data.message);

    }
    
  }
);

const initialState = {
  user:localStorage.getItem("userType") || null ,
  status: "idle",
  error: null,
  isAuthenticated: localStorage.getItem("isAuthenticated") || "false",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem("isAuthenticated" , false);
      localStorage.setItem("userType" , null);
      // try {
      //   const response = axios.post("http://127.0.0.1:8000/accounts/logout");
      //   console.log(response)
        
      // } catch (error) {
      //   console.log(error)
      // }
      console.log(state.isAuthenticated)
      console.log(state.user)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        console.log("loginUser.rejected");
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("userType" , action.payload.type)
        localStorage.setItem("isAuthenticated" , true)
        state.user = action.payload.type;
      });
  },
});
export const  {logout} =  authSlice.actions ;
export default authSlice.reducer;
