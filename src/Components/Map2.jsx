import { useRef} from "react";
import Map, {Marker, GeolocateControl} from "react-map-gl"
// import useLoc from "../utils/useLoc";
import Marks from "../utils/Marks.json"
import TenMinLayer from "./Mapcomponents/TenMinLayer"
import { MdNavigation } from "react-icons/md";
import "../assets/Map.css"

const Map2= () => {
// pendiente intentar crear un useLoc solo con current position para encuadrar el mapa al empezar.
    // const {lat,lng, error}= useLoc()
    const initialViewState ={
            latitude: 40.4,
            longitude: -3.68,
            zoom:12,
        }
    const map2ref= useRef()
    const geoControl=useRef()

    const centerView = ((e = 40.4, i = -3.68) => {
        map2ref.current?.flyTo({ center: [i, e], zoom:15, duration: 2000 });
    })
// FUNCION IS NEAR comprobará la cercania de los puntos.
    const isNear= (e)=>{
        console.log(e.coords.latitude, e.coords.longitude)
    }
    const activeControl= ()=>{
        if(geoControl)
        geoControl.current.trigger()
    }

    return (
        <div className="Map">
            <Map
            reuseMaps
            ref={map2ref}
            initialViewState= {initialViewState}
            mapStyle={"mapbox://styles/mapbox/streets-v9"}
            mapboxAccessToken= {process.env.REACT_APP_MAP_PUBLIC_TOKEN}
            cursor="auto"
            // activa la geolocalizacion al cargar el mapa directamente
            // onLoad={activeControl}
            >
                {/* Geolocalizacion con funcion para usar de trigger por cercania */}
                <GeolocateControl position="top-right"
                    trackUserLocation="true"
                    ref= {geoControl}
                    onGeolocate={e=>isNear(e)}/>

                {Marks?.features?.map((point) => 
                    <Marker
                    key={point.properties.id}
                    longitude={point.geometry.lng}
                    latitude={point.geometry.lat}
                    color= "yellow" 
                            onClick={() => centerView(point.geometry.lat, point.geometry.lng)}>
                        <img className="Marker-icon"src="/30.png"></img>
                </Marker>)}
                <TenMinLayer/>
            </Map>
            <button onClick={()=> 
                centerView(40.4, -3.68)} 
                className="Map-icon--navcenter">center</button>
            <MdNavigation className="Map-icon--nav"/>
        </div>
    )
}

export default Map2