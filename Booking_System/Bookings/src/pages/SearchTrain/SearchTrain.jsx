import "./SearchTrain.css";
import { useState } from "react";
import { trains as dummyTrains } from "../../services/dummyTrains";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SearchTrain() {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    classType: "All",
    quota: "All"
  });

  const navigate = useNavigate();

  const maharashtraCities = [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad",
    "Solapur", "Amravati", "Kolhapur", "Akola", "Jalgaon",
    "Thane", "Latur", "Satara", "Nanded", "Chandrapur"
  ];

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = dummyTrains.filter((train) => {
      return (
        (!searchParams.from || train.from === searchParams.from) &&
        (!searchParams.to || train.to === searchParams.to) &&
        (!searchParams.date || train.date === searchParams.date) &&
        (searchParams.classType === "All" || train.class.includes(searchParams.classType)) &&
        (searchParams.quota === "All" || train.quota === searchParams.quota)
      );
    });

    if (filtered.length === 0) {
      toast.error("No trains found!");
      return;
    }

    navigate("/train-details", { 
      state: { 
        trains: filtered, 
        searchParams: searchParams 
      } 
    });
  };

  return (
    <div className="page-bg-wrapper register-container search-train-wrapper">

      <div className="full-wrapper page-content-above-overlay">
      {/* LEFT SIDE FORM */}
      <div className="left-box">
        <h2 className="title">SEARCH TRAIN</h2>

        <form className="form-area" onSubmit={handleSearch}>
          <select
            className="input-box"
            name="from"
            value={searchParams.from}
            onChange={handleChange}
            required
          >
            <option value="">Source*</option>
            {maharashtraCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            className="input-box"
            name="to"
            value={searchParams.to}
            onChange={handleChange}
            required
          >
            <option value="">Destination*</option>
            {maharashtraCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            className="input-box"
            value={searchParams.date}
            onChange={handleChange}
          />

          <select
            className="input-box"
            name="classType"
            value={searchParams.classType}
            onChange={handleChange}
          >
            <option value="All">All Classes</option>
            <option value="Sleeper">Sleeper</option>
            <option value="AC1">AC 1</option>
            <option value="AC2">AC 2</option>
          </select>

          <select
            className="input-box"
            name="quota"
            value={searchParams.quota}
            onChange={handleChange}
          >
            <option value="All">All Quotas</option>
            <option value="General">General</option>
            <option value="Tatkal">Tatkal</option>
          </select>

          <button className="btn-search" type="submit">Find Trains</button>
        </form>
      </div>

      {/* RIGHT SIDE IMAGE */}
      {/* <div className="right-banner">
        <div className="banner-text">
          <h1>INDIAN RAILWAYS</h1>
          <p>Safety  •  Security  •  Punctuality</p>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default SearchTrain;
