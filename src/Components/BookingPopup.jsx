import { useTripContext } from "../context/tripContext"
import useRequest from "../services/useRequest"
import "../assets/BookingPopup.css" 
import { useState, useEffect, useCallback } from "react"

const BookingPopup = ()=>{
    const {isSelected, scooter, unSelect}= useTripContext()
    const [direction, setDirection]= useState(false)
    const {getDirection}= useRequest()

    const updateDirection = useCallback(async ()=>{
        if (scooter.geometry){
            const {lng, lat}= scooter.geometry
            const payload = await getDirection(lng, lat)
            setDirection(payload)
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
        <div className={`Bookingpp-div ${isSelected && "isActive"}`}>
                <div className={`Bookingpp-div--background ${isSelected && "isActive"}`}
                 onClick={unSelect}></div>
                {scooter.type  &&
                <div className="Bookingpp-div--main">
                    <div className="Bookingpp-div--logo">
                        <img className="Bookingpp-img" src="/30.png" alt="Bear logo"></img>
                    </div>
                    <div className="Bookingpp-div--info">
                        <h4 className="Bookingpp-h4">
                            Scooter {scooter.properties.id}
                        </h4>
                        <div className="Bookingpp-div--prop">
                            <h5> {`nivel de batería ${scooter.properties.battery}%`}</h5>
                        </div>
                        <div className="Bookingpp-div--prop">
                            <h5> {direction && isSelected ? direction : direction ? "Loading..." : "Closing..."}</h5>
                        </div>
                    </div>
                </div> }
            </div>
    )


}

export default BookingPopup