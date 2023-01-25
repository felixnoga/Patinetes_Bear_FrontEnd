import { useState, useRef } from "react";
import Map, {Marker} from "react-map-gl"
import useLoc from "../utils/useLoc";
import AsideMenu from "./AsideMenu";
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
    const {lat, lng, error}= useLoc()
    const map2ref= useRef()

    const centerView= (e= lat, i= lng)=>{
        if(!error){
        setViewState({
            ...viewState,
            latitude: e,
            longitude: i,
            zoom: viewState.zoom + 1
        })}
    }

    return (
        <div className="Map">
        {/* <AsideMenu/> */}
            <Map
            ref={map2ref}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle={"mapbox://styles/mapbox/streets-v9"}
            mapboxAccessToken= {process.env.REACT_APP_MAP_PUBLIC_TOKEN}
            >
                {!error && <Marker
                        longitude={lng}
                        latitude={lat}
                        color="red"
                        >
                </Marker>}
                {Marks?.features.map((point, i) => 
                <Marker
                key={i}
                longitude={point.geometry.coordinates[0]}
                latitude={point.geometry.coordinates[1]}
                color= "yellow" 
                        onClick={() => centerView(point.geometry.coordinates[1], point.geometry.coordinates[0])}>
                    <img className="Marker-icon"src="/30.png"></img>
                </Marker>)}
            </Map>
            <button onClick={()=> setViewState({
                ...viewState,
                latitude: 40.4,
                longitude: -3.68
            })} className="Map-icon--navcenter" >Center</button>
            <MdNavigation className="Map-icon--nav" onClick={()=>centerView()}/>

        </div>
    )
}

export default Map2