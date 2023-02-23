import React from 'react'
import "../assets/detailsHistoryUser.css"
import CardCancel from './CardCancel'
import CardInCourse from './CardInCourse'
import NabBarBear from './Navbar'

const DetailsHistoryUser = () => {
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