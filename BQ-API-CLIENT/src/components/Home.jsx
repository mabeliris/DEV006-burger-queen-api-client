export function Home({user, setUser}) {
console.log(user)
    const handleLogout=()=>{
        setUser(null)
    }
    return(
        <div>
            
            <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    )
}