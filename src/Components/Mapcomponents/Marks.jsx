import { useState, memo, useEffect } from "react"
import { Marker } from "react-map-gl"
import { useTripContext } from "../../context/tripContext"
import useRequest from "../../services/useRequest"

const Marks= memo(({onClick})=>{
    const { isBooked, scooter, userPosition} = useTripContext()
    const {getNearbyScooters}= useRequest()
    const [marksData, setMarksData]= useState(false)
   

    useEffect(()=>{
        const getScooters = async()=>{
            const [lngUser, latUser] = userPosition;
            const marks = await getNearbyScooters( lngUser, latUser)
            setMarksData(marks)
        };
        if(userPosition.length !== 0){
            getScooters()
        }

        },[userPosition])


    if (!marksData) return ;
    // Si Esta activa una reserva, solo muestra esa Marca
    if (isBooked && scooter)
        return (
            <Marker
                key={scooter.properties.id}
                longitude={scooter.geometry.lng}
                latitude={scooter.geometry.lat} >
                <img className="Marker-icon" src="/30.png" alt="logo Bear"></img>
            </Marker>
        )
    // Todas las Marcas
    return(
        <>
        {marksData?.features?.map((point) =>
            <Marker
                key={point.properties.id}
                longitude={point.geometry.lng}
                latitude={point.geometry.lat}
                onClick={() => onClick(point)} >
                <img className="Marker-icon" src="/30.png" alt="logo Bear"></img>
            </Marker>)
        }
        </>
    )
})

export default Marks