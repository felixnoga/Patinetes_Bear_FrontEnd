import { useTripContext } from "../context/tripContext"
import { useCallback, useEffect, useState } from "react"
import { types } from "../utils/bookReducer"
import "../assets/Trip.css"
const Trip = ({cancelTime})=>{
    const {bookState:{userPosition, scooter, isBooked}, handleContext} = useTripContext()
    const [isInZone, setIsInZone]= useState(false)
    const [hiding, setHiding]= useState(false)

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
        setHiding(true)
        // se retrasan las funciones por la animacion de salida
        setTimeout( ()=>{
            handleContext(types.trip, true);
            cancelTime(true);
            setHiding(false) }, 800)
    }
     
    if (isInZone){
        return(
            <div className={`Trip-div ${hiding ? "Trip-div--out" : "Trip-div--in"}` }>
                <div className="Trip-div--main">
                <p className="Trip-p">Introduce el siguiente código</p>
                <form onSubmit={handleSubmit} className="Trip-form">
                    <input type="text" className="Trip-input" placeholder="Código"/>
                    <button type="submit" className="Trip-button">Aceptar</button>
                </form>
                </div>
            </div>
        )
    }
}

export default Trip