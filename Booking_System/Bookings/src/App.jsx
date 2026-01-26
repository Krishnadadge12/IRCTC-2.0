import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

import Layout from './Components/Layout/Layout'
import Home from './pages/home/Home'
import Login from './pages/login/login'
import Register from './pages/register/register'

import SearchTrain from './pages/SearchTrain/SearchTrain'
import TrainDetails from './pages/TrainDetails/TrainDetails'

import RailTicketBookingForm from './pages/BookingForm/BookingForm'
import BookingConfirmation from './pages/BookingConfirmation/BookingConfirmation'

import PaymentPage from './pages/Payment/PaymentPage'
import AboutUs from './pages/AboutUs/AboutUs'
import TermsAndConditions from './pages/TermsAndConditions/TermsConditions';

function App() {
  return (
    <AuthProvider>
      <div>
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />

        <Routes>
          {/* Root redirect to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* All routes nested under /home with Layout */}
          <Route path="/home" element={<Layout />}>
            {/* Home page */}
            <Route index element={<Home />} />
            
            {/* Public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="terms" element={<TermsAndConditions />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="search" element={<SearchTrain />} />

            {/* Protected routes - nested route group */}
            <Route element={<ProtectedRoute />}>
              <Route path="train-details" element={<TrainDetails />} />
              <Route path="booking" element={<RailTicketBookingForm />} />
              <Route path="confirm" element={<BookingConfirmation />} />
              <Route path="payment" element={<PaymentPage />} />
            </Route>
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
