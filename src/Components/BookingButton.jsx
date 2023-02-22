import { useEffect } from "react"
import { useTripContext } from "../context/tripContext"
import {types} from "../utils/bookReducer"
import useCountdown from "../utils/useCountdown"
import useRequest from "../services/useRequest"
import "../assets/BookingButton.css"

const BookingButton = ({ isInZone, cancelTrip })=>{
    const {bookState:{isBooked, scooter} , updateBook, handleContext}= useTripContext()
    const timeToReachScooter= 15
    const { timeLeft, init, cancel, outOfTime }= useCountdown(timeToReachScooter)
    const {bookingScooter, cancelBooking, loading}= useRequest()

    // Cuando llegue a 0 el contador se ejecuta el useEffect
    useEffect(()=>{
        if(outOfTime){
        handleContext(types.bookScooter, false)
        // updateBook()
        cancelTrip(false)
        }
    },[outOfTime])
    //  al aceptar el componente trip se reinicia todo
    useEffect(()=>{
        if(isInZone === true){
            cancel()
            handleContext(types.bookScooter, false)
            // updateBook()
            cancelTrip(false)
        }
    }, [isInZone])

    const handleBooking= async ()=>{
        // TODO pendiente cambiar user_id por el user del contexto
        const id_user= 1
        const body= {
            id_user,
            id_scooter: scooter.scooter_id
        }
        try{
            const data= await bookingScooter(body);
            const payload= {
                booking_id: data.data.booking_id,
                booking_code: data.code
                }
            console.log( data, payload)
            handleContext(types.updateTripData, payload)
            handleContext(types.bookScooter, true);
            init()
        }catch(error){
            console.log(error)
        }
    }
    const handleCancel= async ()=> {
        const id= scooter.scooter_id
        try {
            const data = await cancelBooking(id);
            cancel();
            isBooked && handleContext(types.bookScooter, false)
            cancelTrip()
        } catch (error) {
            console.log(error)
        }
    }

   
       
    // dos tipos de botones, para reservar y para cancelar la reserva

    if(!isBooked && !outOfTime)
        return(
            <div className="BookingButton-div">
                <button className="BookingButton-button" onClick={handleBooking}
                    // ()=>{
                    // handleContext(types.bookScooter, true)
                    // // updateBook()
                    // init()}}
                    >
                    Reservar (10 min) 
                </button>
            </div>
    )
    if(isBooked || outOfTime)
        return(
            <div className="BookingButton-div">
                <button className= {`BookingButton-button BookingButton-button--cancel ${outOfTime && "isBlinking"}`} 
                onClick={handleCancel}
                    // cancel();
                    // isBooked && 
                    // // updateBook(); 
                    // handleContext(types.bookScooter, false)
                    // cancelTrip()}}
                    >
                        <h5>{timeLeft}</h5>
                        <h5>Cancelar</h5>
                </button>
            </div >
        )
}

export default BookingButton