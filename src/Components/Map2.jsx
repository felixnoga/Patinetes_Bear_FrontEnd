import { useRef} from "react";
import Map, {GeolocateControl} from "react-map-gl"
import { useTripContext } from "../context/tripContext";
// import useLoc from "../utils/useLoc";
import Marks from "./Mapcomponents/Marks";
import TenMinLayer from "./Mapcomponents/TenMinLayer"
import { MdNavigation } from "react-icons/md";
import "../assets/Map.css"
import { useCallback } from "react";

const Map2= () => {
    const map2ref= useRef()
    const geoControl= useRef()
    const {select, setScooter, updatePos, userPosition}= useTripContext()
// pendiente intentar crear un useLoc solo con current position para encuadrar el mapa al empezar.
    // const {lat,lng, error}= useLoc()
    const initialViewState ={
            latitude: 40.4,
            longitude: -3.68,
            zoom:12,
        }
        //useCallback ya que se pasa a un elemento hijo, la funcion no cambiará ,asi se evitan renderizados innecesarios
    const centerView = useCallback((e) => {
        map2ref.current?.flyTo(
            { center: [e.geometry.lng, e.geometry.lat], zoom:15, duration: 2000 });
        setScooter(e)
        select();
        console.log(e)
    },[])
// FUNCION IS NEAR comprobará la cercania de los puntos.
    const currentPos= (e)=>{
        const [lng, lat]= userPosition
        //La comparacion evita peticiones dobles en layer y re renderizados.
        if(lng !== e.longitude && lat !== e.latitude ){
            updatePos(e.longitude, e.latitude)
            console.log(e.latitude, e.longitude)}
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
                    onGeolocate={e=>currentPos(e.coords)}/>
                <Marks onClick={centerView}/>
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