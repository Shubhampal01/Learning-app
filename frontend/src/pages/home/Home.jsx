import React from 'react'
import {useNavigate} from "react-router-dom"
import { Testimonial } from '../../components'

function Home() {
  const navigate = useNavigate()
  return (
    <div>
  <div id="hero" className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-blue-600 to-violet-400 p-4 text-center">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
      Welcome to our E-learning platform
    </h1>
    <p className="text-xl md:text-2xl text-white mb-6">Learn, Grow, Excel</p>
    <button
      onClick={() => navigate("/courses")}
      className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
    >
      Get Started
    </button>
  </div>
  <Testimonial/>
  </div>
  )
}

export default Home