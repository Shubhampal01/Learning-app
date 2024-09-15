import axios from "axios";
const server = String(import.meta.env.VITE_SERVER_PORT);
export class UserService{
    async login({email,password}){
        try {
            const response = await axios.post(`${server}/api/user/login`, {email,password});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async fetchUser(){
        try {
            const response = await axios.get(`${server}/api/user/me`,{
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            return response.data; 
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    async register({name, email, password}){
        try {
            const response = await axios.post(`${server}/api/user/register`, {name, email, password});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async verifyOTP({otp}){
        try {
            const activationCode = localStorage.getItem("activationCode");
            const response = await axios.post(`${server}/api/user/verify`, {activationCode,otp});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
const userService = new UserService()
export default userService;

