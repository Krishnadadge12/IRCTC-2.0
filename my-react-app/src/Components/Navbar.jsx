import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Login navigation handled by Link component 

  return (
    <nav className="bg-white shadow-md">
  <div className=" py-2 flex justify-between items-center">

    <div className="flex items-center space-x-2">
      
    <Link className='flex items-center' to={'/home'}>
     <img 
        src="irctc.png"
        alt="IRCTC Logo" 
        className="w-20 h-15 object-contain"
      />
      <span className="text-xl font-bold text-blue-600">IRCTC2.0</span>
       </Link>
      
    </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          {/* <a href="/login" className="text-gray-600 hover:text-blue-600">login</a>
          <a href="/register" className="text-gray-600 hover:text-blue-600">register</a>
          <a href="/TrainSearch" className="text-gray-600 hover:text-blue-600">TrainSearch</a>
          <a href="/Bookings" className="text-gray-600 hover:text-blue-600">Bookings</a> */}
          <Link className='text-gray-600 hover:text-blue-600' to={"/register"}>
          Register </Link>
          <Link className='text-gray-600 hover:text-blue-600' to={"/trainsearch"}>Train Search</Link>
          <Link className='text-gray-600 hover:text-blue-600' to={"/bookings"}>Bookings</Link>
          <Link className='text-gray-600 hover:text-blue-600' to={"/bookings"}>Admin</Link>
          <Link className='text-gray-600 hover:text-blue-600' to={"/AboutUs"}>About</Link>
        </div>

        

        {/* Contact, Login & Hamburger */}
        <div className="hidden md:flex space-x-4 items-center">
          <button className="text-gray-600 hover:text-blue-600">Contact Us</button>
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Login</Link>

          {/* small three-line hamburger, placed right of Login */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            className="p-2 ml-2"
          >
            <span className="block w-5 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-4 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </button>
        </div>

        {/* Sidebar overlay (right) */}
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />

            <aside className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 overflow-auto">
              <div className="p-3 border-b flex items-center justify-between">
                {/* <div className="text-lg font-semibold">→</div> */}
                <button
                  aria-label="Close menu"
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-600 px-2 py-1"
                >
                  ✕
                </button>
              </div>

              <nav className="p-4">
                <ul className="space-y-2 text-gray-700">
                  <li className="py-1 px-2 hover:bg-gray-50"><button className="w-full text-left">Login</button></li>
                  <li className="py-1 px-2 hover:bg-gray-50"><button className="w-full text-left">Register</button></li>
                  <li className="py-1 px-2 hover:bg-gray-50"><button className="w-full text-left">Search Train</button></li>
                  <li className="py-1 px-2 hover:bg-gray-50"><button className="w-full text-left">Book Train</button></li>
                  <li className="py-1 px-2 hover:bg-gray-50"><button className="w-full text-left">Cancel Train</button></li>
                  <li className="py-1 px-2 hover:bg-gray-50"><button className="w-full text-left">Book Your Coach/Train</button></li>
                  <li className="py-1 px-2 hover:bg-gray-50"><button className="w-full text-left">Contact Us</button></li>
                </ul>

                <div className="mt-6 pt-4 border-t text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-gray-600" />
                    <span>support@irctc2.com</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="text-gray-600" />
                    <span>8956049195</span>
                  </div>
                </div>
              </nav>
            </aside>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
