import { useState, useRef } from "react";
import Map, {Marker} from "react-map-gl"
import useLoc from "../utils/useLoc";
import Marks from "../utils/Marks.json"
import "../assets/Map.css"

const Map2= () => {
    const [viewState, setViewState]= useState({
            latitude: 40.4,
            longitude: -3.68,
            zoom:12,
        })
    const {lat, lng, error}= useLoc()
    const map2ref= useRef()

    const centerView= ()=>{
        if(!error){
        setViewState({
            latitude: lat,
            longitude: lng,
            zoom: 12
        })}
    }

    const warning=(e)=> {
        window.alert(`Has cogido el punto ${e} en ${lat} y ${lng}` )
    }

    return (
        <div className="Map">
        <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
        mapboxAccessToken= {process.env.REACT_APP_MAP_PUBLIC_TOKEN}
        >
            <Marker
                    longitude={lng}
                    latitude={lat}
                    color="red"
                    >
            </Marker>
            {Marks.features.map((point, i) => 
            <Marker key={i}
            longitude={point.geometry.coordinates[0]}
            latitude={point.geometry.coordinates[1]}
            color= "yellow" 
            onClick={()=> warning(point.properties.description)}>
                <img className="Marker-icon"src="/favicon.ico"></img>
            </Marker>)}
        </Map>
        <button onClick={()=> setViewState({
            ...viewState,
            latitude: 40.4,
            longitude: -3.68
        })}>Center</button>
        <button onClick={centerView} > My positon</button>
        </div>
    )
}

export default Map2