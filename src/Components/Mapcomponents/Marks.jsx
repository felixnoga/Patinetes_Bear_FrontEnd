import { useState, memo } from "react"
import { Marker } from "react-map-gl"
import { useTripContext } from "../../context/tripContext"
import MarksInfo from "../../utils/Marks.json"

const Marks= memo(({onClick})=>{
    const { isBooked, scooter} = useTripContext()
    const [marksData, setMArksData]= useState(MarksInfo)

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