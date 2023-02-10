import {memo, useState, useEffect, useCallback} from "react"
import { useTripContext } from "../../context/tripContext"
import { Source ,Layer } from "react-map-gl"
import useRequest from "../../services/useRequest"


const TenMinLayer = memo(()=>{
    const {userPosition, isSelected}= useTripContext()
    const [layer, setLayer]= useState(false)
    const {getIso}= useRequest()

    useEffect(()=>{ 
        if (userPosition.length && !isSelected){
            const updateIso = async () => {
                    const [lng, lat] = userPosition;
                    const payload = await getIso(lng, lat);
                    setLayer(payload)
                };
            updateIso()
        }
    }, [userPosition])

    const layerStyle = {
        id: '10MinLayer',
        type: 'fill',
        paint: {
            "fill-opacity": 0.33,
            "fill-color": "#08519c",
            "fill-antialias": true    
        }
    };
    if (layer)
    return(
        <Source 
            id="10MinSource"
            type="geojson"
            data={layer}
        >
            <Layer
                {...layerStyle}
                 >
            </Layer>
        </Source>
    )
    if(!layer)
        return 
} )

export default TenMinLayer