import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topics : []
}

export const SubTopicsSlice = createSlice({
    name:"SubTopics",
    initialState,
    reducers:{
        setSubTopics:(state,action)=>{
            console.log(action)
            state.topics = action.payload
        }
    }
})

export const {setSubTopics} = SubTopicsSlice.actions;
export default SubTopicsSlice.reducer