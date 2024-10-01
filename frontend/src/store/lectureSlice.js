import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lectures:[],
    lecture:null
}

export const lectureSlice = createSlice({
    name: "lectures",
    initialState,
    reducers: {
        setLectures: (state, action) => {
            state.lectures = action.payload;
        },
        setLecture:(state,action)=>{
            state.lecture = action.payload;
        }
    }
})
export const {setLectures,setLecture} = lectureSlice.actions;
export default lectureSlice.reducer;