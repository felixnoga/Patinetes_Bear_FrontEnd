import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "../context/context";
import { useState } from 'react';
import axios from 'axios';
import '../assets/HistoryKm.css'
import { RxCrossCircled } from "react-icons/rx";

const HistoryKm = () => {

    return (

        <div className="big-conteiner">
            <div className="super-title" >
                <div>
                <RxCrossCircled className="icon-cross"/>
                </div>
                <div>
            <h1  className="title-history"><b>Historial</b></h1>
            </div>
            </div>
         
        
            <div className="conteiner-subtitle">
                            <div className="title-date">
                    <h2 className="date">ENERO 2023</h2>
                </div>                
                <div className="history-container">
                    <div className="trip-title">
                        <div className="trip">Viaje</div>
                        <div className="price">€</div>
                    </div>
                    <div className='history-input'>
                        <input className="input-text" type="text" placeholder="22/01/2023, 19:29" />
                    </div>
                    <div className="trip-title">
                        <div className="trip">Viaje</div>
                        <div className="price">€</div>
                    </div>
                    <div className='history-input'>
                        <input className="input-text" type="text" placeholder="22/01/2023, 20:03" />
                    </div>
                </div>
                <div>
                </div>
            </div>

            
            <div className="conteiner-subtitle">
                            <div className="title-date">
                    <h2 className="date">DICIEMBRE 2022</h2>
                </div>                
                <div className="history-container">
                    <div className="trip-title">
                        <div className="trip">Viaje</div>
                        <div className="price">€</div>
                    </div>
                    <div className='history-input'>
                        <input className="input-text" type="text" placeholder="22/12/2022, 13:05" />
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>


    )
}

export default HistoryKm