import "./ListTrainListing.css";
import { useState, useEffect } from "react";

function ListTrainListing({ trains, onSelect, searchParams }) {
  const [displayTrains, setDisplayTrains] = useState([]);

  useEffect(() => {
    if (!trains || trains.length === 0) {
      setDisplayTrains([]);
      return;
    }

    // Filter by searchParams if provided
    let filtered = trains;
    if (searchParams) {
      filtered = trains.filter(train => {
        const matchFrom = !searchParams.from || train.from.toLowerCase().includes(searchParams.from.toLowerCase());
        const matchTo = !searchParams.to || train.to.toLowerCase().includes(searchParams.to.toLowerCase());
        const matchDate = !searchParams.date || train.date === searchParams.date;
        return matchFrom && matchTo && matchDate;
      });
    }

    setDisplayTrains(filtered);
  }, [trains, searchParams]);

  if (!displayTrains.length) 
    return <p className="no-trains">No trains found</p>;

  return (
    <div className="list-group">
      {displayTrains.map((train) => (
        <div
          key={train.id}
          className="train-item"
          onClick={() => onSelect(train.id)}
          role="button"
          tabIndex={0}
        >
          <h5>{train.name}</h5>
          <p>
            {train.from} → {train.to} | {train.departureTime} - {train.arrivalTime}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ListTrainListing;
