import React, {useState} from 'react'
import {Link, useNavigate} from'react-router-dom'
import {Input, Button } from '../../components';
import {useForm} from 'react-hook-form'
import userService from '../../service/userService';
import { toast,Bounce } from 'react-toastify';

function Register() {
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const [loading,setLoading] = useState(false);
    const signUp = async(data)=>{
        try {
            setLoading(true);
            const response = await userService.register(data);
            if(response){
                toast.success(`${response.message}`, {
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
                localStorage.setItem("activationCode",response.activationCode);
                navigate("/verify");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error( error.response.data.message, {
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
        <div className={`mx-auto w-full max-w-lg bg-gray-100 
        rounded-xl p-10 border border-black/10`}
        >
            <h2 className="text-center text-2xl font-bold leading-tight">
                Register to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                to='/login'
                className='font-medium text-blue-600
                transition-all duration-200 hover:underline'
                >
                    Login
                </Link>
            </p>
            <form onSubmit={handleSubmit(signUp)}
                className = 'mt-8'>
                    <div className="space-y-5">
                      <Input
                      label="Name"
                      placeholder="Enter your name"
                      type="string"
                      {
                        ...register("name",{
                            required:true,
                        })
                      }/>
                      
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
                        >{loading?"Please wait..":"Sign up"}</Button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default Register
