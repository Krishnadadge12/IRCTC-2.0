// Use Vite env var VITE_API_URL if set, else default to localhost:8080
export const config = {
    server: import.meta.env.VITE_API_URL || 'http://localhost:8080'
}

// Tips:
// • If your frontend runs on Vite default port (5173), either update backend CORS to allow http://localhost:5173
//   or run Vite on port 4000 to match backend @CrossOrigin (http://localhost:4000).
// • To set the API URL for the frontend, create a .env file in project root with:
//     VITE_API_URL=http://localhost:8080
// This keeps config flexible across environments.