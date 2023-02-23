import { useAppContext } from "../context/context"
import "../assets/ErrorMessage.css"
const ErrorMessage= ()=>{
    const { error, eraseError } = useAppContext()
    if (error)
    return(
        <div className="ErrorMessage-background">
            <div className="ErrorMessage-div">
                <img className="ErrorMessage-icon" src="/30.png" alt="logo Bear"></img>
                <h3 className="ErrorMessage-h3">
                    Lo sentimos, algo salió mal
                </h3>
                <p className="ErrorMessage-p">
                    {error}
                </p>
                <button type="button" className="ErrorMessage-button" onClick={eraseError} >
                    Aceptar 
                </button>
            </div>
        </div>
    )
        
}

export default ErrorMessage