import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const NewStudent = createAsyncThunk(
  "accounts/register",
  async (student, { rejectWithValue }) => {
    console.log(student)
    try {
      const response = await axios.post("http://127.0.0.1:8000/accounts/register",
        {
          email: student.student_email,
          password: student.student_pswd,
          re_password: student.student_cpswd,
          name: student.student_name,
          branch: student.Branch,
          semester: student.semester
        },
      );
      return response.data;
    }
    catch (e) {
      return rejectWithValue(e.response.data.message);

    }
  }
);
export const NewTeacher = createAsyncThunk(
  "accounts/teacher_register",
  async (teacher, { rejectWithValue }) => {
    console.log(teacher)
    try {
      const response = await axios.post("http://127.0.0.1:8000/accounts/teacher_register",
        {
          name: teacher.teacher_name,
          email: teacher.teacher_email,
          password: teacher.teacher_pswd,
          re_password: teacher.teacher_cpswd,
          refc: teacher.teacher_refc
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
  status: 'idle',
  error: null
}
const SignUpSlice = createSlice({
  name: 'SignUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(NewStudent.pending, (state) => {
        state.status = "loading"
      })
      .addCase(NewStudent.rejected, (state, action) => {
        state.status = "failed"
        console.log("failed")
        console.log(action.payload)
        state.error = action.payload
      })
      .addCase(NewStudent.fulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addCase(NewTeacher.pending, (state) => {
        state.status = "loading"
      })
      .addCase(NewTeacher.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(NewTeacher.fulfilled, (state, action) => {
        state.status = "succeeded"
      })

  }
})
export default SignUpSlice.reducer;