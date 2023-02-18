
import { useState } from "react"
import "../../assets/TripInterface.css"
const TripInterface= ()=> {
    const [toogle, setToogle]= useState(false)

    return (
        <div className={`TripInterface-div ${toogle && "isActive"}`}>
            <div className={`TripInterface-div--background ${toogle && "isActive"}`} onClick={() => setToogle(!toogle)}></div>
            <div className={`TripInterface-div--menu ${toogle && "isActive"}`}>
                <div className="TripInterface-div--logo" onClick={()=>setToogle(!toogle)}>
                        <img className="TripInterface-img" src="/30.png" alt="Bear logo"></img>
                    </div>
                <div className="TripInterface-div--info">
                    
                </div>

                <div className="TripInterface-div--EndTrip">

                </div>
            </div>
        </div>
    )
}

export default TripInterface