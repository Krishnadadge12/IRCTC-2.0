import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

/**
 * Layout component for authentication pages (login, register)
 * Does not include Navbar and Footer
 */
const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  )
}

export default AuthLayout

