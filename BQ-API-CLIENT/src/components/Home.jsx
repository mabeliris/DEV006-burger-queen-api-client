import { getProducts} from "./functions.js"
import { useState, useEffect} from 'react';
import { filterByProduct } from "./functions.js";


// useState: guardar una variable que puede cambiar de valor.
// useEffect: controlar cuando se ejecutan algun efecto secundario

export function Home({ user, setUser }) {

    const [products, setProducts] = useState([])

     const [ filterType, setFilterType ] = useState("Desayuno");

     const [ selectedProducts, setSelectedProducts ] = useState([]);

      

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

const addProducts = (productToAdd) => {
  
  
   setSelectedProducts([...selectedProducts, productToAdd]);
  
};
 console.log(addProducts)



return (
        <div>

            <button onClick={handleFilterDesayuno}> DESAYUNO </button> 
            <button onClick={handleFilter}> ALMUERZO Y CENA</button>
            
            {filteredProducts.map((product) => ( 
                
                  <button onClick={() => addProducts({name:product.name, price:product.price})} key={product.id}>
                     
                    {product.name} ${product.price}
                  </button>
                 
            ))}
            
            
            <input type="text" placeholder="Nombre del cliente" />
            <section>
                
                <h3> la orden va a acá</h3>
                {selectedProducts.map((product, index) => (
                 <div key={index}>
                    {product.name} ${product.price}
                 </div>
                ))}
                
            </section>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}
