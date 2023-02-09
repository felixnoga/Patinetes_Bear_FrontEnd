import { useTripContext } from "../context/tripContext"
import { useState, useEffect, useCallback } from "react"
import BookingButton from "./BookingButton"
import useRequest from "../services/useRequest"
import Trip from './Trip';
import "../assets/BookingPopup.css" 

const BookingPopup = ()=>{
    const {isSelected, scooter, unSelect, isBooked}= useTripContext()
    const [direction, setDirection]= useState(false)
    const [isInZone, setIsInZone] = useState(false)
    const {getDirection}= useRequest()

    const updateDirection = useCallback(async ()=>{
        if (scooter.geometry){
            const {lng, lat}= scooter.geometry
            const payload = await getDirection(lng, lat)
            const adress = payload.join(", ")
            setDirection(adress)
        }
    })

    useEffect(() => {
        if (direction){
            setDirection(false)}
        if (!direction){
            updateDirection()
        }
    },[isSelected])



    return (
        <div className={`Bookingpp-div ${isSelected && "isActive"}
                             ${isBooked && "Bookingpp-div--booked"}`  }>
                {!isBooked && <div className={`Bookingpp-div--background ${isSelected && "isActive"}`}
                 onClick={unSelect}></div>}
                {scooter.type  &&
                <div className="Bookingpp-div--main">
                    <div className="Bookingpp-div--logo">
                        <img className="Bookingpp-img" src="/30.png" alt="Bear logo"></img>
                    </div>
                    <div className="Bookingpp-div--info">
                        <div className="Bookingpp-div--prop">
                            <h4 className="Bookingpp-h4">
                            Scooter {scooter.properties.id}
                            </h4>
                            <h5> {`nivel de batería ${scooter.properties.battery}%`}
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