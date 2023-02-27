import React from "react";
import "../assets/CardInCourse.css"


const CardInCourse = (props) => {

    return(
        <div className='big-gig-details3'>
      <div className='big-details3'>
        <div className='detail-date3'>
          <h1>Fecha de pedido</h1>
          <h3 className="subtitle-details"><div></div></h3>
        </div>
        <div className='detail-price3'>
          <h1>$ 4</h1>
          <h3>Hola</h3>
        </div>
        <div className='detail-State3'>
          <button className="btn-bigcard2" type="button"> En curso</button>
        </div>
      </div>    
    </div>
    )
}

export default CardInCourse