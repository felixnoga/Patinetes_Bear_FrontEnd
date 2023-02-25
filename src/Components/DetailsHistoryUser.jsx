import "../assets/detailsHistoryUser.css"
import CardCancel from './CardCancel'
import CardInCourse from './CardInCourse'
import NabBarBear from './Navbar'
import tripAPI from '../services/tripsAPI'
import React, { useState, useEffect } from 'react'


const DetailsHistoryUser = () => {

  const [ trips, setTrips] = useState([]);

  useEffect(() => {
      const getAllTrip = async() => {
         const response = await tripAPI.getAllTrip();
         console.log(response);
         setTrips(response)
      }
      getAllTrip();
  }, [])


  return (
    <div>
      <NabBarBear />
      <div className='big-history-details'>
        <h1 className='title-history'>Historial de viajes</h1>
        <div className='big-details'>
          <div className='detail-date'>
            <h1>Fecha</h1>
          </div>
          <div className='detail-price'>
            <h1>Precio</h1>
          </div>
          <div className='detail-State'>
            <h1>Estado de Viaje</h1>
          </div>
        </div>
        <CardCancel />
        <CardInCourse />
        <CardInCourse />
        <CardCancel />
        <CardInCourse />
      </div>
    </div>
  )
}

export default DetailsHistoryUser