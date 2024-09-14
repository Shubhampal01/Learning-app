import { useState } from 'react';
import React from 'react'
import {Link, useNavigate} from'react-router-dom'
import {Input, Button } from '../../components';
import {useForm} from 'react-hook-form'

function Verify() {
  const {register,handleSubmit} = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const verifyOTP = async(data) =>{
    try{
        
    }catch(error){
        setError('Something went wrong');
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
            {error && <p className='text-red-600 mt-8 text-center'>
                {error}</p>}
            <form onSubmit={handleSubmit(verifyOTP)}
                className = 'mt-8'>
                    <div className="space-y-5">
                        <Input
                            label = "OTP : "
                            type = "password"
                            placeholder = "Enter OTP"
                            {...register("password",{
                                required:true,
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >Verify</Button>
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
