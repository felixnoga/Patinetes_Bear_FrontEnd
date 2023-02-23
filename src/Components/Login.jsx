import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "../context/context";
import {useState} from 'react';
import '../assets/Login.css'

const Login = () => {
    const { log } = useAppContext()
    const toHome = useNavigate();

    const url = "http://localhost:3005/login";

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const login = async (e) => {
        e.preventDefault(); 
        
        if((data.email=="") || (data.password=="")) {
            if(data.email=="") {
                alert("falta email")
            } else if (data.password == "") {
                alert("falta contraseña");
            }
            return;
        }

        const body = {
            email: data.email, 
            password:data.password,
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
            toHome("/");
 
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

    // pruebas para saltar el login.
    const autoEnter= ()=>{
        log()
        toHome("/")
    }

    return (
        <>  
         <div className="title-login2">
            <h1>Inicia de Sesión</h1>
        </div>
            <div className="login-conteiner">

                <div className="big-login-input">
                    <div>
                        <input className='login2-input' type="text" name="email" placeholder="Email" required onChange={(e) => handle(e)} id="email" value={data.email} />
                    </div>

        <div className='login-input'>
            <input type="password" name="password" placeholder="Contraseña" required onChange={(e)=>handle(e)} id="password" value={data.password}/>
        </div>
        <div>
            <button type='button' className="login-btn" onClick={login}>Login</button>  
        </div>
        <p>¿No tienes cuenta todavia? </p>
        <Link className='link' to="/register">
        <div>
            <button type='button' className="login-btn" >Regístrate</button>  
        </div>
        </Link>
        {/* para pruebas solo */}
                <button type='button' className="login-btn" onClick={autoEnter}>TEST</button> 

            </div>
        </>

    )

}

export default Login;