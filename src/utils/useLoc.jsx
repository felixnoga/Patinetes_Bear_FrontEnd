import { useEffect } from "react";
import { useLayoutEffect, useState } from "react";

const useLoc= ()=> {
    const [lat, setLat]=useState()
    const [lng, setLng]= useState()
    const [error, setError]= useState()

    const handleLoc= (e)=> {
        setLat(e.coords.latitude);
        setLng(e.coords.longitude);
        console.log(e.coords)
    }
    const handleError= (error)=> {
        setError(error)
        console.log(error.code)
    }
    // // Genera errores usar el useLayout o useEffect
    // useLayoutEffect(()=> {
    //     navigator.geolocation.getCurrentPosition(handleLoc, handleError)
    // },[]) 
    useEffect( ()=>{
    if(!navigator.geolocation){
        return setError( "No hay ubicacion disponible")
    }
    const watchLoc= navigator.geolocation.watchPosition(
        handleLoc,
        handleError,
        { enableHighAccuracy: true,
        });
    return (
    () => navigator.geolocation.clearWatch(watchLoc))
    },[])

    return {
        lat,
        lng,
        error
    }
} 

export default useLoc