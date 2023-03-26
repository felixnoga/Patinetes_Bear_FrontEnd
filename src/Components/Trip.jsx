import { useCallback, useEffect, useState } from "react"
import { useTripContext } from "../context/tripContext"
import { useAppContext } from "../context/context"
import { types } from "../utils/bookReducer"
import { IoMdUnlock } from "react-icons/io";
import useRequest from "../services/useRequest"
import "../assets/Trip.css"
import SpinRotate from "../utils/SpinRotate"

const Trip = ({cancelTime})=>{
    const {bookState:{userPosition, scooter, isBooked, isSelected, trip}, handleContext} = useTripContext()
    const { handleError } = useAppContext()
    const {loading, confirmBooking}= useRequest()
    const [isInZone, setIsInZone]= useState(false)
    const [hiding, setHiding]= useState(false)
    const [lngUser, latUser] = userPosition;
    // Funcion para que cuando este a menos de 20 metros se active el pop up.
    const isLessThan20Meters= useCallback(()=>{ 
        if (scooter.lng && isSelected){
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
        if(!isSelected) 
            setIsInZone(false)
    })
    
    useEffect(()=>{
        isLessThan20Meters()
    },[userPosition, isSelected, isBooked])

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
                handleContext(types.trip, true);
                cancelTime(true);
                setHiding(false)
        }catch(error){
            handleError("ups, no pudimos confirmar tu viaje, parece que hemos tenido un error")
            console.log(error)
            
        }
        
    }
     
    if (isInZone){
        return(
            <div onClick={handleSubmit} className="Trip-form">
                        {loading ? <SpinRotate /> : <button type="submit" className="Trip-btn Trip-btn--Booking">
                        <IoMdUnlock className="Trip-btn--icon" />
                        Aceptar</button>}
                    
            </div>
        )
    }
    if (!isInZone)
    return (
        <div  className="Trip-div-main--NoBooking">
            <button className="Trip-btn Trip-btn--NoBooking" type="button">
                <IoMdUnlock className="Trip-btn--icon"/>
                Desbloquear
            </button>

        </div>

    )
}

export default Trip