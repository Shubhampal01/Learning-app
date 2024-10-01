import axios from "axios";
const server = String(import.meta.env.VITE_SERVER_PORT)

export class LectureService{
    async getLectureList(id){
        try {
            const response = await axios.get(`${server}/api/lectures/${id}`,{
                headers: {
                    token: localStorage.getItem("token")
                }
            });            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getLecture(lectureId){
        try {
            const response = await axios.get(`${server}/api/lecture/${lectureId}`,{
                headers: {
                    token: localStorage.getItem("token")
                }
            });            
            return response.data;
        } catch (error) {
            throw error;
        }    
    }
    async deleteLecture(lectureId){
        try {
            const response = await axios.delete(`${server}/api/lecture/${lectureId}`,{
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async addLecture(formData,id){
        try {
            const response = await axios.post(`${server}/api/course/${id}`,formData,{
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
const lectureService = new LectureService();
export default lectureService;