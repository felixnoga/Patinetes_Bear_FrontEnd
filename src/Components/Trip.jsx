import { useTripContext } from "../context/tripContext"
import { useCallback, useEffect } from "react"
const Trip= ()=>{
    const {userPosition, scooter, isBooked } = useTripContext()

    const isLessThan20Meters= useCallback(()=>{
        if (scooter.geometry && isBooked){
        const { lng, lat } = scooter.geometry;
        const [lngUser, latUser] = userPosition;
        const pitagoricDistanceBetween= Math.sqrt(((lngUser-lng)**2)+((latUser-lat)**2));
        const twentyMeters= 0.00020 
        console.log(pitagoricDistanceBetween, twentyMeters)
    }})
    
    useEffect(()=>{
        isLessThan20Meters()
    },[isBooked])
     
}

export default Trip