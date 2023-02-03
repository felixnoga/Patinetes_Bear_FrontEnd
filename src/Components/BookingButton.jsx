import { useTripContext } from "../context/tripContext"
import useCountdown from "../utils/useCountdown"
import "../assets/BookingButton.css"

const BookingButton= ()=>{
    const {isBooked, updateBook}= useTripContext()
    const { timeLeft, init, cancel, limit }= useCountdown()

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
                onClick={()=> {cancel() ; updateBook()}}>
                    {timeLeft}<bk/>Cancelar
                </button>
            </div >
        )
}

export default BookingButton