import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import RailTicketBookingForm from './pages/BookingForm/BookingForm'
import BookingConfirmation from './pages/BookingConfirmation/BookingConfirmation'
import { ToastContainer } from 'react-toastify'
function App() {
  

  return (
    <div>
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
      <Routes>
        <Route path='/' element={<RailTicketBookingForm/>}/>
        <Route path="/confirm" element={<BookingConfirmation />} />
      </Routes>
    </div>
  )
}

export default App
