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

        setError(false)
        
        setUser([correo])
    }
    
    return (
        <section>
            <h1>Login</h1>
            <form 
                className= "formLogin"
                onSubmit={handleSubmit}
            >
                <input 
                type="text"
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