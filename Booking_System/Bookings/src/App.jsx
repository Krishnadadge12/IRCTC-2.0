import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import RailTicketBookingForm from './pages/BookingForm'
function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<RailTicketBookingForm/>}/>
      </Routes>
    </div>
  )
}

export default App
