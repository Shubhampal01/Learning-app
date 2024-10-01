import React from 'react'
import { useState,useEffect } from 'react'
import { fetchCourse } from '../../links/courseLinks';
import {useSelector,useDispatch} from 'react-redux'
import { CourseCard } from '../../components';
function Courses() {
    const dispatch = useDispatch()
    const courses = useSelector(state=>state.courses.allCourses)
    useEffect(() => {
      fetchCourse(dispatch)
    }, [dispatch])
    return (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Courses</h2>
          {courses && courses.length>0 ? 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
             />
            ))}
          </div>
          : <p>No courses available</p>}
        </div>
      );
}

export default Courses