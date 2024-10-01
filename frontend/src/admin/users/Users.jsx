import React,{ useState } from 'react'
import Layout from '../utils/Layout'
import {useNavigate} from 'react-router-dom'
import adminService from '../../service/adminService'
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function Users() {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);

  const fetchUsers = async()=>{
    try {
      setLoading(true)
      const data = await adminService.getUsers();
      setUsers(data.users)
    } catch (error) {
      toast.error(error.response.data.error)
    }finally{
      setLoading(false)
    }
  }
  const roleHandler = async(id)=>{
    try {
      const data = await adminService.updateRole(id);
      toast.success(data.message)
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating role');
    }
  }
  useEffect(()=>{
    fetchUsers();
  },[])
  return (
    <Layout>
    {loading ? (
      <h1 className="text-center text-2xl font-bold my-10">Loading...</h1>
    ) : (
      <div className="container mx-auto my-10">
        <h2 className="text-2xl font-bold mb-6 text-center">All Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-gray-300 block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                <th className="p-2 text-left font-medium text-gray-600 md:border md:border-gray-300 block md:table-cell">#</th>
                <th className="p-2 text-left font-medium text-gray-600 md:border md:border-gray-300 block md:table-cell">Name</th>
                <th className="p-2 text-left font-medium text-gray-600 md:border md:border-gray-300 block md:table-cell">Email</th>
                <th className="p-2 text-left font-medium text-gray-600 md:border md:border-gray-300 block md:table-cell">Role</th>
                <th className="p-2 text-left font-medium text-gray-600 md:border md:border-gray-300 block md:table-cell">Update Role</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {users &&
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border border-gray-300 block md:table-row hover:bg-gray-100"
                  >
                    <td className="p-2 md:border md:border-gray-300 block md:table-cell">{index + 1}</td>
                    <td className="p-2 md:border md:border-gray-300 block md:table-cell">{user.name}</td>
                    <td className="p-2 md:border md:border-gray-300 block md:table-cell">{user.email}</td>
                    <td className="p-2 md:border md:border-gray-300 block md:table-cell">{user.role}</td>
                    <td
                      className="p-2 text-blue-500 cursor-pointer hover:underline md:border md:border-gray-300 block md:table-cell"
                      onClick={() => roleHandler(user._id)}
                    >
                      Update
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </Layout>
  )
}

export default Users