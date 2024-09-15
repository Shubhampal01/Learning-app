import React,{useEffect} from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import { Home,Login,Register,Verify,About ,Account} from './pages'
import { Header,Footer, Loader } from './components'
import {login ,logout} from './store/authSlice'
import {useDispatch } from 'react-redux';
import userService from './service/userService';
import AuthLayout from './components/AuthLayout';
import { useState } from 'react';
import {ToastContainer} from "react-toastify"

function App() {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    userService.fetchUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData.user))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{setLoading(false)})
  }, [])
  return !loading?(
    <>
    <BrowserRouter>
      <ToastContainer/>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/account' element={<AuthLayout>
            <Account/>
            </AuthLayout>} />
          <Route path='/login' element={<AuthLayout authentication={false}>
            <Login/>
            </AuthLayout>} />
          <Route path='/register' element={<AuthLayout authentication={false}>
            <Register/>
            </AuthLayout>} />
          <Route path='/verify' element={<AuthLayout authentication={false}>
            <Verify/>
            </AuthLayout>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
      ): <Loader/>
}

export default App
