import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/context";
import {useClientContext} from "../context/clientDataContext"
import { useState } from 'react';
import '../assets/Register.css'


const Register = () => {
    const { log, handleError } = useAppContext()
    const toLogin = useNavigate();

    const url = "http://localhost:3005/register";

    const [data, setData] = useState({
        user_name: "",
        email: "",
        password: ""
    })

    const register = async (e) => {
        e.preventDefault();

        if ((data.password) !== (data.passwordAgain)) {
            alert("Las contraseñas no son iguales")
            return;
        }

       const body = {

            user_name: data.user_name,
            email: data.email,
            password: data.password
        }
             
            try {
                const res = await fetch (url, 
                {
                    method: "POST",
                    headers: {"Content-Type":"application/json"}, 
                    body: JSON.stringify(body)
                } 
                );
                const parseRes = await res.json(); 
                if (parseRes.error || parseRes.errors) {
                    handleError(parseRes.errors[0].msg)
                        
                    console.log(parseRes);  
                }      
    
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                localStorage.setItem("id", parseRes.id);

               
 
                log();
                toLogin("/home");
      
               } else {
                console.error(parseRes);
              }
            } catch (err) {
              console.error(err.message);
            }
    }

    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    /*const handleClick= ()=>{
        log()
        toHome("/")
    }*/

    return (
        <>
          <div className="title-register2">
            <h1>Inicia tu registro</h1>
        </div>
        <div className="register-conteiner">
        <div className="big-register-input">

            <div>
                <input  className='register-input' type="text" name="user_name" placeholder="Nombre" required onChange={(e) => handle(e)} id="user_name" value={data.user_name} />
            </div>

            <div>
                <input className="register-input" type="text" name="email" placeholder="Email" required onChange={(e) => handle(e)} id="email" value={data.email} />
            </div>

            <div>
                <input className="register-input" type="password" name="password" placeholder="Contraseña" required onChange={(e) => handle(e)} id="password" value={data.password} />
            </div>

            <div>
                <input className="register-input" type="password" name="passwordAgain" placeholder="Repite tu contraseña" required onChange={(e) => handle(e)} id="passwordAgain" value={data.passwordAgain} />
            </div>

            <div>
            <button type='button' disabled={!data.user_name || !data.email || !data.password || !data.passwordAgain} className="register-btn" onClick={register}>Registro</button>
            </div>
            <div className="box-register">
                <Link className='link-register' to="/login">
                <h4 className="subtitle-register">¿Ya tienes cuenta? <b className="register">Ingresa</b> </h4>
                </Link>
                </div>
                </div>

        </div>
        </>
    )

}

export default Register;
