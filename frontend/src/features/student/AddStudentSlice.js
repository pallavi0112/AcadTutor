import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export const NewStudent = createAsyncThunk(
    "accounts/register",
    async (student , { rejectWithValue }) => {
      try{
        const response = await axios.post("http://127.0.0.1:8000/accounts/register",
        {
                    email:student.student_email,
                    password :student.student_pswd,
                    re_password :student.student_cpswd,
                    name :student.student_name,
                    branch :student.Branch,
                    semester : student.semester
                  },
        );
        return response.data;
      }
      catch (e) {
        return rejectWithValue(e.response.data.message);
  
      }    
    }
  );
  const initialState = {
    status: 'idle' ,
    error :  null 
  }
  const StudentSignUpSlice = createSlice({
    name:'SignUp' ,
    initialState,
    reducers :{},
    extraReducers : (builder) =>{
        builder
        .addCase(NewStudent.pending , (state)=>{
            state.status = "loading"
        })
        .addCase(NewStudent.rejected , (state , action)=>{
            state.status = "failed"
            console.log("failed")
            console.log(action)
            state.error = action.payload
        })
        .addCase(NewStudent.fulfilled , (state , action)=>{
            state.status = "succeeded"
        })

    }
  })
  export default StudentSignUpSlice.reducer ;