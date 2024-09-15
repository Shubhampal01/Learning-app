import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { logout } from '../store/authSlice'
import { toast,Bounce } from 'react-toastify'
function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/')
    toast.success(' Logout Successful!', {
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
  return (
    <button
    className='inline-block px-6 py-2 text-white rounded-full bg-blue-500
      hover:bg-blue-400 transition duration-200'
    onClick={logoutHandler}
  >
    Logout
  </button>
  )
}

export default LogoutBtn