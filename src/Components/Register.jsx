import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/context";
import { useState } from 'react';
import '../assets/Login.css'


const Register = () => {
    const { log } = useAppContext()
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
                console.log(parseRes);         
    
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                log();
                toLogin("/");
     
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
        <div className="login-container">

            <div className='login-input'>
                <input type="text" name="user_name" placeholder="Nombre" required onChange={(e) => handle(e)} id="user_name" value={data.user_name} />
            </div>

            <div className='login-input'>
                <input type="email" name="email" placeholder="Email" required onChange={(e) => handle(e)} id="email" value={data.email} />
            </div>

            <div className='login-input'>
                <input type="password" name="password" placeholder="Contraseña" required onChange={(e) => handle(e)} id="password" value={data.password} />
            </div>

            <div className='login-input'>
                <input type="password" name="passwordAgain" placeholder="Repite tu contraseña" required onChange={(e) => handle(e)} id="passwordAgain" value={data.passwordAgain} />
            </div>


            <button type='button' className="login-btn" onClick={register}>Registro</button>

            <p>¿Ya tienes cuenta? </p>

            <Link className='link' to="/login">
                <div>
                    <button type='button' className="login-btn" >Login</button>
                </div>
            </Link>
        </div>
    )

}

export default Register;