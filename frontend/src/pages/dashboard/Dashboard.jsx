import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyCourses } from '../../links/courseLinks';
import CourseCard from '../../components/CourseCard';

function Dashboard() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.myCourses);
  const user = useSelector(state => state.auth.userData);

  useEffect(() => {
    fetchMyCourses(dispatch);
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">All Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses && courses.length > 0 ? (
          courses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))
        ) : (
          <p className="text-gray-600">No courses found</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
