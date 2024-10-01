import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import { fetchCourseById,deleteCourse } from '../../links/courseLinks';
import { getLectureList, getLecture,deleteLecture ,addLecture} from '../../links/lectureLinks';
import { toast } from 'react-toastify';

const server = import.meta.env.VITE_SERVER_PORT;

function CourseEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(true);
  const user = useSelector((state) => state.auth.userData);
  const course = useSelector((state) => state.courses.course);
  const lectures = useSelector((state) => state.lectures.lectures);
  const lecture = useSelector((state) => state.lectures.lecture);

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [video,setVideo] = useState("")
  const [videoPreview,setVideoPreview] = useState("")
  const [btnLoading,setBtnLoading] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        if(!user || user.role!=='admin'){
          navigate('/');
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

  const addLectureHandler = async (e)=>{
    e.preventDefault();
    setBtnLoading(true);
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", video);
      const data = await addLecture(dispatch,formData,id);
      toast.success(data.message);
      setShow(false);
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPreview("");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }
  const changeVideoHandler = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setVideoPreview(reader.result);
      setVideo(file);
    }   
  }
  const deleteLectureHandler = async (id)=>{
    try {
    const data = await deleteLecture(dispatch,id);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const deleteCourseHandler = async (id)=>{
    if(confirm("Do you want you to delete this course")){
      try {
        const data = await deleteCourse(dispatch,id);
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }
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
              <button
                className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                onClick={() => setShow(!show)}
              >
                Add Lecture
              </button>

            {show && (
              <div className="lecture-form bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Add Lecture</h1>
                <form onSubmit={addLectureHandler} className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="title" className="block font-medium">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="border border-gray-300 p-2 rounded-md w-full"
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="desc" className="block font-medium">
                      Description
                    </label>
                    <textarea
                      id="desc"
                      className="border border-gray-300 p-2 rounded-md w-full"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <input
                      type="file"
                      className="border border-gray-300 p-2 rounded-md w-full"
                      onChange={changeVideoHandler}
                      required
                    />
                  </div>
                  {
                    videoPreview && (
                      <video
                        src={videoPreview}
                        className="w-full rounded-lg shadow-md"
                        controls
                        controlsList="nodownload noemoteplayback"
                      ></video>
                    )
                  }
                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="btn btn-primary bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                  >
                    {btnLoading ? "Pleas wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}

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
                      <button className="btn btn-danger bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md"
                      disabled={btnLoading}
                      onClick={()=>deleteLectureHandler(lec._id)}>
                        Delete
                      </button>
                  </div>
                ))
              ) : (
                <h1 className="text-gray-600">No lectures yet</h1>
              )}
            </div>
            <button className="btn btn-danger bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            onClick={()=>deleteCourseHandler(course._id)}>
            Delete This Course
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseEdit;
