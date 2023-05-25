import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import Assignment from '../../Component/Assignment/Assignment';
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export const GetAssignments = createAsyncThunk(
  "content/get_teacher_assignment",
async () => {
  try {

    const response = await axios.get(
        `http://127.0.0.1:8000/content/get_teacher_assignment`,    
    );
    console.log({ BACKEND_RESPONSE: response });
    return response.data
}catch (e) {
    return e

  }
}
  );

const initialState = {
  courseID : '' ,
  assignmentData :null,
  filterData : null,
  status: 'idle',
  error: null
}
const GetAssignmentsSlice = createSlice({
  name: 'GetAssignment',
  initialState,
  reducers: {
    FilterAssignmentData : (state , action) =>{
    const assignment_name = action.payload;
    state.filterData = Array.from(state.assignmentData).filter(assignment => assignment.assignment_name === assignment_name)
    // const filteredArray = Array.from(state.assignmentData).filter(assignment => assignment.assignment_name === assignment_name)
    // state.filterData = JSON.parse(JSON.stringify(filteredArray));
    console.log(action.payload)
   console.log(state.assignmentData)
    console.log(state.filterData)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAssignments.pending, (state) => {
        state.status = "loading"
        console.log(state.status)
        console.log(state.error)
      })
      .addCase(GetAssignments.rejected, (state, action) => {
        state.status = "failed"
        console.log(action)
        state.error = action.payload
        

      })
      .addCase(GetAssignments.fulfilled, (state, action) => {
        state.status = "succeeded"
        console.log(action)
        state.assignmentData = action.payload
        console.log(state.assignmentData)
        console.log(state.courseID)
        console.log(state.status)
      })

  }
})
export const {FilterAssignmentData} = GetAssignmentsSlice.actions ;
export default GetAssignmentsSlice.reducer;