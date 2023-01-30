import {memo, useState} from "react"
import { Source ,Layer } from "react-map-gl"
import data from "../../utils/layer.json"


const TenMinLayer = memo(()=>{
    const [layer, setLayer]= useState(data)

    const layerStyle = {
        id: '10MinLayer',
        type: 'fill',
        paint: {
            "fill-opacity": 0.33,
            "fill-color": "#08519c",    
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
                {...layerStyle} >
            </Layer>
        </Source>
    )
    if(!layer)
        return 
} )

export default TenMinLayer