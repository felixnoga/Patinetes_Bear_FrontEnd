// import { useTripContext } from "../context/tripContext"
import { useState } from "react";
import mapboxReq from "./mapboxReq";
import serverReq from "./serverReq";
import { useAppContext } from "../context/context";

const useRequest= ()=>{
    const [loading, setLoading] = useState(false)

    const getDirection = async (lng, lat)=>{
        setLoading(true)
    try {
        const payload= await mapboxReq.getDirection(lng, lat);
        const dir = [payload.data.features[0].text, payload.data.features[0].address ]
        return dir
    } catch(error){
        return  
    }finally{
        setLoading(false)
    }}

    const getNearbyScooters= async(lng, lat)=>{
        setLoading(true)
        try {
            const payload= await serverReq.nearbyScooters(lng, lat)
            return payload.data
        }catch(error){
            throw Error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const getIso = async (lng, lat)=>{
        setLoading(true)
    try {
        const payload= await mapboxReq.getIso(lng, lat);
            if (payload.status === 200) {
                const dir = payload.data
                return dir
    }} catch(error){
        throw Error(error)
    } finally {
        setLoading(false)
    }
}
    
    const bookingScooter = async (body) =>{
        setLoading(true)
        console.log(body)
        try {
            const payload = await serverReq.bookingScooter(body);
            const booking = payload.data
            return booking
        } catch (error){
            throw Error(error.message)
        } finally {
            setLoading(false)
        }
    }
    const confirmBooking = async ({booking_id, lngUser, latUser }) =>{
        setLoading(true)
        const body = { lng: lngUser , lat : latUser }
        try {
            const payload = await serverReq.confirmBooking(booking_id, body);
            const trip = payload.data
            return trip
        } catch (error){
            throw Error(error.message)
        } finally {
            setLoading(false)
        }
    }
    const finishTrip = async ({trip_id, lng, lat }) =>{
        setLoading(true)
        const time= new Date().toUTCString()
        const body = { time, lng, lat }
        try {
            const payload = await serverReq.finishTrip(trip_id, body);
            const trip = payload.data
            return trip
        } catch (error) {
            throw Error(error)
        } finally {
            setLoading(false)
        }
    }
    const cancelBooking= async (id_scooter)=>{
        setLoading(true)
        try {
            const payload = await serverReq.cancelBooking(id_scooter);
            return true
        } catch (error) {
            throw Error(error)
        } finally {
            setLoading(false)
        }
    }

    return({
        loading,
        getDirection,
        getIso,
        getNearbyScooters,
        bookingScooter,
        confirmBooking,
        finishTrip,
        cancelBooking
    }
    )
}
export default useRequest