import React from 'react'
import {useParams, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

function PaymentSuccess() {
    const { id } = useParams();
  const user = useSelector(state=>state.auth.userData);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
      <div className="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m0 0L5 12m7-7a9 9 0 110 18 9 9 0 010-18z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Thank you for your purchase. Your payment ID is: <strong>{id}</strong>.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        You can now access your course.
      </p>
      <Link to={`/${user._id}/dashboard`}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Go to Home
      </Link>
    </div>
  </div>
  )
}

export default PaymentSuccess
