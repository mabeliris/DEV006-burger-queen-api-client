import { login } from "./buttonlogin.js"
import "./Form.css"
import { useState } from "react"
export function Form({setUser}) {
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(correo === "" || contraseña === "") {
            setError(true)
            return
        }
        
        login(correo, contraseña)
        .then((res) => {
            console.log(res)
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

    function handleClick() {
        
    }
    return (
        <section>
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

                <button onClick={handleClick}>Iniciar sesión</button>
            </form>
            {error && <p>ERROR: Revisa tu correo o contraseña</p>}
        </section>
    )
}

// funcion fetch que se llama en el onclick de iniciar sesión. 