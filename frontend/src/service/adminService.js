import axios from "axios";
const server = String(import.meta.env.VITE_SERVER_PORT)

export class AdminService{
    async getStats(){
        try {
            const response = await axios.get(`${server}/api/stats`,{
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            return response.data
        } catch (error) {
            throw error;
        }
    }
    async addCourse(course){
        try {
            const response = await axios.post(`${server}/api/course/new`,course,{
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            return response.data
        } catch (error) {
            throw error;
        }
    }
    async getUsers(){
        try {
            const response = await axios.get(`${server}/api/users`,
            {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async updateRole(id){
        try {
            const response = await axios.put(`${server}/api/user/${id}`,{},{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
const adminService = new AdminService();
export default adminService;