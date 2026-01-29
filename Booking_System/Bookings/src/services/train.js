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

        const response = await axios.get(url, {
            params: params,
            headers: {
                token: localStorage.getItem('token'),
            },
        });

        console.log("API Response:", response.data);
        return response.data;

    } catch(ex){
        console.error("API Exception:", ex.response?.data || ex.message);
        return [];
    }
}


export async function getTrainDetails(id){
    try{
        const url = `${config.server}/train/${id}`
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