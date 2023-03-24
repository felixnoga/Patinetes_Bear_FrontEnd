import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import { useTripContext } from "../../context/tripContext"
import { useAppContext } from "../../context/context"
import { FcChargeBattery } from "react-icons/fc";
import { IoMdLock } from "react-icons/io";
import { GiPauseButton } from "react-icons/gi";
import useCountdown from "../../utils/useCountdown"
import useRequest from "../../services/useRequest"
import { types } from "../../utils/bookReducer"
import "../../assets/TripInterface.css"
import SpinRotate from "../../utils/SpinRotate"

const TripInterface= ()=> {
    const [toogle, setToogle]= useState(false)
    const { bookState, handleContext } = useTripContext()
    const { handleError } = useAppContext()
    const { timeLeft, init, cancel } = useCountdown(1 , true)
    const {finishTrip, loading}= useRequest()
    const toPayment= useNavigate()

    useEffect(()=>{
        if(bookState.onTrip){
            init()
        }
        if(!bookState.onTrip)
            cancel()
    },[bookState.onTrip])

    const handleButton= async ()=>{
        // Termina el viaje y pide de vuelta la factura.
        const [lng, lat] = bookState.userPosition
        const trip_id = bookState.trip.trip_id
        try{
            const data= await finishTrip({trip_id ,lng, lat})
            handleContext(types.invoice, data)
            toPayment("/home/payments")
            setToogle(false)

        }catch(error){
            handleError(`ups, parece que ha habido un fallo en la conexión, no pudimos completar tu petición ${error}`)
        }}


    if(bookState.onTrip)
    return (
        <div className={`TripInterface-div ${toogle && "isActive"}`}>
            <div className={`TripInterface-div--background ${toogle && "isActive"}`} onClick={() => setToogle(!toogle)}></div>
            <div className={`TripInterface-div--menu ${toogle && "isActive"}`}>
                <div className="TripInterface-div--logo" onClick={()=>setToogle(!toogle)}>
                        {/* <img className="TripInterface-img" src="/30.png" alt="Bear logo"></img> */}
                        <div className="TripInterface-div--time">
                            {/* TODO hacer componente de tiempo para no tener que renderizarse todo cada vez que cambia el tiempo */}
                            <h5 className="TripInterface-h5--time">{timeLeft}</h5>
                        </div>
                    </div>
                <p className="TripInterface-p--title">Viaje iniciado</p>
                <div className="TripInterface-div--info">
                    <div className="TripInterface-div--battery">
                        <img src="./patinete Black.png" alt="idScooter" className="TripInterface-img-scooterID"></img>
                        <h5 className="TripInterface-h5--scotterID">
                            Nº {bookState?.scooter.scooter_id}
                        </h5>
                    </div>
                    <div className="TripInterface-div--battery">
                            <FcChargeBattery className="TripInterface-icon--bat" />
                            <h5 className="TripInterface-h5--battery"> {`${1.20 * bookState?.scooter.batery} Km`}
                            </h5>
                    </div>
               
                </div>
                
            </div>
            <div className="TripInterface-div--footer">
                <div className="TripInterface-div--btn btn-pause">
                    <GiPauseButton className="TripInterface-btn--icon" />
                    <button type="button" className="TripInterface-button">
                        Pausar viaje
                    </button>
                </div>

                <div className="TripInterface-div--btn btn-finish">
                    <IoMdLock className="TripInterface-btn--icon" />
                    {loading ? <SpinRotate /> : <button type="button" className="TripInterface-button" onClick={handleButton}>
                        Finalizar viaje
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default TripInterface