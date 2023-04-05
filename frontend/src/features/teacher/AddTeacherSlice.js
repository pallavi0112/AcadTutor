import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export const NewTeacher = createAsyncThunk(
    "accounts/teacher_register",
    async ( teacher , { rejectWithValue }) => {
        console.log(teacher)
      try{
        const response = await axios.post("http://127.0.0.1:8000/accounts/teacher_register", 
        {
                  name : teacher.teacher_name,
                  email: teacher.teacher_email,
                  password : teacher.teacher_pswd,
                  re_password : teacher.teacher_cpswd,
                  refc : teacher.teacher_refc
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
  const TeacherSignUpSlice = createSlice({
    name:'SignUp' ,
    initialState,
    reducers :{},
    extraReducers : (builder) =>{
        builder
        .addCase(NewTeacher.pending , (state)=>{
            state.status = "loading"
        })
        .addCase(NewTeacher.rejected , (state , action)=>{
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(NewTeacher.fulfilled , (state , action)=>{
            state.status = "succeeded"
        })

    }
  })
  export default TeacherSignUpSlice.reducer ;