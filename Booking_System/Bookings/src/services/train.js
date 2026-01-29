import axios from "axios"
import { config } from "./config"

/*getTrains(searchData) will produce:
    /trains/search?source=PUNE&destination=MUMBAI&date=2026-02-10&travelClass=SL&quota=GN*/
export async function getTrains(searchData){    
    try{
        const url = `${config.server}/trains/search`;

        // Build params object only with non-empty values
        const params = {
            source: searchData.source,
            destination: searchData.destination
        };

        // Only add scheduleDate if it's provided and not empty
        if (searchData.scheduleDate) {
            params.scheduleDate = searchData.scheduleDate;
        }

        // Debug: show exact request URL and params
        console.log("getTrains -> GET", url, params);

        const response = await axios.get(url, {
            params: params,
            headers: {
                token: localStorage.getItem('token'),
            },
        });

        console.log("API Response:", response.status, response.data);
        return response.data;

    } catch(ex){
        // Provide detailed debugging info
        console.error("API Exception:", {
            message: ex.message,
            status: ex.response?.status,
            data: ex.response?.data
        });
        return [];
    }
}


export async function getTrainDetails(id){
    try{
        // backend mapping is /trains/{trainId}
        const url = `${config.server}/trains/${id}`
        const response = await axios.get(url,{
            headers: {
                token:localStorage.getItem('token'),
            },
        })
        return response.data
    }catch(ex) {
        console.log(`exception:`,ex)
        return {status: "error", error: ex.message}
    }
}