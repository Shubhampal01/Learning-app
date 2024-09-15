import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import {Container, Logo} from "../index"
import { useSelector } from 'react-redux'
import {Button,LogoutBtn} from '../index'
function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const isActive = useSelector(state => state.auth.isLoggedIn);
    const navItems = [
        {
            name:"Home",
            link:"/",
            isActive:true

        },
        {
            name:"Courses",
            link:"/courses",
            isActive:true
        },
        {
            name:"About",
            link:"/about",
            isActive:true
        },
        {
            name:"Account",
            link:"/account",
            isActive:isActive
        },
    ]
  return (
    <header className='py-3 shadow bg-blue-100 '>
    <Container>
        <nav className="flex items-center justify-between">
            {/*Application Logo */}
            <div className="mr-4">
                <Link to='/'>
                    <Logo/>
                </Link>
            </div>

            {/* Navigation Menu */}
            <ul className='hidden md:flex space-x-4'>
                {
                    navItems.map((item) => (
                        item.isActive?<li key={item.name}>
                            <Link 
                                to={item.link} 
                                className='inline-block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-200'>
                                {item.name}
                            </Link>
                        </li>:null
                    ))
                }
            </ul>
            {!isActive?<Button className='px-10 hidden md:flex ' onClick={()=>navigate('/login')}>Login</Button>:null}
            {isActive?<LogoutBtn/>:null}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-2`}>
            <ul className="flex flex-col space-y-1">
                {
                    navItems.map((item) => (
                        item.isActive?<li key={item.name}>
                            <Link to={item.link} 
                                className='block px-4 py-2 text-center text-gray-600 bg-blue-200 hover:bg-blue-300 transition duration-200'>
                                {item.name}
                            </Link>
                        </li>:null
                    ))
                }
            </ul>
        </div>
    </Container>
</header>

  )
}

export default Header