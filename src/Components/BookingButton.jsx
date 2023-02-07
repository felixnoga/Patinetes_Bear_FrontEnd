import { useTripContext } from "../context/tripContext"
import useCountdown from "../utils/useCountdown"
import "../assets/BookingButton.css"

const BookingButton= ()=>{
    const {isBooked, updateBook}= useTripContext()
    const timeToReachScooter= 600
    const { timeLeft, init, cancel, limit }= useCountdown(timeToReachScooter)

    if(limit){
        updateBook()
    }


    if(!isBooked)
        return(
            <div className="BookingButton-div">
                <button className="BookingButton-button" onClick={()=>{
                    updateBook()
                    init()}}>
                    Reservar (10 min) 
                </button>
            </div>
    )
    if(isBooked)
        return(
            <div className="BookingButton-div">
                <button className="BookingButton-button BookingButton-button--cancel " 
                onClick={()=> {
                    cancel();
                    updateBook()}}>
                    <h5>{timeLeft}</h5><h5>Cancelar</h5>
                </button>
            </div >
        )
}

export default BookingButton