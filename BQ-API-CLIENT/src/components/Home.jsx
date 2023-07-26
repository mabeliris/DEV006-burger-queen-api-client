export function Home({user, setUser}) {
console.log(user)
    const handleLogout=()=>{
        setUser(null)
    }
    return(
        <div>
            <h1>Bienvenido</h1>
            <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    )
}