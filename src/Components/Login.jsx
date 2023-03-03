import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "../context/context";
import {useState} from 'react';
import '../assets/Login.css'

const Login=() => {

    const {log}= useAppContext()
    const toHome= useNavigate();

    const url = `${process.env.REACT_APP_BASE_URL}/login`; 

    const [data, setData] = useState({
        email:"",
        password:""
    })

    const login = async (e) => {
        e.preventDefault(); 
        
        if((data.email=="") || (data.password=="")) {
            if(data.email=="") {
                alert("falta email")
            } else if (data.password==""){
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

        if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            localStorage.setItem("id", parseRes.id);

            log();
            toHome("/home");
 
           } else {
            console.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
    }

    function handle(e){
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

        return(
            <>  
            <div className="title-login2">
               <h1>Inicia de Sesión</h1>
           </div>
               <div className="login-conteiner">
   
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
                   {/* <button type='button' className="login-btn" onClick={autoEnter}>TEST</button> */}
   
               </div>
           </>
        )

}

export default Login;