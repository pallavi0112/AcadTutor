import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export const GetAssignmnets = createAsyncThunk(
  "content/addsubj",
async ({ rejectWithValue }) => {
  try {

    const response = await axios.get(
        `http://127.0.0.1:8000/content/get_teacher_assignmnet`,    
    );
    console.log({ BACKEND_RESPONSE: response });
}catch (e) {
    return rejectWithValue(e.response.data.message);

  }
}
  );

const initialState = {
  courseID : '' ,
  assignmnetData : [],
  status: 'idle',
  error: null
}
const GetAssignmnetSlice = createSlice({
  name: 'GetAssignmnet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAssignmnets.pending, (state) => {
        state.status = "loading"
        console.log(state.status)
        console.log(state.error)
      })
      .addCase(GetAssignmnets.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
        console.log(state.error)
        console.log(state.status)

      })
      .addCase(GetAssignmnets.fulfilled, (state, action) => {
        state.status = "succeeded"
        console.log(action)
        state.courseID = action.payload
        console.log(state.courseID)
        console.log(state.status)
      })

  }
})
export default GetAssignmnetSlice.reducer;