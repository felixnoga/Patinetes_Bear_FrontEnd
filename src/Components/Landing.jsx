import React from "react";
import { Link } from "react-router-dom";
import '../assets/LandingPage.css'
import logoLanding from '../assets/images/logolanding.png'
import DragBar from "./auxiliar/DragBar";


const LandingPage = () => {

    return (
        <>
            <div className="backgraund-landing">
                <div className="title-landing">
                </div>
                <div className="landing-conteiner">
                    <div className="big-landing-input">
                        <img className="logo-landing" src={logoLanding}></img>
                    </div>
                    <div className="box-landing">
                        <Link className="link-landing" to='/login'>
                            <div className="title-landing"><h1>Reserva tu <b className="subtitle-landing">ScooterBear</b></h1></div>
                        </Link>
                        {/* <DragBar/> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage;