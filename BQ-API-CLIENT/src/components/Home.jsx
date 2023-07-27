import { getProducts } from "./Loginfunction.js"
import { useState, useEffect } from 'react';

// useState: guardar una variable que puede cambiar de valor.
// useEffect: controlar cuando se ejecutan algun efecto secundario

export function Home({user, setUser}) {

const [products, setProducts] = useState([])

function createProducts(){
console.log(products)
getProducts(user.token)
.then((data) => {
setProducts(data)
}).catch(console.error)
}

    const handleLogout=()=>{
        setUser(null)
    }
useEffect(()=>{
    createProducts()
}, []) //array de dependencias: de que depende que se ejecute esta función
    return(
        <div>
            <h3> la longitud es {products.length} </h3>
            <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    )
}