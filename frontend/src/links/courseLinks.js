import { setCourses,setCourseDesc,setMyCourses } from "../store/courseSlice";
import courseService from "../service/courseService";
const fetchCourse= async (dispatch)=>{
    try {
        const data = await courseService.fetchCourses();
        dispatch(setCourses(data.courses));
      } catch (error) {
        console.log(error);
      }
}
const fetchCourseById= async (dispatch,id)=>{
    try {
        const data = await courseService.fetchCourseById(id);
        dispatch(setCourseDesc(data.course));
      } catch (error) {
        console.log(error);
      }
}
const fetchMyCourses= async (dispatch)=>{
    try {
        const data = await courseService.fetchMyCourses();
        dispatch(setMyCourses(data.courses));
      } catch (error) {
        console.log(error);
      }
}
const deleteCourse = async(dispatch,id)=>{
  try {
    const data = await courseService.deleteCourse(id);
    fetchCourse(dispatch);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export {fetchCourse,fetchCourseById, fetchMyCourses,deleteCourse}