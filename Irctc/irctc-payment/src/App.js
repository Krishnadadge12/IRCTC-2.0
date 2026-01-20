import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingPage from "./BookingPage";
import PaymentPage from "./PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
