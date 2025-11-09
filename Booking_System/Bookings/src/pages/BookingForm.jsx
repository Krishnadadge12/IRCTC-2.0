import "./BookingForm.css"
import React, { useState } from "react";

function RailTicketBookingForm() {

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    let [count, setCount] = useState(2);

    // function to add passenger
    const addPassenger = () => {
        const renderPassenger = document.getElementById('renderPassenger')


        renderPassenger.innerHTML += `
        <div class="passenger-block">
        <div class="h4"><h4>Passenger ${count} Details</h4></div>
    <div class="r1">
      <div class="input-group mb-3" id="quota">
        <label class="form-label tag">Full Name</label>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Full Name" />
        </div>
      </div>

      <div class="input-group mb-3" id="quota">
        <label class="form-label tag">Age</label>
        <div class="input-group">
          <input type="number" class="form-control" placeholder="Age" />
        </div>
      </div>
    </div>
    <div class="r1">
      <div class="input-group mb-3" id="quota">
        <label class="form-label tag">Sex</label>
        <div class="input-group">
          <select class="form-select">
            <option selected>Select Sex</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </select>
        </div>
      </div>

      <div class="input-group mb-3" id="quota">
        <label class="form-label tag">Berth</label>
        <div class="input-group">
          <select class="form-select">
            <option defaultValue>Select Berth preference</option>
            <option value="1">Upper</option>
            <option value="2">Lower</option>
            <option value="3">Middle</option>
            <option value="4">Side Upper</option>
            <option value="5">Side Lower</option>
          </select>
        </div>
      </div>
    </div>
    <div class="r1">
      <div class="input-group mb-3" id="quota">
        <label class="form-label tag">Phone Number</label>
        <div class="input-group">
          <input type="tel" class="form-control" placeholder="(+91)-" />
        </div>
      </div>

      <div class="input-group mb-3" id="quota">
        <label class="form-label tag">Email</label>
        <div class="input-group">
          <input type="email" class="form-control" placeholder="enter valid email id" />
        </div>
      </div>
    </div>
    </div>
  `
        setCount(count + 1)
    }

    // function to remove a passenger
    const removePassenger = () => {
        const renderPassenger = document.getElementById("renderPassenger");
        const blocks = renderPassenger.getElementsByClassName("passenger-block");

        if (blocks.length > 0) {
            blocks[blocks.length - 1].remove(); // Remove last passenger block
            setCount(count - 1);
        }
    };


    return (
        <div className="container">

            <div><h1>BOOKING FORM</h1></div>
            <br />
            {/* Reservation quota and train number*/}
            <div className="r1">
                <div className="input-group mb-3" id="quota">
                    <label className="form-label tag">Reservation Quota</label>

                    <div className="input-group"  >
                        <select className="form-select">
                            <option defaultValue>Select Reservation Quota</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>

                <div className="input-group mb-3" id="quota">
                    <label className="form-label tag">Train Name or Number</label>

                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Train Name/Number" />
                    </div>
                </div>
            </div>

            <br />
            {/* journey from and to */}
            <div className="r1">
                <div className="input-group mb-3" id="quota">
                    <label className="form-label tag">Journey From</label>

                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Station code/name" />
                    </div>
                </div>

                <div className="input-group mb-3" id="quota">
                    <label className="form-label tag">Journey To</label>

                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Station code/name" />
                    </div>
                </div>
            </div>

            {/* Date Component Rendered Here */}
            <div className="r2">
                <div className="input-group mb-3" id="quota">
                    <label className="form-label tag">Departure Date</label>

                    <div className="input-group">
                        <div className="date-input">

                            <div className="wrapper">
                                <input
                                    type="text"
                                    maxLength="2"
                                    placeholder="DD"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                />
                                <label>Day</label>
                            </div>

                            <div className="wrapper">
                                <input
                                    type="text"
                                    maxLength="2"
                                    placeholder="MM"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                />
                                <label>Month</label>
                            </div>

                            <div className="wrapper">
                                <input
                                    type="text"
                                    maxLength="4"
                                    placeholder="YYYY"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                <label>Year</label>
                            </div>

                            <button className="calendar-btn">
                                🗓️
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            {/* horizontal ruler */}
            <div className="hr"><hr /></div>
            {/* Passenger details section starts here */}
            <div>
                <div className="h4"><h4>Passenger 1 Details</h4></div>
                {/* Name and age */}
                <div className="r1">
                    <div className="input-group mb-3" id="quota">
                        <label className="form-label tag">Full Name</label>

                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Full Name" />
                        </div>
                    </div>

                    <div className="input-group mb-3" id="quota">
                        <label className="form-label tag">Age</label>

                        <div className="input-group">
                            <input type="number" className="form-control" placeholder="Age" />
                        </div>
                    </div>
                </div>
                {/* Sex and berth */}
                <div className="r1">
                    <div className="input-group mb-3" id="quota">
                        <label className="form-label tag">Sex</label>

                        <div className="input-group"  >
                            <select className="form-select">
                                <option defaultValue>Select Sex</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group mb-3" id="quota">
                        <label className="form-label tag">Berth</label>

                        <div className="input-group"  >
                            <select className="form-select">
                                <option defaultValue>Select Berth preference</option>
                                <option value="1">Upper</option>
                                <option value="2">Lower</option>
                                <option value="3">Middle</option>
                                <option value="4">Side Upper</option>
                                <option value="5">Side Lower</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* phone number and email */}
                <div className="r1">
                    <div className="input-group mb-3" id="quota">
                        <label className="form-label tag">Phone Number</label>

                        <div className="input-group">
                            <input type="tel" className="form-control" placeholder="(+91)-" />
                        </div>
                    </div>

                    <div className="input-group mb-3" id="quota">
                        <label className="form-label tag">Email</label>

                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="enter valid email id" />
                        </div>
                    </div>
                </div>
                <div id="renderPassenger"></div>
                <span className="h4"><button className="btn btn-primary" onClick={addPassenger}>+ Add Passenger</button></span>
                <span className="h4"><button className="btn btn-danger" onClick={removePassenger}>- Remove Passenger</button></span>
                <div className="hr"><hr /></div>
            </div>
            {/* terms $ condition */}
            <div className="r2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="terms" />
                    <label class="form-check-label" for="terms">
                        I agree to <a href="">terms & conditions</a>
                    </label>
                </div>
            </div>
            <br/>
            <br/>
            {/* save button */}
            <div className="r1">
                <button className="btn btn-success save">SAVE</button>
            </div>
            <br/>
            <br />
            <br />
        </div>
    )
}

export default RailTicketBookingForm;
