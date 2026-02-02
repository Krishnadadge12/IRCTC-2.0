import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Layout.css'

// Layout component wraps all pages with common UI (Navbar & Footer)
const Layout = () => {
  return (
    <div className="layout-container">
      {/* Top navigation bar */}
      <Navbar />

 {/* Main page content */}
<main className="layout-main">
  <Outlet />


</main>

{/* Footer section same for all pages */}
<Footer />

    </div>
  )
}

export default Layout
