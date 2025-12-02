import { Route,Routes,Navigate } from "react-router-dom"
import SearchTrain from "./pages/SearchTrain/SearchTrain"
import TrainDetails from "./pages/TrainDetails/TrainDetails"
import { ToastContainer } from "react-toastify";    

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" 
        element={<Navigate to="/search" />} />

        <Route
        path='/search'
        element={<SearchTrain/>}
        />

        <Route
        path="/train-details"
        element={<TrainDetails/>}/>
      </Routes>
       <ToastContainer position="top-right" />
    </div>
  )
}

export default App