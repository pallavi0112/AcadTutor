import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import showLoginReducer from '../features/Reducer'
import authSlice from '../features/users/authSlice'
import SignUpSlice from '../features/student/AddStudentSlice'
// import TeacherSignUpSlice from '../features/teacher/AddTeacherSlice'

const store = configureStore({
  reducer: {
    showLoginSlice : showLoginReducer,
    auth : authSlice ,
    SignUp : SignUpSlice,
    // TeacherSignUp : TeacherSignUpSlice, 
}
})

export {store}
// setupListeners(store.dispatch)