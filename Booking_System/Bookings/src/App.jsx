import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'

import Layout from './Components/Layout'
import Home from './pages/home/Home'
import Login from './pages/login/login'
import Register from './pages/register/register'

import SearchTrain from './pages/SearchTrain/SearchTrain'
import TrainDetails from './pages/TrainDetails/TrainDetails'

import RailTicketBookingForm from './pages/BookingForm/BookingForm'
import BookingConfirmation from './pages/BookingConfirmation/BookingConfirmation'

function App() {
  return (
    <AuthProvider>
      <div>
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/search" element={<SearchTrain />} />
            <Route path="/train-details" element={<TrainDetails />} />

            <Route path="/booking" element={<RailTicketBookingForm />} />
            <Route path="/confirm" element={<BookingConfirmation />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
