import axios from "axios";
export class UserService{
    async login({email,password}){
        const server = import.meta.env.VITE_SERVER_PORT;;
        try {
            const userData = await axios.post(`${server}/api/user/login`, {email,password});
            return userData;
        } catch (error) {
            console.log(error);
        }
    }
}
const userService = new UserService()
export default userService;

