import React,{useState,useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import userService from '../../service/userService';
import {login,logout} from '../../store/authSlice';
import {fetchCourse ,fetchCourseById} from '../../links/courseLinks';
import {useSelector,useDispatch} from 'react-redux';
import paymentService from '../../service/paymentService';
import courseService from '../../service/courseService';
import {toast} from 'react-toastify';
const server = import.meta.env.VITE_SERVER_PORT;
function CourseDesc() {
    const {id} = useParams();
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const course = useSelector(state=>state.courses.course);
    const user = useSelector(state=>state.auth.userData);

    // const checkoutHandler =async ()=>{
    //     const {order} =await paymentService.createPayment(id);
    //     console.log(order);
    //     const options = {
    //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    //         amount: order.amount,
    //         currency: "INR",
    //         name: "Learning App",
    //         description: "Course Purchase",
    //         order_id: order.id,
    //         handler: async (response) => {
    //           const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = response;
    //           try {
    //             const data = await paymentService.verifyPayment(id,razorpay_payment_id, razorpay_order_id, razorpay_signature);
    //             // fetching courses and user data
    //             toast.success(data.message);
    //             await fetchCourse(dispatch);
    //             userService.fetchUser()
    //             .then((userData)=>{
    //               if(userData){
    //                 dispatch(login(userData.user))
    //               }else{
    //                 dispatch(logout())
    //               }
    //             })
    //             navigate(`/payment-success/${razorpay_payment_id}`)
    //           } catch (error) {
    //             toast.error(error.response.data.message);
    //           }
    //         },
    //         theme: {
    //           color: "#3399cc",
    //         },
    //       };
    //       const rzp = new window.Razorpay(options);
    //       rzp.open();
    // }
    const enrollHandler =async ()=>{
      try {
        const data = await courseService.enrollCourse(id);
        toast.success(data.message);
        await fetchCourse(dispatch);
        userService.fetchUser()
        .then((userData)=>{
          if(userData){
            dispatch(login(userData.user))
          }else{
            dispatch(logout())
          }
        })
      } catch (error) {
        toast.error(error.response.data.message);
      }
        
    } 

    useEffect(()=>{
        fetchCourseById(dispatch,id);
    },[dispatch,id])
    if (!course) {
        return <div>Loading...</div>;
      }
  return (
    <div className="max-w-screen mx-auto p-4 bg-white shadow-md rounded-lg md:p-10">
    <div className="flex flex-col mb-5 md:flex-row md:space-x-10">
      {/* Image Section */}
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <img 
          src={`${server}/${course.image}`} 
          alt={course.title} 
          className="w-full h-56 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="mb-4">
          <p className="font-semibold text-lg">Created by: <span className="font-normal">{course.createdBy}</span></p>
          <p className="font-semibold text-lg">Duration: <span className="font-normal">{course.duration} hours</span></p>
          <p className="font-semibold text-lg">Price: <span className="font-normal">${course.price}</span></p>
          <p className="font-semibold text-lg">Category: <span className="font-normal">{course.category}</span></p>
        </div>
        {
            user && user.subscription?.includes(course._id) || user.role=="admin" ?
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={()=>navigate(`/course/study/${course._id}`)}>
          Study now
        </button>
            :
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={enrollHandler}>
          Enroll now
        </button>
        }
        
      </div>
    </div>
    {/* Description Section */}
    <h2 className="text-2xl font-bold mb-2">About this course</h2>
    <p className="text-gray-700 text-base mb-4">{course.description}</p>
  </div>
  )
}

export default CourseDesc