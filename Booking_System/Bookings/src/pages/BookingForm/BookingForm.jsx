import React, { useState } from "react";
import "./BookingForm.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function RailTicketBookingForm() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [reservationQuota, setReservationQuota] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [journeyFrom, setJourneyFrom] = useState("");
  const [journeyTo, setJourneyTo] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const[departureTime,setDepartureTime]=useState(null);
  const [agreed, setAgreed] = useState(false);
 
  const navigate = useNavigate();
  const location = useLocation();


  const [passengers, setPassengers] = useState([
    { fullName: "", age: "", sex: "", berth: "", phone: "", email: "" }
  ]);
React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  //changes in form to be set
  React.useEffect(() => {
    let data = location.state;
    
    // Check sessionStorage if location.state is not available (data from TrainDetails)
    if (!data) {
      const storedData = sessionStorage.getItem('bookingData');
      if (storedData) {
  data = JSON.parse(storedData);
  console.log("Retrieved from sessionStorage:", data);
}
    }
    
    if (data) {
      console.log("Prefilling form with:", data); // DEBUG
      setReservationQuota(data.reservationQuota || "");
      setTrainNumber(
  data.trainNumber !== undefined && data.trainNumber !== null
    ? String(data.trainNumber)
    : ""
);
      setJourneyFrom(data.journeyFrom || "");
      setJourneyTo(data.journeyTo || "");

      if (data.date) {
        const [d, m, y] = data.date.split("-");
        setDay(d);
        setMonth(m);
        setYear(y);
      }

      setPassengers(data.passengers || []);
      setDepartureTime(data.departureTime || "");
    } else {
      console.log("No prefill data found - location.state:", location.state); // DEBUG
    }
  }, []);

  //add passenger details
  const addPassenger = () => {
    setPassengers((prev) => [
      ...prev,
      { fullName: "", age: "", sex: "", berth: "", phone: "", email: "" }
    ]);
  };

  //remove passenger details
  const removePassenger = () => {
    if (passengers.length > 1) {
      setPassengers(passengers.slice(0, -1)); //removes last passenger from the array
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSave = (e) => {
    e.preventDefault(); //to avoid browser's default behaviour of form submission

    // ===================== DATE VALIDATIONS ===================== //
    if (!day || !month || !year) {
      return toast.error("Please enter a complete departure date!");
    }

    if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
      return toast.error("Date format must be DD-MM-YYYY!");
    }

    const dd = parseInt(day, 10); //09->9
    const mm = parseInt(month, 10);
    const yy = parseInt(year, 10);

    if (mm < 1 || mm > 12)
      return toast.error("Month must be between 01 and 12!");

    if (dd < 1 || dd > 31)
      return toast.error("Day must be between 01 and 31!");

    if (yy < new Date().getFullYear())
      return toast.error("Year cannot be in the past!");

    // How many days the given month has
    const daysInMonth = new Date(yy, mm, 0).getDate();
    if (dd > daysInMonth)
      return toast.error(`Invalid date: ${day}-${month}-${year}`);

    // Check if date is in the past
    const inputDate = new Date(`${yy}-${mm}-${dd}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today)
      return toast.error("Departure date cannot be in the past!");
    // ============================================================ //


    // ===================== FORM FIELD VALIDATIONS ================ //

    if (!reservationQuota)
      return toast.error("Please select reservation quota!");

    if (!String(trainNumber).trim())
      return toast.error("Please enter train name/number!");

    if (!journeyFrom?.trim())
      return toast.error("Please enter the starting station!");

    if (!journeyTo?.trim())
      return toast.error("Please enter the destination station!");

    // ===================== PASSENGER VALIDATIONS ================= //

    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];

      if (!p.fullName?.trim())
        return toast.error(`Passenger ${i + 1}: Name is required`);

      if (!p.age?.trim())
        return toast.error(`Passenger ${i + 1}: Age is required`);

      if (!p.sex)
        return toast.error(`Passenger ${i + 1}: Select sex`);

      if (!p.berth)
        return toast.error(`Passenger ${i + 1}: Select berth`);

      if (!p.phone?.trim())
        return toast.error(`Passenger ${i + 1}: Phone number is required`);

      if (!p.email?.trim())
        return toast.error(`Passenger ${i + 1}: Email is required`);
    }

    // ============================================================ //

    // If all validations passed then Prepare booking data
    const bookingData = {
      reservationQuota,
      trainNumber,
      journeyFrom,
      journeyTo,
      date: `${day}-${month}-${year}`,
      departureTime,  // only passed internally
      passengers,
    };

    // Require agreement to terms
    if (!agreed) {
      return toast.error("Please accept terms & conditions before proceeding!");
    }

   else {
  const existingDraft = JSON.parse(
    sessionStorage.getItem("bookingDraft")
  );

  if (!existingDraft) {
    toast.error("Train data missing. Please start booking again.");
    return;
  }

  const updatedDraft = {
    ...existingDraft,

    // 🔑 ENUM (BACKEND EXPECTS THIS)
    reservationQuota: reservationQuota.toUpperCase(), // GENERAL / TATKAL

    journeyDate: `${year}-${month}-${day}`,

    passengers: passengers.map(p => ({
      name: p.fullName,
      age: Number(p.age),
      gender: p.sex
    }))
  };

  sessionStorage.setItem(
    "bookingDraft",
    JSON.stringify(updatedDraft)
  );

  navigate("/home/confirm", {
    state: {
      reservationQuota,
      trainNumber,
      journeyFrom,
      journeyTo,
      date: `${day}-${month}-${year}`,
      departureTime,
      passengers
    }
  });
}


  };

  

  return (
    <div className="booking-bg">
      <div className="bg-overlay"/>
      <div className="container booking-container">

        {/* Title */}
        <h1 className="booking-title">TICKET BOOKING FORM</h1>
        <p className="booking-subtitle">Book your journey — fast, safe & reliable</p>

      <form onSubmit={handleSave}>

        {/* QUOTA + TRAIN */}
        <div className="row r1">
          <div className="form-group quota-field">
            <label className="form-label tag">Reservation Quota</label>
            <select className="form-select"
              value={reservationQuota}
              onChange={(e) => setReservationQuota(e.target.value)}>
              <option value="">Select Reservation Quota</option>
              <option value="General">General</option>
              <option value="Tatkal">Tatkal</option>
              
            </select>
          </div>

          <div className="form-group quota-field">
            <label className="form-label tag">Train Name or Number</label>
            <input type="text"
              className="form-control"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              placeholder="Train Name/Number" />
          </div>
        </div>

        {/* FROM + TO */}
        <div className="row r1">
          <div className="form-group quota-field">
            <label className="form-label tag">Journey From</label>
            <input type="text"
              className="form-control"
              value={journeyFrom}
              onChange={(e) => setJourneyFrom(e.target.value)}
              placeholder="Station code/name" />
          </div>

          <div className="form-group quota-field">
            <label className="form-label tag">Journey To</label>
            <input type="text"
              className="form-control"
              value={journeyTo}
              onChange={(e) => setJourneyTo(e.target.value)}
              placeholder="Station code/name" />
          </div>
        </div>

        {/* DATE */}
        <div className="row r2 date-row">
          <div className="form-group date-group">
            <label className="form-label tag">Departure Date</label>

            <div className="date-input">
              <div className="date-box">
                <input
                  type="text"
                  maxLength="2"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                />
                <label>Day</label>
              </div>

              <div className="date-box">
                <input
                  type="text"
                  maxLength="2"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
                <label>Month</label>
              </div>

              <div className="date-box">
                <input
                  type="text"
                  maxLength="4"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <label>Year</label>
              </div>

              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);

                  // Auto-fill DD MM YYYY states
                  setDay(String(date.getDate()).padStart(2, "0"));
                  setMonth(String(date.getMonth() + 1).padStart(2, "0"));
                  setYear(String(date.getFullYear()));
                }}
                customInput={
                  <button type="button" className="calendar-btn">🗓️</button>
                }
                dateFormat="dd-MM-yyyy"
                minDate={new Date()}        // prevents past dates
                popperPlacement="bottom-start"
                showPopperArrow={false}
              />

            </div>
          </div>
        </div>

        <div className="hr"><hr /></div>

        {/* PASSENGERS */}
        {passengers.map((p, idx) => (
          <div className="passenger-card" key={idx}>
            <h4 className="passenger-header">Passenger {idx + 1} Details</h4>

            <div className="row r1">
              <div className="form-group quota-field">
                <label className="form-label tag">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={p.fullName}
                  onChange={(e) =>
                    handlePassengerChange(idx, "fullName", e.target.value)
                  }
                  placeholder="Full Name"
                />
              </div>

              <div className="form-group quota-field">
                <label className="form-label tag">Age</label>
                <input
                  type="number"
                  className="form-control"
                  value={p.age}
                  onChange={(e) =>
                    handlePassengerChange(idx, "age", e.target.value)
                  }
                  placeholder="Age"
                />
              </div>
            </div>

            <div className="row r1">
              <div className="form-group quota-field">
                <label className="form-label tag">Sex</label>
                <select
                  className="form-select"
                  value={p.sex}
                  onChange={(e) =>
                    handlePassengerChange(idx, "sex", e.target.value)
                  }
                >
                  <option defaultValue>Select Sex</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="form-group quota-field">
                <label className="form-label tag">Berth</label>
                <select
                  className="form-select"
                  value={p.berth}
                  onChange={(e) =>
                    handlePassengerChange(idx, "berth", e.target.value)
                  }
                >
                  <option defaultValue>Select Berth preference</option>
                  <option value="Upper">Upper</option>
                  <option value="Lower">Lower</option>
                  <option value="Middle">Middle</option>
                  <option value="Side Upper">Side Upper</option>
                  <option value="Side Lower">Side Lower</option>
                </select>
              </div>
            </div>

            <div className="row r1">
              <div className="form-group quota-field">
                <label className="form-label tag">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={p.phone}
                  onChange={(e) =>
                    handlePassengerChange(idx, "phone", e.target.value)
                  }
                  placeholder="(+91)-"
                />
              </div>

              <div className="form-group quota-field">
                <label className="form-label tag">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={p.email}
                  onChange={(e) =>
                    handlePassengerChange(idx, "email", e.target.value)
                  }
                  placeholder="enter valid email id"
                />
              </div>
            </div>
          </div>
        ))}

        {/* BUTTONS */}
        <div>
          <button type="button" className="btn btn-primary" onClick={addPassenger}>
            + Add Passenger
          </button>

          <button type="button" className="btn btn-danger btndanger" onClick={removePassenger}>
            - Remove Passenger
          </button>
        </div>

        <div className="hr"><hr /></div>

        {/* TERMS */}
        <div className="r2 terms-row">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="terms">
              I agree to <a href="/terms" target="_blank">terms & conditions</a>
            </label>
          </div>
        </div>

        {/* SAVE */}
        <div className="r1 save-row">
          <button className="btn  save" type="submit">SAVE</button>
        </div>
      </form>
      <ToastContainer position="top-right" />

      
    </div>
    </div>
  );
}

export default RailTicketBookingForm;
