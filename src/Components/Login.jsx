import { useNavigate, Link } from "react-router-dom"
import { useAppContext } from "../context/context";
import {useState} from 'react';
import  axios  from 'axios';
import '../assets/Login.css'

const Login=() => {
    const {log}= useAppContext()
    const toHome= useNavigate();

    const url= "http://localhost:3005/login"; 

    const [data, setData] = useState({
        email:"",
        password:""
    })

    function login(e) {
        e.preventDefault(); 
        if((data.email=="") || (data.password=="")) {
            if(data.email=="") {
                alert("falta email")
            } else if (data.password==""){
                alert("falta contraseña");
            }
            return;
        } 


        axios.post(url, {
            email: data.email, 
            password:data.password
        })
        .then(res=>{
                log()
                toHome("/")
        });
    }

    function handle(e){
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
      }

        return(
            <div className="login-container">

        <div className='login-input'>
            <input type="text" name="email" placeholder="Email" required onChange={(e)=>handle(e)} id="email" value={data.email}/>
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

        </div>
        )

}

export default Login