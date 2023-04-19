import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export const CreateCourse = createAsyncThunk(
  "content/addsubj",

async (course, Sfile , bfile , imgfile ,{ rejectWithValue }) => {
  console.log(course , Sfile , bfile , imgfile)
  try {

    const response = await axios.post(
        `http://127.0.0.1:8000/content/addsubj`,
        {
            subj_name: course.subj_name,
            branch: course.branch,
            sem: course.sem,
            summary: course.summary,
            date: course.date,
            b_file:bfile,
            s_file:Sfile,
            img_file:imgfile,
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-CSRFToken": Cookies.get('csrftoken')

            },
        },
    );
    console.log({ BACKEND_RESPONSE: response });
}catch (e) {
    return rejectWithValue(e.response.data.message);

  }
}
  );

const initialState = {
  courseID : '' ,
  status: 'idle',
  error: null
}
const CreateCourseSlice = createSlice({
  name: 'CreateCourse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateCourse.pending, (state) => {
        state.status = "loading"
        console.log(state.status)
        console.log(state.error)
      })
      .addCase(CreateCourse.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
        console.log(state.error)
        console.log(state.status)

      })
      .addCase(CreateCourse.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.courseID = action.payload
        console.log(state.courseID)
        console.log(state.status)
      })

  }
})
export default CreateCourseSlice.reducer;