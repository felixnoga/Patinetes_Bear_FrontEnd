import { useState, memo } from "react"
import { Marker } from "react-map-gl"
import MarksInfo from "../../utils/Marks.json"

const Marks= memo(({onClick})=>{
    const [marksData, setMArksData]= useState(MarksInfo)

    if (!marksData) return ;
    return(
        <>
        {marksData?.features?.map((point) =>
            <Marker
                key={point.properties.id}
                longitude={point.geometry.lng}
                latitude={point.geometry.lat}
                onClick={() => onClick(point)} >
                <img className="Marker-icon" src="/30.png"></img>
            </Marker>)
        }
        </>
    )
})

export default Marks