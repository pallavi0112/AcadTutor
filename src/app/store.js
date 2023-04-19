import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import showLoginReducer from '../features/Reducer'
import authSlice from '../features/users/authSlice'
import StudentSignUpSlice from '../features/student/AddStudentSlice'
import TeacherSignUpSlice from '../features/teacher/AddTeacherSlice'
import CreateCourseSlice from '../features/teacher/CreateCourseSlice'

const store = configureStore({
  reducer: {
    showLoginSlice : showLoginReducer,
    auth : authSlice ,
    StudentSignUp : StudentSignUpSlice,
    TeacherSignUp : TeacherSignUpSlice, 
    CreateCourse : CreateCourseSlice , 
}
})

export {store}
// setupListeners(store.dispatch)