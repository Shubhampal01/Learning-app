import React, { useState, useEffect } from 'react';
import Sidebar from '../utils/Sidebar';
import adminService from '../../service/adminService';

function AdminDashBoard() {
    const [stats, setStats] = useState({ totalCourses: 0, totalLectures: 0, totalUsers: 0 });

    const getStats = async () => {
        try {
            const res = await adminService.getStats();
            setStats(res.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        getStats();
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Courses */}
                    <div className="box bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Total Courses</p>
                        <p className="text-3xl font-bold">{stats.totalCourses}</p>
                    </div>

                    {/* Total Lectures */}
                    <div className="box bg-green-500 text-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Total Lectures</p>
                        <p className="text-3xl font-bold">{stats.totalLectures}</p>
                    </div>

                    {/* Total Users */}
                    <div className="box bg-purple-500 text-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Total Users</p>
                        <p className="text-3xl font-bold">{stats.totalUsers}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashBoard;
