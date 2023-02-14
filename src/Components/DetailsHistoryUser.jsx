import React from 'react'
import '../assets/DetailsHistory.css'

const DetailsHistoryUser = () => {
  return (
    <div className='history-navbar-user'>
      <div className='h-navbar-deliveryMan title-navbar-h'>Fecha de viaje </div>
      <div className='h-navbar-order-number title-navbar-h'>Hora</div>
      <div className='h-navbar-price title-navbar-h'>Precio</div>
      <div className='h-navbar-status title-navbar-h'>Estado</div>
    </div>
  )
}

export default DetailsHistoryUser