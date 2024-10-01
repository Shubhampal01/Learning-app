import lectureService from "../service/lectureService";
import { setLectures,setLecture } from "../store/lectureSlice";
const getLectureList = async(dispatch,id)=>{
    try {
        const data = await lectureService.getLectureList(id);
        dispatch(setLectures(data.lectures));
    } catch (error) {
        console.log(error);
    }
}

const getLecture = async(dispatch,id)=>{
    try {
        const data = await lectureService.getLecture(id);
        dispatch(setLecture(data.lecture));
    } catch (error) {
        console.log(error);
    }
}
const deleteLecture = async(dispatch,id)=>{
    try {
        const data = await lectureService.deleteLecture(id);
        getLectureList(dispatch,id);
        return data;
    } catch (error) {
        console.log(error);
    }
}
const addLecture = async(dispatch,formData,id)=>{
    try {
        const data = await lectureService.addLecture(formData,id);
        getLectureList(dispatch,id);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export {getLectureList,getLecture,deleteLecture,addLecture}