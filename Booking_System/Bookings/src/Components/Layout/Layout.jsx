import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import About from '../About/About'
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />

<main className="layout-main">
  <Outlet />


</main>

<Footer />

    </div>
  )
}

export default Layout
