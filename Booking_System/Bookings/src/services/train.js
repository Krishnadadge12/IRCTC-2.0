import axios from "axios"
import { config } from "./config"

export async function getTrains(){
    try{
        const url =`${config.server}/search`

        const response = await axios.get(url,{
            headers: {
                token: localStorage.getItem('token'),
            },
        })
        return response.data
    }catch(ex){
        console.log(`exception:`,ex)
        return {status: "error", error: ex.message }
    }
}

export async function getTrainDetails(id){
    try{
        const url = `${config.server}/search/details/${id}`
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