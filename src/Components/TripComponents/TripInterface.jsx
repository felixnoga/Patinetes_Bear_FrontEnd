import { useEffect, useState } from "react"
import { useTripContext } from "../../context/tripContext"
import useCountdown from "../../utils/useCountdown"
import { types } from "../../utils/bookReducer"
import "../../assets/TripInterface.css"

const TripInterface= ()=> {
    const [toogle, setToogle]= useState(false)
    const { bookState, handleContext } = useTripContext()
    const { timeLeft, init, cancel } = useCountdown(1 , true)

    useEffect(()=>{
        if(bookState.onTrip){
            init()
        }
        if(!bookState.onTrip)
            cancel()
    },[bookState.onTrip])

    const handleButton= ()=>{
        handleContext(types.trip, false)
        setToogle(false)
    }

    if(bookState.onTrip)
    return (
        <div className={`TripInterface-div ${toogle && "isActive"}`}>
            <div className={`TripInterface-div--background ${toogle && "isActive"}`} onClick={() => setToogle(!toogle)}></div>
            <div className={`TripInterface-div--menu ${toogle && "isActive"}`}>
                <div className="TripInterface-div--logo" onClick={()=>setToogle(!toogle)}>
                        <img className="TripInterface-img" src="/30.png" alt="Bear logo"></img>
                        <div className="TripInterface-div--time">
                            {/* TODO hacer componente de tiempo para no tener que renderizarse todo cada vez que cambia el tiempo */}
                            <h5 className="TripInterface-h5">{timeLeft}</h5>
                        </div>
                    </div>
                <div className="TripInterface-div--info">
                    <h4 className="TripInterface-h4">
                        Scooter NUM
                    </h4>
                
                <div className="TripInterface-div--EndTrip">
                    <button type="button" className="TripInterface-button" onClick={handleButton}>
                        FINALIZAR VIAJE
                    </button>
                    <h6 className="TripInterface-h6"> Avisar de una incidencia</h6>
                </div>
                </div>
            </div>
        </div>
    )
}

export default TripInterface