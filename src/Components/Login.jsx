import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/context"

const Login=() => {
    const {log}= useAppContext()
    const toHome= useNavigate()

    const handleClick= ()=>{
        log()
        toHome("/")
    }
        return(
            <button onClick={handleClick}>Botonaco</button>
        )

}

export default Login