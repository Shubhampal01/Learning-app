import React from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import { Home,Login,Register,Verify,About ,Account} from './pages'
import { Header,Footer } from './components'
function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/verify' element={<Verify/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
