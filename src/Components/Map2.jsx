import { useState, useRef } from "react";
import Map, {Marker, GeolocateControl} from "react-map-gl"
import useLoc from "../utils/useLoc";
import Marks from "../utils/Marks.json"
import { MdNavigation } from "react-icons/md";
import "../assets/Map.css"

const Map2= () => {
    const [viewState, setViewState]= useState({
            latitude: 40.4,
            longitude: -3.68,
            zoom:12,
            cursor: "auto",
        })
    const map2ref= useRef()

    const centerView= (e= 40.4 , i= -3.68)=>{
        setViewState({
            ...viewState,
            latitude: e,
            longitude: i,
            zoom: viewState.zoom + 1
        })
    }
    const isNear= (e)=>{
        console.log(e.coords.latitude, e.coords.longitude)
    }

    return (
        <div className="Map">
            <Map
            ref={map2ref}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle={"mapbox://styles/mapbox/streets-v9"}
            mapboxAccessToken= {process.env.REACT_APP_MAP_PUBLIC_TOKEN}
            >
                {/* Geolocalizacion con funcion para usar de trigger por cercania */}
                <GeolocateControl position="top-right"
                    trackUserLocation="true"
                    onGeolocate={e=>isNear(e)}/>

                {Marks?.features.map((point) => 
                    <Marker
                    key={point.properties.id}
                    longitude={point.geometry.lng}
                    latitude={point.geometry.lat}
                    color= "yellow" 
                            onClick={() => centerView(point.geometry.lat, point.geometry.lng)}>
                        <img className="Marker-icon"src="/30.png"></img>
                </Marker>)}
            </Map>
            <button onClick={()=> setViewState({
                ...viewState,
                latitude: 40.4,
                longitude: -3.68
            })} className="Map-icon--navcenter" >center</button>
            <MdNavigation className="Map-icon--nav"/>
        </div>
    )
}

export default Map2