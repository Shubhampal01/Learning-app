import React from 'react'
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
function Account() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  return (
<div className="account-page bg-gray-100 min-h-screen py-10">
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
    {/* Header */}
    <div className="account-header flex flex-col sm:flex-row items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        </div>
      </div>
    </div>

    {/* Account Details */}
      <div className="personal-info">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={userData.name}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={userData.email}
              disabled
            />
          </div>
          <div className='flex flex-col gap-4 sm:flex-row'>
          <button 
            onClick={() => navigate(`/${userData._id}/dashboard`)} 
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Go to Dashboard
          </button>
          { userData && userData.role === 'admin' && (
            <button
              onClick={() => navigate(`/admin/dashboard`)}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Admin panel
            </button>
          )
          }
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Account