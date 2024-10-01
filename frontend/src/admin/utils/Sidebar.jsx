import React from 'react';
import { useNavigate } from "react-router-dom"; // Fix: Import properly from react-router-dom

function Sidebar() {
    const navigate = useNavigate();
  
    return (
      <div className="flex flex-col h-full bg-gray-600 text-white w-64 min-h-screen px-4 py-6">
        <ul className="space-y-4">
          <li>
            <p 
              className="text-lg font-semibold cursor-pointer hover:bg-gray-700 p-3 rounded-md transition-all" 
              onClick={() => navigate('/admin/dashboard')}
            >
              DashBoard
            </p>
          </li>

          <li>
            <p 
              className="text-lg font-semibold cursor-pointer hover:bg-gray-700 p-3 rounded-md transition-all" 
              onClick={() => navigate('/admin/course')}
            >
              Courses
            </p>
          </li>
          <li>
            <p 
              className="text-lg font-semibold cursor-pointer hover:bg-gray-700 p-3 rounded-md transition-all" 
              onClick={() => navigate('/admin/users')}
            >
              Users
            </p>
          </li>
        </ul>
      </div>
    );
}

export default Sidebar;
