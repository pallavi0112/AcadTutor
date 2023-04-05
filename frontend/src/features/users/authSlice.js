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
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
        console.log(action)
        state.status = "succeeded";
        console.log("loginUser.fulfilled");
        state.user = action.payload.type;
      });
  },
});

export default authSlice.reducer;
