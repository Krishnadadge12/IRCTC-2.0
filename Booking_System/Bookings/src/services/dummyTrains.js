// services/dummyTrains.js
export const trains = [
  // Mumbai to Pune (3 trains)
  {
    id: 1,
    number: "12101",
    name: "MAHARASHTRA EXPRESS",
    from: "Mumbai",
    to: "Pune",
    departureTime: "06:30",
    arrivalTime: "12:45",
    duration: "6h 15m",
    class: ["Sleeper", "AC2", "AC1"],
    quota: "General",
    seats: 45,
    fare: 320,
    availability: "available",
    date: "2025-11-30",
    classDetails: [
      { class: "Sleeper", seatsAvailable: 25, price: 320, quota: "General" },
      { class: "AC2", seatsAvailable: 12, price: 520, quota: "General" },
      { class: "AC1", seatsAvailable: 8, price: 750, quota: "General" }
    ],
    stops: [
      { station: "Mumbai Central", code: "MMCT", arr: "06:30", dep: "06:30" },
      { station: "Thane", code: "TNA", arr: "06:50", dep: "06:55" },
      { station: "Kalyan", code: "KYN", arr: "07:40", dep: "07:45" },
      { station: "Lonavala", code: "LNL", arr: "10:40", dep: "10:45" },
      { station: "Pune Junction", code: "PUNE", arr: "12:45", dep: "12:45" }
    ]
  },
  {
    id: 2,
    number: "12103",
    name: "DECCAN QUEEN",
    from: "Mumbai",
    to: "Pune",
    departureTime: "03:05",
    arrivalTime: "10:20",
    duration: "7h 15m",
    class: ["Sleeper", "AC2", "AC1"],
    quota: "Tatkal",
    seats: 12,
    fare: 380,
    availability: "available",
    date: "2025-11-30",
    classDetails: [
      { class: "Sleeper", seatsAvailable: 8, price: 380, quota: "Tatkal" },
      { class: "AC2", seatsAvailable: 4, price: 620, quota: "Tatkal" },
      { class: "AC1", seatsAvailable: 0, price: 850, quota: "Tatkal" }
    ],
    stops: [
      { station: "Mumbai Central", code: "MMCT", arr: "03:05", dep: "03:05" },
      { station: "Dadar", code: "DR", arr: "03:25", dep: "03:30" },
      { station: "Kalyan", code: "KYN", arr: "04:15", dep: "04:20" },
      { station: "Lonavala", code: "LNL", arr: "06:50", dep: "06:55" },
      { station: "Pune Junction", code: "PUNE", arr: "10:20", dep: "10:20" }
    ]
  },
  {
    id: 3,
    number: "12105",
    name: "PRAGATI EXPRESS",
    from: "Mumbai",
    to: "Pune",
    departureTime: "14:30",
    arrivalTime: "21:00",
    duration: "6h 30m",
    class: ["Sleeper", "AC2", "AC1"],
    quota: "General",
    seats: 32,
    fare: 300,
    availability: "available",
    date: "2025-11-30",
    classDetails: [
      { class: "Sleeper", seatsAvailable: 18, price: 300, quota: "General" },
      { class: "AC2", seatsAvailable: 10, price: 480, quota: "General" },
      { class: "AC1", seatsAvailable: 4, price: 700, quota: "General" }
    ],
    stops: [
      { station: "Mumbai Central", code: "MMCT", arr: "14:30", dep: "14:30" },
      { station: "Thane", code: "TNA", arr: "14:50", dep: "14:55" },
      { station: "Kalyan", code: "KYN", arr: "15:35", dep: "15:40" },
      { station: "Lonavala", code: "LNL", arr: "18:00", dep: "18:05" },
      { station: "Pune Junction", code: "PUNE", arr: "21:00", dep: "21:00" }
    ]
  },

  // Pune to Mumbai (3 trains)
  {
    id: 4,
    number: "12102",
    name: "MAHARASHTRA EXPRESS RETURN",
    from: "Pune",
    to: "Mumbai",
    departureTime: "08:00",
    arrivalTime: "14:15",
    duration: "6h 15m",
    class: ["Sleeper", "AC2", "AC1"],
    quota: "General",
    seats: 38,
    fare: 320,
    availability: "available",
    date: "2025-11-30",
    classDetails: [
      { class: "Sleeper", seatsAvailable: 22, price: 320, quota: "General" },
      { class: "AC2", seatsAvailable: 12, price: 520, quota: "General" },
      { class: "AC1", seatsAvailable: 4, price: 750, quota: "General" }
    ],
    stops: [
      { station: "Pune Junction", code: "PUNE", arr: "08:00", dep: "08:00" },
      { station: "Lonavala", code: "LNL", arr: "10:00", dep: "10:05" },
      { station: "Kalyan", code: "KYN", arr: "12:30", dep: "12:35" },
      { station: "Thane", code: "TNA", arr: "13:15", dep: "13:20" },
      { station: "Mumbai Central", code: "MMCT", arr: "14:15", dep: "14:15" }
    ]
  },
  {
    id: 5,
    number: "12104",
    name: "DECCAN QUEEN RETURN",
    from: "Pune",
    to: "Mumbai",
    departureTime: "12:30",
    arrivalTime: "19:45",
    duration: "7h 15m",
    class: ["Sleeper", "AC2", "AC1"],
    quota: "Tatkal",
    seats: 16,
    fare: 380,
    availability: "available",
    date: "2025-11-30",
    classDetails: [
      { class: "Sleeper", seatsAvailable: 9, price: 380, quota: "Tatkal" },
      { class: "AC2", seatsAvailable: 5, price: 620, quota: "Tatkal" },
      { class: "AC1", seatsAvailable: 2, price: 850, quota: "Tatkal" }
    ],
    stops: [
      { station: "Pune Junction", code: "PUNE", arr: "12:30", dep: "12:30" },
      { station: "Lonavala", code: "LNL", arr: "14:30", dep: "14:35" },
      { station: "Kalyan", code: "KYN", arr: "17:05", dep: "17:10" },
      { station: "Dadar", code: "DR", arr: "18:00", dep: "18:05" },
      { station: "Mumbai Central", code: "MMCT", arr: "19:45", dep: "19:45" }
    ]
  },
  {
    id: 6,
    number: "12106",
    name: "PRAGATI EXPRESS RETURN",
    from: "Pune",
    to: "Mumbai",
    departureTime: "16:15",
    arrivalTime: "22:45",
    duration: "6h 30m",
    class: ["Sleeper", "AC2", "AC1"],
    quota: "General",
    seats: 28,
    fare: 300,
    availability: "available",
    date: "2025-11-30",
    classDetails: [
      { class: "Sleeper", seatsAvailable: 16, price: 300, quota: "General" },
      { class: "AC2", seatsAvailable: 9, price: 480, quota: "General" },
      { class: "AC1", seatsAvailable: 3, price: 700, quota: "General" }
    ],
    stops: [
      { station: "Pune Junction", code: "PUNE", arr: "16:15", dep: "16:15" },
      { station: "Lonavala", code: "LNL", arr: "18:30", dep: "18:35" },
      { station: "Kalyan", code: "KYN", arr: "20:50", dep: "20:55" },
      { station: "Thane", code: "TNA", arr: "21:30", dep: "21:35" },
      { station: "Mumbai Central", code: "MMCT", arr: "22:45", dep: "22:45" }
    ]
  }
];
