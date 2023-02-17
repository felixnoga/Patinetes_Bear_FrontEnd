import { useTripContext } from "../context/tripContext"
import { useCallback, useEffect, useState } from "react"
import "../assets/Trip.css"
const Trip = ({cancelTime})=>{
    const {bookState:{userPosition, scooter, isBooked}} = useTripContext()
    const [isInZone, setIsInZone]= useState(false)

    // Funcion para que cuando este a menos de 20 metros se active el pop up.
    const isLessThan20Meters= useCallback(()=>{ 
        if (scooter.lng && isBooked){
        const { lng, lat } = scooter;
        const [lngUser, latUser] = userPosition;
        const pitagoricDistanceBetween= Math.sqrt(((lngUser-lng)**2)+((latUser-lat)**2));
        const twentyMeters= 0.00040 
        if(pitagoricDistanceBetween < twentyMeters){
            setIsInZone(true)
        }
        else {
            setIsInZone(false)
        }
        console.log(pitagoricDistanceBetween, twentyMeters, userPosition)
        }
        if(!isBooked) 
            setIsInZone(false)
    })
    
    useEffect(()=>{
        isLessThan20Meters()
    },[userPosition, isBooked])

    useEffect(()=>{
        if (!isBooked)
        setIsInZone(false)
    }, [isBooked])



    const handleSubmit= (event)=>{
        event.preventDefault()
        cancelTime(true)
    }
     
    if (isInZone){
        return(
            <div className="Trip-div">
                <p className="Trip-p">Introduce el siguiente Código</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="Trip-input" placeholder="Ejemplo"/>
                    <button type="submit" className="Trip-button">Aceptar</button>
                </form>
            </div>
        )
    }
}

export default Trip