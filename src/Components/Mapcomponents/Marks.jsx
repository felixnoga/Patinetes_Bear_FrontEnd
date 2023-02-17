import { useState, memo, useEffect } from "react"
import { Marker } from "react-map-gl"
import { useTripContext } from "../../context/tripContext"
import useRequest from "../../services/useRequest"

const Marks= memo(({onClick})=>{
    const { isBooked, scooter, userPosition, bookState} = useTripContext()
    const {getNearbyScooters}= useRequest()
    const [marksData, setMarksData]= useState(false)
   

    useEffect(()=>{
        const getScooters = async()=>{
            const [lngUser, latUser] = bookState.userPosition;
            try{
                const marks = await getNearbyScooters( lngUser, latUser)
                setMarksData(marks)
            }catch(error){
                // TODO Aviso de fallo en el server.
                setMarksData(false)
                throw new Error(error)
            }
        };
        if(bookState.userPosition.length !== 0){
            getScooters()
        }

        },[bookState.userPosition])


    if (!marksData) return ;
    // Si Esta activa una reserva, solo muestra esa Marca
    if (bookState.isBooked && bookState.scooter)
        return (
            <Marker
                key={bookState.scooter.scooter_id}
                longitude={bookState.scooter.lng}
                latitude={bookState.scooter.lat} >
                <img className="Marker-icon" src="/30.png" alt="logo Bear"></img>
            </Marker>
        )
    // Todas las Marcas
    return(
        <>
        {marksData?.features?.map((point) =>
            <Marker
                key={point.scooter_id}
                longitude={point.lng}
                latitude={point.lat}
                onClick={() => onClick(point)} >
                <img className="Marker-icon" src="/30.png" alt="logo Bear"></img>
            </Marker>)
        }
        </>
    )
})

export default Marks