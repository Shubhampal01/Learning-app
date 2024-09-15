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
}