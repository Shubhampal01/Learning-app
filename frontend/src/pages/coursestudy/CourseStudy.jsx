import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import { fetchCourseById,deleteCourse } from '../../links/courseLinks';
import { getLectureList, getLecture } from '../../links/lectureLinks';
import { toast } from 'react-toastify';

const server = import.meta.env.VITE_SERVER_PORT;

function CourseStudy() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(true);
  const user = useSelector((state) => state.auth.userData);
  const course = useSelector((state) => state.courses.course);
  const lectures = useSelector((state) => state.lectures.lectures);
  const lecture = useSelector((state) => state.lectures.lecture);

  useEffect(() => {
    async function loadData() {
      try {
        if(!user){
          navigate('/login');
        }
        await fetchCourseById(dispatch, id);
        await getLectureList(dispatch, id);
      } catch (error) {
        toast.error('Error loading course data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [dispatch, id]);

  const handleLecture = async (lec) => {
    setLecLoading(true);
    await getLecture(dispatch, lec._id);
    setLecLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lecture-page grid md:grid-cols-12 gap-8 p-6">
          <div className="left md:col-span-8">
            {lecLoading ? (
              <>
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                className="rounded-lg w-full h-96 object-cover shadow-md"
              />
              <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
                    <h3 className="text-lg text-gray-600 mt-2">
                      {course.description}
                    </h3>
              </>
            ) : (
              <>
                {lecture?.video ? (
                  <>
                    <video
                      src={`${server}/${lecture.video}`}
                      className="w-full rounded-lg shadow-md"
                      controls
                      controlsList="nodownload noemoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                    ></video>
                    <h1 className="text-2xl font-bold mt-4">{lecture.title}</h1>
                    <h3 className="text-lg text-gray-600 mt-2">
                      {lecture.description}
                    </h3>
                  </>
                ) : (
                  <h1 className="text-xl text-gray-600">Video loading</h1>
                )}
              </>
            )}
          </div>

          <div className="right md:col-span-4 flex flex-col space-y-4">
            <div className="lectures-list flex flex-col space-y-4">
              {lectures && lectures.length > 0 ? (
                lectures.map((lec, index) => (
                  <div
                    className="lecture p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    key={index}
                    onClick={() => handleLecture(lec)}
                  >
                    <h1 className="font-semibold text-lg">
                      {index + 1}. {lec.title}
                    </h1>
                  </div>
                ))
              ) : (
                <h1 className="text-gray-600">No lectures yet</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseStudy;
