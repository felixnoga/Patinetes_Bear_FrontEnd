import { useState } from "react"
import { Link } from "react-router-dom"
import "../assets/AsideMenu.css"
import { CgArrowsExchangeAltV, CgMenu } from "react-icons/cg";
import {GiKickScooter } from "react-icons/gi";

const AsideMenu= ()=>  {
    const [toggle, setToggle]= useState(false)

    const handleToggle=()=>{
        setToggle(!toggle)
    }

        return(
            <div className={`AsideMenu-div ${toggle && "isActive"}`}>
                <CgMenu className={`AsideMenu-icon--Menu ${toggle && "isActive"}`} onClick={handleToggle} />
                <div className={`AsideMenu-div--Background ${toggle && "isActive" }`} onClick={handleToggle}>
                    </div>
                 <div className={`AsideMenu ${toggle && "isActive" }`}>
                    <h2 className="AsideMenu-h2">HEY USER</h2>
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
                    {/* <Link to="/historial" className="AsideMenu-link"> */}
                        <h4 className="AsideMenu-h4">Historial</h4>
                     {/* </Link> */}
                    {/* <Link to="/forma_pago" className="AsideMenu-link"> */}
                            <h4 className="AsideMenu-h4">Forma de Pago</h4>
                         {/* </Link> */}
                    {/* <Link to="/ayuda" className="AsideMenu-link"> */}
                            <h4 className="AsideMenu-h4">Ayuda</h4>
                    {/* </Link> */}
                    {/* <Link to="/seguridad" className="AsideMenu-link"> */}
                        <h4 className="AsideMenu-h4">Centro de Seguridad</h4>
                    {/* </Link> */}
                    {/* <Link to="/ajustes" className="AsideMenu-link"> */}
                        <h4 className="AsideMenu-h4">Ajustes</h4>
                    {/* </Link> */}
            
                </div>
          
            </div>
        )


}

export default AsideMenu