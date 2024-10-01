import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCourses: [],
  course: null,
  myCourses: [],
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.allCourses = action.payload;
    },
    setCourseDesc: (state, action) => {
      state.course = action.payload;
    },
    setMyCourses: (state, action) => {
      state.myCourses = action.payload;
    },
  },
});
export const { setCourses,setCourseDesc,setMyCourses } = courseSlice.actions;
export default courseSlice.reducer;