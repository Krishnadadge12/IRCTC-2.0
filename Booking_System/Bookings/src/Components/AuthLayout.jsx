import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Layout component for authentication pages (login, register)
 * Does not include Navbar and Footer
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default AuthLayout

