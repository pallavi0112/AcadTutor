import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import showLoginReducer from '../features/Reducer'
import SubTopicsReducer from '../features/TopicReducer'

export const store = configureStore({
  reducer: {
    showLoginSlice : showLoginReducer,
    SubTopicsSlice : SubTopicsReducer,
}
})

setupListeners(store.dispatch)