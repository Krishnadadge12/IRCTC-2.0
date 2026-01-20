import "./styles/dashboard.css";   // ⭐ IMPORTANT: LOAD CSS HERE
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TrainPage from "./pages/TrainPage";
import SchedulePage from "./pages/SchedulePage";
import CoachPage from "./pages/CoachPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trains" element={<TrainPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/coach" element={<CoachPage />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
