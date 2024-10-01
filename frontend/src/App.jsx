import React,{useEffect} from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import { Home,Login,Register,Verify,About ,Account, CourseDesc, PaymentSuccess, Dashboard, CourseStudy, CourseEdit, AdminDashBoard} from './pages'
import { Header,Footer, Loader } from './components'
import {login ,logout} from './store/authSlice'
import {useDispatch } from 'react-redux';
import userService from './service/userService';
import AuthLayout from './components/AuthLayout';
import { useState } from 'react';
import {ToastContainer} from "react-toastify"
import Courses from './pages/courses/Courses'

function App() {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  // fetch user data
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
          <Route path='/courses' element={<Courses/>} />
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
          <Route path='/course/:id' element={<AuthLayout>
          <CourseDesc/>
          </AuthLayout>} />
          {/* <Route path='/payment-success/:id' element={<AuthLayout>
          <PaymentSuccess/>
          </AuthLayout>} /> */}
          <Route path='/:id/dashboard' element={<AuthLayout>
          <Dashboard/>
          </AuthLayout>} />
          <Route path='/course/study/:id' element={<AuthLayout>
          <CourseStudy/>
          </AuthLayout>} />
          <Route path='/admin/courseedit/:id' element={<AuthLayout>
          <CourseEdit/>
          </AuthLayout>} />
          <Route path='/admin/dashboard' element={<AuthLayout>
          <AdminDashBoard/>
          </AuthLayout>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
      ): <Loader/>
}

export default App
