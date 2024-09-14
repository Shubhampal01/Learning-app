import React, {useState} from 'react'
import {Link, useNavigate} from'react-router-dom'
import {Input, Button } from '../../components';
import {useForm} from 'react-hook-form'

function Register() {
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const [error,setError] = useState("");
    const signUp = async(data)=>{
        setError("");
        try {
            
        } catch (error) {
            setError(error.message)
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
            {error && <p className='text-red-600 mt-8 text-center'>
                {error}</p>}
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
                        >Sign in</Button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default Register
