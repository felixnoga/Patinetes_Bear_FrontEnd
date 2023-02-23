import React from "react";
import { Link } from "react-router-dom";
import '../assets/LandingPage.css'
import logoLanding from '../assets/images/logolanding.png'


const LandingPage = () => {

    return(
        <div className="container-logo-landing">
            <div className="img-landing">
                <img className="logo-landing" src={logoLanding}></img>
            </div>
            <Link className="link-landing" to='/login'>
            <div className="title-landing"><h1>Reserva tu <b className="subtitle-landing">ScooterBear</b></h1></div>
            </Link>
        </div>
    )
}
export default LandingPage;