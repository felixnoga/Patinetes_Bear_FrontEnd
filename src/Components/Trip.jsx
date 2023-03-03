import { useCallback, useEffect, useState } from "react"
import { useTripContext } from "../context/tripContext"
import { useAppContext } from "../context/context"
import { types } from "../utils/bookReducer"
import useRequest from "../services/useRequest"
import "../assets/Trip.css"
import SpinRotate from "../utils/SpinRotate"

const Trip = ({cancelTime})=>{
    const {bookState:{userPosition, scooter, isBooked, trip}, handleContext} = useTripContext()
    const { handleError } = useAppContext()
    const {loading, confirmBooking}= useRequest()
    const [isInZone, setIsInZone]= useState(false)
    const [hiding, setHiding]= useState(false)
    const [lngUser, latUser] = userPosition;
    // Funcion para que cuando este a menos de 20 metros se active el pop up.
    const isLessThan20Meters= useCallback(()=>{ 
        if (scooter.lng && isBooked){
        const { lng, lat } = scooter;
        const pitagoricDistanceBetween= Math.sqrt(((lngUser-lng)**2)+((latUser-lat)**2));
        const twentyMeters= 0.00150 
        if(pitagoricDistanceBetween < twentyMeters){
            setIsInZone(true)
        }
        else {
            setIsInZone(false)
        }
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



    const handleSubmit= async (event)=>{
        event.preventDefault()
        const booking_id= trip.booking_id
        try{
            const data= await confirmBooking({booking_id ,lngUser, latUser})
            const payload= {
                trip_id: data.trip_id
            }
            handleContext(types.updateTripData, payload)
            setHiding(true)
            // se retrasan las funciones por la animacion de salida
            setTimeout(() => {
                handleContext(types.trip, true);
                cancelTime(true);
                setHiding(false)
            }, 700)
        }catch(error){
            handleError("ups, no pudimos confirmar tu viaje, parece que hemos tenido un error")
            console.log(error)
            
        }
        
    }
     
    if (isInZone){
        return(
            <div className={`Trip-div ${hiding ? "Trip-div--out" : "Trip-div--in"}` }>
                <div className="Trip-div--main">
                <p className="Trip-p">Introduce el siguiente código</p>
                <form onSubmit={handleSubmit} className="Trip-form">
                    { loading ? <SpinRotate/> : <input type="text" className="Trip-input" placeholder="Código" defaultValue={trip.booking_code}>
                    </input>}
                    <button type="submit" className="Trip-button">Aceptar</button>
                </form>
                </div>
            </div>
        )
    }
}

export default Trip