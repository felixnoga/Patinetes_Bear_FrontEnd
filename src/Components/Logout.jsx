import { useAppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import '../assets/Login.css'


 

const Logout = () => {

    const toLogin = useNavigate();


    const logOut = (e) =>{

        try {
            localStorage.removeItem("token");
             toLogin("/");

        } catch (err) {
            console.error(err.message);
        }
    }


    return (

        <div> 
        <button type='button' className="login-btn" onClick={logOut}>Logout</button>
        </div>
    )
}

export default Logout;