import React from "react";
import { login } from "./Loginfunction.js";
import "./Form.css";
import { useState } from "react";
import bqlogo from '../assets/img/bqlogo.png'


export function Form({setUser}) {
    const [correo, setCorreo] = useState("grace.hopper@systers.xyz")
    const [contraseña, setContraseña] = useState("123456")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(correo === "" || contraseña === "") {
            setError(true)
            return
        }
        
        login(correo, contraseña)
        .then((res) => {
        setError(false)
        
        setUser({ 
            token: res.accessToken,
            user: res.user,
            })
        })
        .catch((err)=>{
            console.log(err)
        })
        

    }

    return (
        <section>
            <img src={bqlogo} alt="BQ-logo" className="logo" />
            <h1>Login</h1>
            <form 
                className= "formLogin"
                onSubmit={handleSubmit}
            >
                <input 
                type="email"
                value={correo}
                onChange= {e => setCorreo(e.target.value)}
                />
                <input type="password"
                value={contraseña}
                onChange= {e => setContraseña(e.target.value)}
                />

                <button>Iniciar sesión</button>
            </form>
            {error && <p>ERROR: Revisa tu correo o contraseña</p>}
        </section>
    )
}

// funcion fetch que se llama en el onclick de iniciar sesión. 