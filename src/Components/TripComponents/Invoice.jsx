import { useNavigate } from "react-router-dom"
import { useTripContext } from "../../context/tripContext"
import "../../assets/Invoice.css"

const Invoice = ()=>{
    const { bookState: {invoice}} = useTripContext()
    const toHome= useNavigate()

    if(invoice === false){
        return(
        <div className="Invoice-div">
                <div className="Invoice-div--body">
                    <p > Todavía no has consumido ningún viaje en esta sesión </p>
                </div>
                <div className="Invoice-div--footer">
                    <button className="Invoice-button"> ACEPTAR </button>
                    <p>Gracias por utilizar nuestro servicio</p>
                </div>
        </div>)
    }
    const exitToHome= ()=>{
        toHome("/")
    }
    if (invoice){
        const { payment, clientupdated } = invoice
        return(
        <div className="Invoice-div">
            <img className="Invoice-img" src="/30.png" alt="Bear logo"></img>
            <div className="Invoice-div--header">
                <h2 className="Invoice-h2"> Patinetes Bear</h2>
                <h2 className="Invoice-h2"> The Bridge</h2>
            </div>
                <h3 className="Invoice-h3"> ID Cliente: {clientupdated.client_id}</h3>
            <div className="Invoice-div--body">
                <div className="Invoice-div--infoID">
                    <h5 className="Invoice-h5"> ID Pago: {payment.payment_id}</h5>
                    <h5 className="Invoice-h5"> ID Viaje:{payment.trip_id}</h5>
                </div>
                <div className="Invoice-div--info">
                    <h4 className="Invoice-h4"> Tiempo de viaje: {payment.triptime} </h4>
                    <h4 className="Invoice-h4">Precio Base: {payment.baseprice} </h4>
                    <h4 className="Invoice-h4">Impuestos: {payment.taxes}</h4>
                    <h4 className="Invoice-h4--Total"> Total: {payment.total_price} €</h4>
                    <h5 className="Invoice-h5"> Tu Cartera : {clientupdated.balance}</h5>
                </div>

            </div>
            <div className="Invoice-div--footer">
                <button className="Invoice-button" onClick={exitToHome}> ACEPTAR </button>
                <p>Gracias por utilizar nuestro servicio</p>
            </div>
            

        </div>
    )}
}

export default Invoice