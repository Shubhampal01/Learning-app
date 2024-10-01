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
}
const adminService = new AdminService();
export default adminService;