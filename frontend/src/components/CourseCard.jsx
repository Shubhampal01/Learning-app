import React from "react";
import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const server = import.meta.env.VITE_SERVER_PORT;

const CourseCard = ({course}) => {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.userData);
  const [buttonText,setButtonText] = useState("Enroll Now");
  const [path,setPath] = useState("/about");
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuth){
      if(user && user.role!="admin"){
        if(user.subscription.includes(course._id)){
          setButtonText("Study now");
          setPath(`/course/study/${course._id}`);
        }
        else{
          setButtonText("Enroll Now");
          setPath(`/course/${course._id}`);
        }
      }
      else{
        setButtonText("Study now");
        setPath(`/course/study/${course._id}`);
      }
    }
  },[isAuth,user])
  const handleClick = ()=>{
    navigate(path);
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 duration-300">
      <div className="overflow-hidden">
        <img
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          src={`${server}/${course.image}`}
          alt={course.title}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold whitespace-nowrap overflow-hidden text-ellipsis text-xl mb-2">{course.title}</div>
        <p className="text-gray-700 text-base mb-2">Created by: {course.createdBy}</p>
        <p className="text-gray-700 text-base mb-2">Duration: {course.duration} hours</p>
        <p className="text-gray-900 font-bold text-lg">Price: ${course.price}</p>
        <button className=" bg-blue-500 text-white font-bold py-2 px-4 rounded
         hover:bg-blue-600 transition-colors duration-300"
         onClick={handleClick}>
          {buttonText}
        </button>
        {user && user.role=="admin" && <button className="ml-2 bg-red-500 text-white font-bold py-2 px-4 rounded
         hover:bg-red-600 transition-colors duration-300"
         onClick={()=>navigate(`/admin/courseedit/${course._id}`)}>
          Edit
        </button>}
      </div>
    </div>
  );
};

export default CourseCard;
