import { useState } from 'react';
import React from 'react'
import {Link, useNavigate} from'react-router-dom'
import {Input, Button } from '../../components';
import {useForm} from 'react-hook-form'
import {toast,Bounce} from 'react-toastify';
import userService from '../../service/userService';

function Verify() {
  const {register,handleSubmit} = useForm();
  const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
  const verifyOTP = async(data) =>{
    try{
        setLoading(true);
        const response = await userService.verifyOTP(data);
        if(response){
            toast.success("Account created successfully", {
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
            navigate('/login');
            localStorage.clear("activationCode");
        }
        setLoading(false);
    }catch(error){
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
                Verify account
            </h2>
            <form onSubmit={handleSubmit(verifyOTP)}
                className = 'mt-8'>
                    <div className="space-y-5">
                        <Input
                            label = "OTP : "
                            type = "password"
                            placeholder = "Enter OTP"
                            {...register("otp",{
                                required:true,
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={loading}
                        >{loading?"Please wait..":"Verify"}</Button>
                    </div>
            </form>
            <p className="mt-2 text-center text-base text-black/60">
                <Link
                to='/login'
                className='font-medium text-blue-600
                transition-all duration-200 hover:underline'
                >
                    Go to Login page
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Verify
