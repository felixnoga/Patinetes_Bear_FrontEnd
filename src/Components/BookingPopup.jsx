import { useTripContext } from "../context/tripContext"
import { useState, useEffect, useCallback } from "react"
import {types} from "../utils/bookReducer"
import BookingButton from "./BookingButton"
import useRequest from "../services/useRequest"
import Trip from './Trip';
import "../assets/BookingPopup.css" 

const BookingPopup = ()=>{
    const {isSelected, scooter, unSelect, isBooked, handleContext, bookState}= useTripContext()
    const [direction, setDirection]= useState(false)
    const [isInZone, setIsInZone] = useState(false)
    const {getDirection}= useRequest()

    const updateDirection = useCallback(async ()=>{
        if (bookState.scooter.lat){
            const {lng, lat}= bookState.scooter
            try{
                const payload = await getDirection(lng, lat)
                const adress = payload.join(", ")
                setDirection(adress)
            }catch(error){
                setDirection("no hay disponible ninguna dirección")
        }
        }
    })

    useEffect(() => {
        if (direction){
            setDirection(false)}
        if (!direction){
            updateDirection()
        }
    },[bookState.isSelected])



    return (
        <div className={`Bookingpp-div ${bookState.isSelected && "isActive"}
                             ${bookState.isBooked && "Bookingpp-div--booked"}`  }>
                {!bookState.isBooked && <div className={`Bookingpp-div--background ${bookState.isSelected && "isActive"}`}
                 onClick={()=>handleContext(types.selectScooter, false)}></div>}
                {bookState.scooter  &&
                <div className="Bookingpp-div--main">
                    <div className="Bookingpp-div--logo">
                        <img className="Bookingpp-img" src="/30.png" alt="Bear logo"></img>
                    </div>
                    <div className="Bookingpp-div--info">
                        <div className="Bookingpp-div--prop">
                            <h4 className="Bookingpp-h4">
                            Scooter {bookState.scooter.scooter_id}
                            </h4>
                            <h5> {`nivel de batería ${bookState.scooter.batery}%`}
                            </h5>
                            <h5> {direction ? direction : "Loading..." }</h5> 
                        </div>
                        <BookingButton isInZone={isInZone} cancelTrip={(state) => { setIsInZone(state)}}/>
                        <Trip cancelTime={(state) => { setIsInZone(state) } }/>
                    </div>
                </div> }
            </div>
    )


}

export default BookingPopup