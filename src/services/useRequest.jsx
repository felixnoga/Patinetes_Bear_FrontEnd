// import { useTripContext } from "../context/tripContext"
import mapboxReq from "./mapboxReq";
import serverReq from "./serverReq";

const useRequest= ()=>{

    const getDirection = async (lng, lat)=>{
    try {
        const payload= await mapboxReq.getDirection(lng, lat);
            if (payload.status === 200) {
                const dir = [payload.data.features[0].text, payload.data.features[0].address ]
                return dir
    }} catch(error){
        return 
    }}

    const getNearbyScooters= async(lng, lat)=>{
        try {
            const payload= await serverReq.nearbyScooters(lng, lat)
                if(payload.status === 200){
                    return payload.data}
        }catch(error){
            console.log(error)
            return error
        }
    }

    const getIso = async (lng, lat)=>{
    try {
        const payload= await mapboxReq.getIso(lng, lat);
            if (payload.status === 200) {
                const dir = payload.data
                return dir
    }} catch(error){
        return error.message
    }

    

    }
    return({
        getDirection,
        getIso,
        getNearbyScooters
    }
    )
}
export default useRequest