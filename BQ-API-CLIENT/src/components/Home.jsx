import { getProducts } from "./functions.js"
import { useState, useEffect, useContext } from 'react';
import { filterByProduct } from "./functions.js";
import { addProduct } from "./Cart.jsx";

// useState: guardar una variable que puede cambiar de valor.
// useEffect: controlar cuando se ejecutan algun efecto secundario

export function Home({ user, setUser }) {

    const [products, setProducts] = useState([])

     const [ filterType, setFilterType ] = useState("Desayuno");

    const handleFilterDesayuno = () => {
        setFilterType("Desayuno")
    }

    const handleFilter = () => {
    setFilterType("Almuerzo")      
    }
    
    function createProducts() {
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
// variable de estado para pintar la data. Desayuno / cena. Decidir que tipo de producto se muestra. 

const filteredProducts = filterByProduct(products, filterType);

return (
        <div>

            <button onClick={handleFilterDesayuno}> DESAYUNO </button> 
            <button onClick={handleFilter}> ALMUERZO Y CENA</button>
            {filteredProducts.map((product) => ( 
                <button onClick={addProduct} key={product.id}>{product.name} ${product.price} </button>
            ))}
            <input type="text" placeholder="Nombre del cliente" />
            <section>
                <h3> la orden va a acá</h3>
            </section>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}