import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import About from './About'
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />

      <main className="layout-main">
        <Outlet />
      </main>

      {/* About section rendered on every page, like a persistent block */}
      <About />

      <Footer />
    </div>
  )
}

export default Layout
