import { useTripContext } from "../context/tripContext"
import { useCallback, useEffect, useState } from "react"
import "../assets/Trip.css"
const Trip= ()=>{
    const {userPosition, scooter, isBooked } = useTripContext()
    const [isInZone, setIsInZone]= useState(false)

    const isLessThan20Meters= useCallback(()=>{
        if (scooter.geometry && isBooked){
        const { lng, lat } = scooter.geometry;
        const [lngUser, latUser] = userPosition;
        const pitagoricDistanceBetween= Math.sqrt(((lngUser-lng)**2)+((latUser-lat)**2));
        const twentyMeters= 0.00050 
        if(pitagoricDistanceBetween < twentyMeters){
            setIsInZone(true)
        }
        else {
            setIsInZone(false)
        }
        console.log(pitagoricDistanceBetween, twentyMeters)
        }
        if(!isBooked) setIsInZone(false)
    })
    
    useEffect(()=>{
        isLessThan20Meters()
    },[isBooked])

    const handleSubmit= (event)=>{
        event.preventDefault()
        setIsInZone(false)
    }
     
    if (isInZone){
        return(
            <div className="Trip-div">
                <p className="Trip-p">Introduce el siguiente Código</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="Trip-input" placeholder="Ejemplo"/>
                    <button type="submit">Aceptar</button>
                </form>
            </div>
        )
    }
}

export default Trip