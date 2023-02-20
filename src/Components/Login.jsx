import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "../context/context";
import { useState } from 'react';
import axios from 'axios';
import '../assets/Login.css'

const Login = () => {
    const { log } = useAppContext()
    const toHome = useNavigate();

    const url = "http://localhost:3005/login";

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    function login(e) {
        e.preventDefault();
        if ((data.email == "") || (data.password == "")) {
            if (data.email == "") {
                alert("falta email")
            } else if (data.password == "") {
                alert("falta contraseña");
            }
            return;
        }


        axios.post(url, {
            email: data.email,
            password: data.password
        })
            .then(res => {
                log()
                toHome("/")
            });
    }

    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    // pruebas para saltar el login.
    const autoEnter = () => {
        log()
        toHome("/")
    }

    return (
        <>  
         <div className="title-login2">
            <h1>Inicia de Sesión</h1>
        </div>
            <div className="login-container">

                <div className="big-login-input">
                    <div>
                        <input className='login2-input' type="text" name="email" placeholder="Email" required onChange={(e) => handle(e)} id="email" value={data.email} />
                    </div>

                    <div >
                        <input className='login2-input' type="password" placeholder="Contraseña" required onChange={(e) => handle(e)} id="password" value={data.password} />
                    </div>
                </div>
                <div className="">
                    <button type='button' className="login2-btn" onClick={login}>Login</button>
                </div>
                <div className="box-login">
                <Link className='link' to="/register">
                <h4 className="subtitle-login">¿No tienes cuenta todavia? <b className="reg">Registrate</b> </h4>
                </Link>
                </div>
                {/* para pruebas solo */}
                <button type='button' className="login-btn" onClick={autoEnter}>TEST</button>

            </div>
        </>

    )

}

export default Login