import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
export const NewTeacher = createAsyncThunk(
    "accounts/teacher_register",
    async ( teacher , { rejectWithValue }) => {
        console.log(teacher)
      try{
        const response = await axios.post("http://127.0.0.1:8000/accounts/teacher_register", teacher);
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