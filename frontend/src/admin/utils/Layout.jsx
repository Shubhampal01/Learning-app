import React from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="admin-dashboard flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="child-content flex-1 p-4">
        {children}
      </div>
    </div>
  );
}
export default Layout;
