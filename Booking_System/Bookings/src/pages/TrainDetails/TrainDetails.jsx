import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TrainDetails.css';

function TrainDetails() {

  const location = useLocation();
  const navigate = useNavigate();

  const [allTrains, setAllTrains] = useState([]);
  const [displayTrains, setDisplayTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [searchParams, setSearchParams] = useState({
    source: '',
    destination: '',
    scheduleDate: ''
  });

  const [extraFilters, setExtraFilters] = useState({
    classes: [],
    quotas: [],
    times: []
  });

  const maharashtraCities = [
    'Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur',
    'Amravati','Kolhapur','Akola','Jalgaon','Thane','Latur',
    'Satara','Nanded','Chandrapur'
  ];

  // Scroll top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Receive trains from navigation
  useEffect(() => {

    const { trains, searchParams: initialParams } =
      (location && location.state) || {};

    console.log("RECEIVED TRAINS =>", trains);

    if (trains && trains.length > 0) {
      setAllTrains(trains);
      setDisplayTrains(trains);

      if (initialParams) {
        setSearchParams(initialParams);
      }

      setShowDetails(false);
      setExtraFilters({ classes: [], quotas: [], times: [] });

    } else {
      navigate('/home');
    }

  }, [location, navigate]);

  const handleSearchChange = (e) => {
    setSearchParams(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Filter inside already loaded trains
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const filtered = allTrains.filter(train => (
      (!searchParams.source || train.source === searchParams.source) &&
      (!searchParams.destination || train.destination === searchParams.destination) &&
      (!searchParams.scheduleDate || train.scheduleDate === searchParams.scheduleDate)
    ));

    setDisplayTrains(filtered);
    setExtraFilters({ classes: [], quotas: [], times: [] });
    setShowDetails(false);
  };

  const handleViewDetails = (train, e) => {
    e.stopPropagation();
    setSelectedTrain(train);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedTrain(null);
  };

  // ---------- Filters ----------
  const toggleFilter = (key, value) => {
    setExtraFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const timeToMinutes = (hhmm) => {
    const [hh, mm] = hhmm.split(':').map(Number);
    return hh * 60 + mm;
  };

  const timeMatches = (depTime, selectedTimes) => {

    if (!selectedTimes || selectedTimes.length === 0) return true;

    const mins = timeToMinutes(depTime);

    const ranges = {
      morning: [240, 719],
      afternoon: [720, 1079],
      night1: [1080, 1439],
      night2: [0, 239]
    };

    const inMorning = mins >= ranges.morning[0] && mins <= ranges.morning[1];
    const inAfternoon = mins >= ranges.afternoon[0] && mins <= ranges.afternoon[1];
    const inNight =
      (mins >= ranges.night1[0] && mins <= ranges.night1[1]) ||
      (mins >= ranges.night2[0] && mins <= ranges.night2[1]);

    if (selectedTimes.includes('morning') && inMorning) return true;
    if (selectedTimes.includes('afternoon') && inAfternoon) return true;
    if (selectedTimes.includes('night') && inNight) return true;

    return false;
  };

  const applyExtraFilters = () => {

    let filtered = allTrains.slice();

    // Filter by Classes
    if (extraFilters.classes.length > 0) {
      filtered = filtered.filter(train => {
        const trainClasses = train.classes || [];
        return extraFilters.classes.some(cls => trainClasses.includes(cls));
      });
    }

    // Filter by Quotas
    if (extraFilters.quotas.length > 0) {
      filtered = filtered.filter(train =>
        extraFilters.quotas.includes(train.quota)
      );
    }

    // Filter by Departure Times
    if (extraFilters.times.length > 0) {
      filtered = filtered.filter(train =>
        timeMatches(train.departureTime, extraFilters.times)
      );
    }

    setDisplayTrains(filtered);
  };

  const resetExtraFilters = () => {
    setExtraFilters({ classes: [], quotas: [], times: [] });
    setDisplayTrains(allTrains);
  };

  // ---------- LIST PAGE ----------
  const renderTrainList = () => (

    <div className="page-bg-wrapper train-details">

      <div className="container mt-4 two-column-layout page-content-above-overlay">

        {/* Search Bar */}
        <div className="search-bar-container">
          <form className="search-bar-form" onSubmit={handleSearchSubmit}>

            <select
              className="search-bar-input"
              name="source"
              value={searchParams.source}
              onChange={handleSearchChange}
            >
              <option value="">From</option>
              {maharashtraCities.map(c =>
                <option key={c} value={c}>{c}</option>
              )}
            </select>

            <select
              className="search-bar-input"
              name="destination"
              value={searchParams.destination}
              onChange={handleSearchChange}
            >
              <option value="">To</option>
              {maharashtraCities.map(c =>
                <option key={c} value={c}>{c}</option>
              )}
            </select>

            <input
              type="date"
              name="scheduleDate"
              className="search-bar-input"
              value={searchParams.scheduleDate}
              onChange={handleSearchChange}
            />

            <button className="search-bar-btn" type="submit">
              Search
            </button>

          </form>
        </div>

        {/* Filters and List Container */}
        <div className="list-and-filters">

        {/* Filters Panel */}
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="reset-filters-btn" onClick={resetExtraFilters}>
              Reset
            </button>
          </div>

          {/* Class/Tier Filter */}
          <div className="filter-group">
            <h4>Class (Tier)</h4>
            <div className="filter-options">
              {["SLEEPER", "AC1", "AC2", "AC3"].map(tier => (
                <label key={tier} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={extraFilters.classes.includes(tier)}
                    onChange={() => toggleFilter("classes", tier)}
                  />
                  <span>{tier}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quota Filter */}
          <div className="filter-group">
            <h4>Quota</h4>
            <div className="filter-options">
              {["GENERAL", "TATKAL"].map(quota => (
                <label key={quota} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={extraFilters.quotas.includes(quota)}
                    onChange={() => toggleFilter("quotas", quota)}
                  />
                  <span>{quota}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Departure Time Filter */}
          <div className="filter-group">
            <h4>Departure Time</h4>
            <div className="filter-options">
              {["morning", "afternoon", "night"].map(time => (
                <label key={time} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={extraFilters.times.includes(time)}
                    onChange={() => toggleFilter("times", time)}
                  />
                  <span className="time-label">
                    {time === "morning" && "Morning (04:00 - 12:00)"}
                    {time === "afternoon" && "Afternoon (12:00 - 18:00)"}
                    {time === "night" && "Night (18:00 - 23:59 & 00:00 - 04:00)"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-info">
            Showing {displayTrains.length} of {allTrains.length} trains
          </div>

          <button className="apply-filters-btn" onClick={applyExtraFilters}>
            Apply Filters
          </button>
        </div>

        {/* Trains List */}
        <div className="list-column">

          <h2>Available Trains ({displayTrains.length})</h2>
          <hr />

          {displayTrains.length === 0 ? (
            <p className="no-trains">No trains found</p>
          ) : (
            <div className="train-list-vertical">

              {displayTrains.map(train => (

                <div
                  key={train.trainId}
                  className="train-card-vertical"
                >

                  <div className="train-card-header">

                    <div className="train-info-left">
                      <h3>{train.trainName}</h3>
                      <p>{train.source} → {train.destination}</p>
                    </div>

                    <div className="train-info-right">
                      <span>{train.departureTime}</span>
                      <span style={{ margin: '0 10px' }}>-</span>
                      <span>{train.arrivalTime}</span>
                    </div>

                  </div>

                  <div className="train-card-footer">
                    <button
                      className="view-details-btn"
                      onClick={(e) => handleViewDetails(train, e)}
                    >
                      View Details →
                    </button>
                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

        </div>  {/* End of list-and-filters */}

      </div>

    </div>
  );

  // ---------- DETAILS PAGE ----------
  const renderTrainDetails = () => {

    if (!selectedTrain) return null;

    return (
      <div className="page-bg-wrapper train-details">
        <div className="container mt-4 page-content-above-overlay">
          
          <div className="train-details-wrapper">
            <button className="btn-back" onClick={handleBackToList}>
              ← Back to List
            </button>

            <div className="container-train-details">

              <div className="card">

                <h2>{selectedTrain.trainName}</h2>
                <p>Train #{selectedTrain.trainNumber}</p>

                <hr />

                <p><b>From:</b> {selectedTrain.source}</p>
                <p><b>To:</b> {selectedTrain.destination}</p>
                <p><b>Departure:</b> {selectedTrain.departureTime}</p>
                <p><b>Arrival:</b> {selectedTrain.arrivalTime}</p>
                <p><b>Duration:</b> {selectedTrain.duration}</p>
                {selectedTrain.scheduleDate && <p><b>Date:</b> {selectedTrain.scheduleDate}</p>}
                {selectedTrain.classes && selectedTrain.classes.length > 0 && (
                  <p><b>Classes:</b> {selectedTrain.classes.join(", ")}</p>
                )}
                {selectedTrain.quota && (
                  <p><b>Quota:</b> {selectedTrain.quota}</p>
                )}

                <button
                  className="btn-book"
                  onClick={() => {
                    // Store booking data in sessionStorage to persist through auth redirects
                    const bookingData = {
                      journeyFrom: selectedTrain.from,
                      journeyTo: selectedTrain.to,
                      trainNumber: selectedTrain.number,
                      reservationQuota: selectedTrain.quota || '',
                      passengers: [{ fullName: "", age: "", sex: "", berth: "", phone: "", email: "" }]
                    };
                    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
                    navigate('/home/booking');
                  }}
                >
                  Book Now
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    );
  };

  return showDetails ? renderTrainDetails() : renderTrainList();
}

export default TrainDetails;
