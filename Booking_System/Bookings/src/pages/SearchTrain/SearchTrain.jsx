import "./SearchTrain.css";
import { useState } from "react";
import { getTrains } from "../../services/train"; 
import { useNavigate } from "react-router-dom";  
import { toast } from "react-toastify";

function SearchTrain() {
  const [searchParams, setSearchParams] = useState({
    source: "",
    destination: "",
    scheduleDate: ""
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

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchParams.source || !searchParams.destination) {
      toast.error("Please select both source and destination");
      return;
    }

    try {
      // Debug: print the params we are going to send
      console.log('SearchTrain -> calling getTrains with', searchParams);
      try {
        // also show how browser will serialize params
        const qs = new URLSearchParams(
          Object.fromEntries(Object.entries(searchParams).filter(([k,v]) => v))
        ).toString();
        console.log('SearchTrain -> querystring:', qs);
      } catch (e) { /* ignore URLSearchParams errors in older browsers */ }

      const result = await getTrains(searchParams);
      console.log("API RESULT =>", result);

      // Handle response - API returns array directly
      const trains = Array.isArray(result) ? result : [];

      if (!trains || trains.length === 0) {
        toast.warning("No trains found for the selected route and date!");
        return;
      }

      console.log("Navigating with trains:", trains);
      navigate("/home/trains/search", {
        state: {
          trains: trains,
          searchParams: searchParams
        }
      });

    } catch (error) {
      console.error("Failed to fetch trains:", error);
      toast.error("Failed to fetch trains");
    }
  };

  return (
    <div className="page-bg-wrapper register-container search-train-wrapper">
      <div className="full-wrapper">
        <div className="search-box">
          <h2 className="title">SEARCH TRAIN</h2>

          <form className="form-area" onSubmit={handleSearch}>
            <select
              className="input-box"
              name="source"
              value={searchParams.source}
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
              name="destination"
              value={searchParams.destination}
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
              name="scheduleDate"
              className="input-box"
              value={searchParams.scheduleDate}
              onChange={handleChange}
            />

            <button className="btn-search" type="submit">Find Trains</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchTrain;
