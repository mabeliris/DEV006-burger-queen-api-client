import { getProducts } from "./Loginfunction.js"
import { useState, useEffect } from 'react';

// useState: guardar una variable que puede cambiar de valor.
// useEffect: controlar cuando se ejecutan algun efecto secundario

export function Home({ user, setUser }) {

    const [products, setProducts] = useState([])

    function createProducts() {
        console.log(products)
        getProducts(user.token)
            .then((data) => {
                setProducts(data)
            }).catch(console.error)
    }

    const handleLogout = () => {
        setUser(null)
    }
    useEffect(() => {
        createProducts()
    }, []) //array de dependencias: de que depende que se ejecute esta función
        ;

    return (
        <div>
             
            <button> DESAYUNO </button>
            <button> ALMUERZO Y CENA</button>
            {Object.keys(products).map((key) => (
                <li key={key}>{products[key].name} ${products[key].price} </li>
            ))}
            <input type="text" placeholder="Nombre del cliente" />
            <section> 
                <h3> la orden va a acá</h3>
            </section>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}
