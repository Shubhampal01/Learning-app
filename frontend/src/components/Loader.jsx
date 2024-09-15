import React from 'react'
function Loader() {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-gray-100">
      <div className="relative">
        <div className="h-32 w-32 rounded-full border-8 border-t-transparent border-b-transparent border-l-blue-500 border-r-red-500 animate-spin"></div>
        <div className="absolute inset-0 h-28 w-28 m-auto rounded-full border-4 border-dashed border-yellow-400"></div>
      </div>
    </div>
  )
}

export default Loader