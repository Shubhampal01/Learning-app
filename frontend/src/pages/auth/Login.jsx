import React from 'react'
import {Link, useNavigate} from'react-router-dom'
import {Input, Button } from '../../components';
import {useForm} from 'react-hook-form'
import userService from '../../service/userService';
import {login as userLogin} from '../../store/authSlice';
import toast,{Toaster} from 'react-hot-toast'; 
import {useDispatch} from 'react-redux';

function Login() {
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const login = async(data)=>{
        try {
            const userData = await userService.login(data);
            console.log(userData);
            if(userData){
                toast.success(`Login successful ${userData.message}`);
                localStorage.setItem("token",userData.token)
                dispatch(userLogin(userData.user));
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message.data.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full pt-20'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 
        rounded-xl p-10 border border-black/10`}
        >
            <h2 className="text-center text-2xl font-bold leading-tight">
                Login to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                to='/register'
                className='font-medium text-blue-600
                transition-all duration-200 hover:underline'
                >
                    Register
                </Link>
            </p>
            <form onSubmit={handleSubmit(login)}
                className = 'mt-8'>
                    <div className="space-y-5">
                        <Input
                            label = "Email: "
                            placeholder = "Enter your email"
                            type = "email"
                            {...register("email",{
                                required:true,
                                validate:{
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}  
                        />
                        <Input
                            label = "Password: "
                            type = "password"
                            placeholder = "Enter your password"
                            {...register("password",{
                                required:true,
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >Sign in</Button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default Login
