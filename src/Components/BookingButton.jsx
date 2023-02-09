import { useTripContext } from "../context/tripContext"
import useCountdown from "../utils/useCountdown"
import "../assets/BookingButton.css"
import { useEffect } from "react"

const BookingButton= ()=>{
    const {isBooked, updateBook}= useTripContext()
    const timeToReachScooter= 10
    const { timeLeft, init, cancel, outOfTime }= useCountdown(timeToReachScooter)

    // Cuando llegue a 0 el contador se ejecuta el useEffect
    useEffect(()=>{
        if(outOfTime){
        console.log(outOfTime)
        updateBook()
        }
    },[outOfTime])
   
       


    if(!isBooked && !outOfTime)
        return(
            <div className="BookingButton-div">
                <button className="BookingButton-button" onClick={()=>{
                    updateBook()
                    init()}}>
                    Reservar (10 min) 
                </button>
            </div>
    )
    if(isBooked || outOfTime)
        return(
            <div className="BookingButton-div">
                <button className= {`BookingButton-button BookingButton-button--cancel ${outOfTime && "isBlinking"}`} 
                onClick={()=> {
                    cancel();
                    isBooked && updateBook()}}>
                    <h5>{timeLeft}</h5><h5>Cancelar</h5>
                </button>
            </div >
        )
}

export default BookingButton