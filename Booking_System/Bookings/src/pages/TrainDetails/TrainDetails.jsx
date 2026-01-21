import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { trains as dummyTrains } from '../../services/dummyTrains';
import './TrainDetails.css';

function TrainDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [allTrains, setAllTrains] = useState([]);
  const [displayTrains, setDisplayTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });

  const [extraFilters, setExtraFilters] = useState({ classes: [], quotas: [], times: [] });

  const maharashtraCities = [
    'Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur','Amravati','Kolhapur','Akola','Jalgaon','Thane','Latur','Satara','Nanded','Chandrapur'
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  useEffect(() => {
    const { trains, searchParams: initialParams } = (location && location.state) || {};
    if (trains && trains.length > 0) {
      setAllTrains(trains);
      setDisplayTrains(trains);
      if (initialParams) setSearchParams(initialParams);
      setShowDetails(false);
      setExtraFilters({ classes: [], quotas: [], times: [] });
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const handleSearchChange = (e) => setSearchParams(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filtered = dummyTrains.filter(train => (
      (!searchParams.from || train.from === searchParams.from) &&
      (!searchParams.to || train.to === searchParams.to) &&
      (!searchParams.date || train.date === searchParams.date)
    ));
    setAllTrains(filtered);
    setDisplayTrains(filtered);
    setExtraFilters({ classes: [], quotas: [], times: [] });
    setShowDetails(false);
  };

  const handleViewDetails = (train, e) => { e.stopPropagation(); setSelectedTrain(train); setShowDetails(true); };
  const handleBackToList = () => { setShowDetails(false); setSelectedTrain(null); };

  const toggleFilter = (key, value) => setExtraFilters(prev => ({ ...prev, [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value] }));

  const timeToMinutes = (hhmm) => { const [hh, mm] = hhmm.split(':').map(Number); return hh * 60 + mm; };
  const timeMatches = (depTime, selectedTimes) => {
    if (!selectedTimes || selectedTimes.length === 0) return true;
    const mins = timeToMinutes(depTime);
    const ranges = { morning: [4*60, 11*60 + 59], afternoon: [12*60, 17*60 + 59], night1: [18*60, 23*60 + 59], night2: [0, 3*60 + 59] };
    const inMorning = mins >= ranges.morning[0] && mins <= ranges.morning[1];
    const inAfternoon = mins >= ranges.afternoon[0] && mins <= ranges.afternoon[1];
    const inNight = (mins >= ranges.night1[0] && mins <= ranges.night1[1]) || (mins >= ranges.night2[0] && mins <= ranges.night2[1]);
    if (selectedTimes.includes('morning') && inMorning) return true;
    if (selectedTimes.includes('afternoon') && inAfternoon) return true;
    if (selectedTimes.includes('night') && inNight) return true;
    return false;
  };

  const applyExtraFilters = () => {
    let filtered = allTrains.slice();
    if (extraFilters.classes.length > 0) filtered = filtered.filter(train => train.class && train.class.some(c => extraFilters.classes.includes(c)));
    if (extraFilters.quotas.length > 0) filtered = filtered.filter(train => extraFilters.quotas.includes(train.quota));
    if (extraFilters.times.length > 0) filtered = filtered.filter(train => timeMatches(train.departureTime, extraFilters.times));
    setDisplayTrains(filtered);
  };

  const resetExtraFilters = () => { setExtraFilters({ classes: [], quotas: [], times: [] }); setDisplayTrains(allTrains); };

  const uniqueClasses = Array.from(new Set(allTrains.flatMap(t => t.class || [])));
  const uniqueQuotas = Array.from(new Set(allTrains.map(t => t.quota).filter(Boolean)));

  const renderTrainList = () => (
    <div className="page-bg-wrapper train-details">
      <div className="page-bg-overlay" />
      <div className="container mt-4 two-column-layout page-content-above-overlay">
        <div className="search-bar-container">
          <form className="search-bar-form" onSubmit={handleSearchSubmit}>
            <select className="search-bar-input" name="from" value={searchParams.from} onChange={handleSearchChange}>
              <option value="">From</option>
              {maharashtraCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="search-bar-input" name="to" value={searchParams.to} onChange={handleSearchChange}>
              <option value="">To</option>
              {maharashtraCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="date" name="date" className="search-bar-input" value={searchParams.date} onChange={handleSearchChange} />
            <button className="search-bar-btn" type="submit">Search</button>
          </form>
        </div>

        <div className="list-and-filters">
          <div className="list-column">
            <h2 style={{ marginTop: '16px', marginBottom: '12px' }}>Available Trains ({displayTrains.length})</h2>
            <hr />
            {displayTrains.length === 0 ? (
              <p className="no-trains">No trains found for your search</p>
            ) : (
              <div className="train-list-vertical">
                {displayTrains.map(train => (
                  <div key={train.id} className="train-card-vertical">
                    <div className="train-card-header">
                      <div className="train-info-left">
                        <h3 className="train-name">{train.name}</h3>
                        <p className="train-route">{train.from} <span className="arrow-icon">→</span> {train.to}</p>
                      </div>
                      <div className="train-info-right">
                        <div className="train-timing">
                          <span className="dep-time">{train.departureTime}</span>
                          <span className="train-duration">{train.duration}</span>
                          <span className="arr-time">{train.arrivalTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="train-card-footer">
                      <div className="train-details-mini">
                        <span>Classes: {train.class ? train.class.join(', ') : '-'}</span>
                        <span>Quota: {train.quota}</span>
                      </div>
                      <div className="train-footer-right">
                        <button className="view-details-btn" onClick={(e) => handleViewDetails(train, e)}>View Details →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="filters-panel">
            <h3>Additional Filters</h3>

            <div className="filter-block">
              <div className="filter-title">Classes</div>
              <div className="filter-list">
                {uniqueClasses.map(cls => (
                  <label key={cls}>
                    <input type="checkbox" checked={extraFilters.classes.includes(cls)} onChange={() => toggleFilter('classes', cls)} />
                    <span>{cls}</span>
                  </label>
                ))}
                {uniqueClasses.length === 0 && <p className="muted">No classes available</p>}
              </div>
            </div>

            <div className="filter-block">
              <div className="filter-title">Quotas</div>
              <div className="filter-list">
                {uniqueQuotas.map(q => (
                  <label key={q}>
                    <input type="checkbox" checked={extraFilters.quotas.includes(q)} onChange={() => toggleFilter('quotas', q)} />
                    <span>{q}</span>
                  </label>
                ))}
                {uniqueQuotas.length === 0 && <p className="muted">No quotas available</p>}
              </div>
            </div>

            <div className="filter-block">
              <div className="filter-title">Time range</div>
              <div className="filter-list">
                <label>
                  <input type="checkbox" checked={extraFilters.times.includes('morning')} onChange={() => toggleFilter('times','morning')} />
                  <span>Morning (04:00 - 11:59)</span>
                </label>
                <label>
                  <input type="checkbox" checked={extraFilters.times.includes('afternoon')} onChange={() => toggleFilter('times','afternoon')} />
                  <span>Afternoon (12:00 - 17:59)</span>
                </label>
                <label>
                  <input type="checkbox" checked={extraFilters.times.includes('night')} onChange={() => toggleFilter('times','night')} />
                  <span>Night (18:00 - 03:59)</span>
                </label>
              </div>
            </div>

            <div className="filter-actions">
              <button className="apply-filters-btn" onClick={applyExtraFilters}>Apply</button>
              <button className="reset-filters-btn" onClick={resetExtraFilters}>Reset</button>
            </div>

            <div style={{ marginTop: 12, fontSize: 13, color: '#556b7a' }}>
              Note: Top search (from/to/date) controls base list. Use additional filters and click Apply to refine results.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );

  const renderTrainDetails = () => {
    if (!selectedTrain) return null;
    return (
      <div className="page-bg-wrapper train-details">
        <div className="page-bg-overlay" />
        <div className="container mt-4 page-content-above-overlay">
          <button className="btn-back" onClick={handleBackToList}>Back to List</button>

          <div className="card" style={{ marginTop: '20px' }}>
            <div className="detail-header">
              <h2>{selectedTrain.name}</h2>
              <span className="train-number-detail">Train #{selectedTrain.number}</span>
            </div>

            <hr />

            <div className="detail-section">
              <h3>Route & Timing</h3>
              <div className="detail-row"><strong>From:</strong><span>{selectedTrain.from}</span></div>
              <div className="detail-row"><strong>To:</strong><span>{selectedTrain.to}</span></div>
              <div className="detail-row"><strong>Departure:</strong><span>{selectedTrain.departureTime}</span></div>
              <div className="detail-row"><strong>Arrival:</strong><span>{selectedTrain.arrivalTime}</span></div>
              <div className="detail-row"><strong>Duration:</strong><span>{selectedTrain.duration}</span></div>
              <div className="detail-row"><strong>Date:</strong><span>{selectedTrain.date}</span></div>
            </div>

            <hr />

            <div className="detail-section">
              <h3>Availability & Pricing (All Classes & Quotas)</h3>
              <table className="availability-table">
                <thead>
                  <tr><th>Class</th><th>Seats Available</th><th>Price per Seat</th><th>Quota</th></tr>
                </thead>
                <tbody>
                  {selectedTrain.classDetails && selectedTrain.classDetails.map((cls, idx) => (
                    <tr key={idx}>
                      <td><strong>{cls.class}</strong></td>
                      <td>{cls.seatsAvailable}</td>
                      <td>₹{cls.price}</td>
                      <td>{cls.quota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr />

            <div className="detail-section">
              <h3>Stops</h3>
              <div className="stops-list">
                {selectedTrain.stops && selectedTrain.stops.map((stop, idx) => (
                  <div key={idx} className="stop-item">
                    <div className="stop-station">{stop.station}</div>
                    <div className="stop-code">Code: {stop.code}</div>
                    <div className="stop-time">Arr: {stop.arr} | Dep: {stop.dep}</div>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            <button className="btn-book" onClick={() => navigate('/booking', { state: { selectedTrain } })}>Book Now</button>
          </div>
        </div>
      </div>
    );
  };

  return showDetails ? renderTrainDetails() : renderTrainList();
}

export default TrainDetails;