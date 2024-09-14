import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-6">
    {/* About Section */}
    {/* <div className="footer-about">
      <h3 className="text-lg font-semibold mb-4">About Us</h3>
      <p className="text-gray-400 text-sm">
        We are a leading e-learning platform, committed to helping learners grow and excel by providing high-quality courses.
      </p>
    </div> */}


    {/* Contact Section */}
    <div className="footer-contact">
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li>
          <span>Address: 123 E-learning St, Knowledge City</span>
        </li>
        <li>
          <span>Email: support@elearning.com</span>
        </li>
        <li>
          <span>Phone: +1 (800) 123-4567</span>
        </li>
      </ul>

      {/* Social Media Icons */}
      <div className="mt-4 flex space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
    <p>&copy; 2024 E-learning Platform. All rights reserved.</p>
  </div>
</footer>

  )
}

export default Footer
