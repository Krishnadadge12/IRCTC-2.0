import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'

import PublicLayout from "./layout/PublicLayout";
import PrivateLayout from "./layout/PrivateLayout";

import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

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
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* ---------- PUBLIC ROUTES (NO SIDEBAR) ---------- */}
        <Route element={<PublicLayout />}>
          <Route path="/home/login" element={<Login />} />
          <Route path="/home/register" element={<Register />} />
          <Route path="/home/terms" element={<TermsAndConditions />} />
          <Route path="/home/aboutus" element={<AboutUs />} />
        </Route>

        {/* ---------- PRIVATE ROUTES (WITH SIDEBAR) ---------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/search" element={<SearchTrain />} />
            <Route path="/home/train-details" element={<TrainDetails />} />
            <Route path="/home/booking" element={<RailTicketBookingForm />} />
            <Route path="/home/confirm" element={<BookingConfirmation />} />
            <Route path="/home/payment" element={<PaymentPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
