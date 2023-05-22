import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showHide : false,
    assignmentForm : false ,
    addunitshowhide : false,
    assignmentContainer2Show : false ,
    addtopic : false,
    unit_id : '',
    subject_id:localStorage.getItem("Subject_id") || null,
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
        AssignmentFormShow:(state,action)=>{
            state.assignmentForm = action.payload
        },
        AssignmentContainer2Show:(state,action)=>{
            console.log(action.payload)
            state.assignmentContainer2Show = action.payload
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

export const {showHide , AddUnitShowHide , AddTopic , TopicFormStatus , AddUnitId , AssignmentFormShow , AssignmentContainer2Show } = showLoginSlice.actions;
export default showLoginSlice.reducer 
