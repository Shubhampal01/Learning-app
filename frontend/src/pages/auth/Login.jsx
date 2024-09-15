import React,{useState} from 'react'
import {Link, useNavigate} from'react-router-dom'
import {Input, Button } from '../../components';
import {useForm} from 'react-hook-form'
import userService from '../../service/userService';
import {login as userLogin} from '../../store/authSlice';
import {toast,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';

function Login() {
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const login = async(data)=>{
        try {
            setLoading(true);
            const userData = await userService.login(data);
            if(userData){
                dispatch(userLogin(userData.user));
                localStorage.setItem("token",userData.token);
                toast.success(' Login Successful!', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                navigate('/');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(' Invalid credentials!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full pt-20'
    >
        {/* login form */}
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
                            disabled={loading}
                        >{loading?"Please wait..":"Sign in"}</Button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default Login
