import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showHide : false,
    addunitshowhide : false,
    addtopic : false,
    unit_id : '',
    topicformstatus : false,
    breadcurmbs : [
        
    ]
}

export const showLoginSlice = createSlice({
    name:"showLogin",
    initialState,
    reducers:{
        showHide:(state,action)=>{
            state.showHide = action.payload
        },
        AddUnitShowHide:(state,action)=>{
            state.addunitshowhide = action.payload
        },
        AddTopic:(state,action)=>{
            state.addtopic = action.payload
        },
        AddUnitId :(state , action)=>{
            console.log(action.payload)
            state.unit_id = action.payload
        },
        TopicFormStatus:(state , action)=>{
            console.log(action.payload)
            state.topicformstatus= action.payload
        }

    }

      
    
})

export const {showHide , AddUnitShowHide , AddTopic , TopicFormStatus , AddUnitId} = showLoginSlice.actions;
export default showLoginSlice.reducer 
