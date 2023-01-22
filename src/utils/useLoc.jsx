import { useLayoutEffect, useState } from "react";

const useLoc= ()=> {
    const [lat, setLat]=useState()
    const [lng, setLng]= useState()
    const [error, setError]= useState()

    const handleLoc= (e)=> {
        setLat(e.coords.latitude)
        setLng(e.coords.longitude)
    }
    const handleError= (error)=> {
        setError(error)
    }
    //Genera errores usar el useLayout o useEffect
    // useLayoutEffect(()=> {
    //     navigator.geolocation.getCurrentPosition(handleLoc, handleError)
    // },[]) 

    navigator.geolocation.watchPosition(
        handleLoc,
        handleError)

    return {
        lat,
        lng,
        error
    }
} 

export default useLoc