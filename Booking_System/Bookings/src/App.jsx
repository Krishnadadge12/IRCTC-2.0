import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'

import PublicLayout from "./layout/PublicLayout"
import PrivateLayout from "./layout/PrivateLayout"
import AdminLayout from "./layout/AdminLayout"

import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import AdminProtectedRoute from './Components/AdminProtectedRoute/AdminProtectedRoute'

import Home from './pages/home/Home'
import Login from './pages/login/login'
import Register from './pages/register/register'
import SearchTrain from './pages/SearchTrain/SearchTrain'
import TrainDetails from './pages/TrainDetails/TrainDetails'
import RailTicketBookingForm from './pages/BookingForm/BookingForm'
import BookingConfirmation from './pages/BookingConfirmation/BookingConfirmation'
import PaymentPage from './pages/Payment/PaymentPage'
import AboutUs from './pages/AboutUs/AboutUs'
import TermsAndConditions from './pages/TermsAndConditions/TermsConditions'
import TCHome from './pages/TC/TCHome'
import PNRStatus from './pages/PNRStatus/PNRStatus'
import MyBookings from './pages/MyBookings/MyBookings'
import Ticket from './pages/Ticket/Ticket'
import TCProtectedRoute from './Components/TCProtectedRoute/TCProtectedRoute'
import AdminHome from "./pages/Admin/AdminHome"
import Dashboard from "./pages/Admin/Bookings"
import TrainPage from "./pages/Admin/TrainPage"
import SchedulePage from "./pages/Admin/SchedulePage"
import UserPage from "./pages/Admin/UserPage"

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <Routes>
        {/* ---------- ROOT ---------- */}
        <Route index element={<Navigate to="/home" replace />} />

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/search" element={<SearchTrain />} />
          <Route path="/home/trains/search" element={<TrainDetails />} />
          <Route path="/home/login" element={<Login />} />
          <Route path="/home/register" element={<Register />} />
          <Route path="/home/terms" element={<TermsAndConditions />} />
          <Route path="/home/aboutus" element={<AboutUs />} />
          <Route path="/home/pnr-status" element={<PNRStatus />} />
        </Route>

        {/* ---------- USER PROTECTED ROUTES ---------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/home/booking" element={<RailTicketBookingForm />} />
            <Route path="/home/confirm" element={<BookingConfirmation />} />
            <Route path="/home/payment" element={<PaymentPage />} />
            <Route path="/home/ticket" element={<Ticket />} />
            <Route path="/home/my-bookings" element={<MyBookings />} />
          </Route>
        </Route>

        {/* ---------- ADMIN PROTECTED ROUTES ---------- */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="bookings" element={<Dashboard />} />
            <Route path="trains" element={<TrainPage />} />
            <Route path="queries" element={<SchedulePage />} />
            <Route path="users" element={<UserPage />} />
          </Route>
        </Route>

        {/* ---------- TC ---------- */}
        <Route element={<TCProtectedRoute />}>
          <Route path="/tc" element={<TCHome />} />
        </Route>

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/home/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
