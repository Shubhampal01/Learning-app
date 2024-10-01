import axios from "axios";
const server = String(import.meta.env.VITE_SERVER_PORT)

export class CourseService{
    async fetchCourses(){
        try {
            const response = await axios.get(`${server}/api/course/all`);            
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async fetchCourseById(id){
        try {
            const response = await axios.get(`${server}/api/course/${id}`);    
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async fetchMyCourses(){
        try {
            const response = await axios.get(`${server}/api/mycourse`,
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async enrollCourse(id) {
        try {
            const response = await axios.post(`${server}/api/enroll/${id}`,{},{
                headers: {
                    token:localStorage.getItem('token')
                }}
          );
          return response.data;
        } catch (error) {
          throw error;
        }
    }
    async deleteCourse(id) {
        try {
            const response = await axios.delete(`${server}/api/course/${id}`,{
                headers: {
                    token:localStorage.getItem('token')
                }}
          );
          return response.data;
        } catch (error) {
          throw error;
        }
    }
}
const courseService=new CourseService();
export default courseService;