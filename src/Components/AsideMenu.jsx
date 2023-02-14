import { useState } from "react"
import { Link } from "react-router-dom"
import { useTripContext } from "../context/tripContext";
import "../assets/AsideMenu.css"
import { CgArrowsExchangeAltV, CgMenu, CgTime, CgCreditCard  } from "react-icons/cg";
import { GiKickScooter} from "react-icons/gi";
import { HiQuestionMarkCircle, HiOutlineShieldCheck } from "react-icons/hi2";
import { SlSettings } from "react-icons/sl";

const AsideMenu= ()=>  {
    const {isBooked} = useTripContext()
    const [toggle, setToggle]= useState(false)

    const handleToggle=()=>{
        setToggle(!toggle)
    }

        return(
            <div className={`AsideMenu-div ${toggle && "isActive"}`}>
                <CgMenu className={`AsideMenu-icon--Menu ${toggle && "isActive"}`} onClick={handleToggle} />
                {isBooked && <h2 className="AsideMenu-h2 AsideMenu-h2--booked">Scooter Reservada</h2> }
                <div className={`AsideMenu-div--Background ${toggle && "isActive" }`} onClick={handleToggle}>
                    </div>
                 <div className={`AsideMenu ${toggle && "isActive" }`}>
                    <h2 className="AsideMenu-h2">Hey User</h2>
                    <div className="AsideMenu-div--header">
                        {/* <Link to="/kilometros" className="AsideMenu-Link--headericon"> */}
                            <div className="AsideMenu-div-headericon">
                            <CgArrowsExchangeAltV/>
                            <h4 className="AsideMenu-h4 AsideMenu-h4--header">Kilometros</h4>
                            </div>
                        {/* </Link> */}
                        {/* <Link to="/trayectos" className="AsideMenu-Link--headericon"> */}
                        <div className="AsideMenu-div-headericon">
                            <GiKickScooter />
                            <h4 className="AsideMenu-h4 AsideMenu-h4--header">Trayectos</h4>
                        </div>
                        {/* </Link> */}

                    </div>
                    <Link to="historykm" className="AsideMenu-link">
                    <div className="AsideMenu-div--link"> <CgTime className="AsideMenu-icon" />
                        <h4 className="AsideMenu-h4">Historial</h4> </div>
                     </Link> 
                    {/* <Link to="/forma_pago" className="AsideMenu-link"> */}
                    <div className="AsideMenu-div--link"><CgCreditCard className="AsideMenu-icon" />
                            <p className="AsideMenu-h4">Forma de Pago</p></div>
                         {/* </Link> */}
                    {/* <Link to="/ayuda" className="AsideMenu-link"> */}
                    <div className="AsideMenu-div--link"><HiQuestionMarkCircle className="AsideMenu-icon" />
                            <h4 className="AsideMenu-h4">Ayuda</h4></div>
                    {/* </Link> */}
                    {/* <Link to="/seguridad" className="AsideMenu-link"> */}
                    <div className="AsideMenu-div--link"><HiOutlineShieldCheck className="AsideMenu-icon"/>
                        <h4 className="AsideMenu-h4">Centro de Seguridad</h4></div>
                    {/* </Link> */}
                    {/* <Link to="/ajustes" className="AsideMenu-link"> */}
                    <div className="AsideMenu-div--link"><SlSettings className="AsideMenu-icon" />
                        <h4 className="AsideMenu-h4">Ajustes</h4></div>
                    {/* </Link> */}
            
                </div>
          
            </div>
        )


}

export default AsideMenu