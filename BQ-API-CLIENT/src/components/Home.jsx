
import "./Home.css"


// useState: guardar una variable que puede cambiar de valor.
// useEffect: controlar cuando se ejecutan algun efecto secundario

import { getProducts, filterByProduct, createOrderApi } from "./functions.js";
import { useState, useEffect, useId} from 'react';


export function Home({ user, setUser }) {

    const [products, setProducts] = useState([]);

    const [filterType, setFilterType] = useState("Desayuno");

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [order, setOrder] = useState([])

    const [client, setClient] = useState("");

    const handleFilterDesayuno = () => {
        setFilterType("Desayuno");
    };

    const handleFilter = () => {
        setFilterType("Almuerzo");
    };

    function createProducts() {
        getProducts(user.token)
            .then((data) => {
                setProducts(data);
            })
            .catch(console.error);
    }

    function createClient(event) {
        const { value } = event.target;
        setClient(value);
        console.log(value);
    }

    function handleCreateOrder() {
        const orderData = {
            client: client,
            selectedProducts: selectedProducts,
            status: "pendiente",
        };
    
        console.log(orderData);
    //corregir
        createOrderApi(orderData, user.token)
            .then((data) => {
                setOrder(data);
                console.log(orderData);
            })
            .catch((error) => {
                console.error("Error creating order:", error);
            });
            
    }

    function deleteProduct(index) {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
    }

    function deleteOrder() {
        setSelectedProducts([]);
    }

    const handleLogout = () => {
        setUser(null);
    };

    useEffect(() => {
        createProducts();
    }, []);

    const filteredProducts = filterByProduct(products, filterType);

    const addProducts = (productToAdd) => {
        setSelectedProducts([...selectedProducts, productToAdd]);
    };

    const getTotalPrice = () => {
        return selectedProducts.reduce((total, product) => total + product.price, 0);

    }
        

    return (
        <div>
            <button>Admin</button>
            <button>Meserx</button>
            <button>Chef</button>
            <button  onClick={handleLogout}  ><img src={"../src/assets/img/logout.png"} alt="delete" /></button>
            <br></br>
            <button className="btnHome" onClick={handleFilterDesayuno}> DESAYUNO </button>
            <button className="btnHome" onClick={handleFilter}> ALMUERZO Y CENA</button>
            <br></br>

            {filteredProducts.map((product) => (
                <button className="btnOrder" onClick={() => addProducts({ name: product.name, price: product.price })} key={product.id}>

                    {product.name} ${product.price}
                </button>
            ))}

            <br></br>

           

            <input className="inputName" type="text" name="cliente" placeholder="Nombre del cliente" value={client} onChange={createClient} />
            <section className="sectionOrder"> 

                <h3> ORDEN </h3>
                {selectedProducts.map((product, index) => (
                    <div key={index}>
                        {product.name} ${product.price} <button onClick={() => deleteProduct(index)}><img src={"../src/assets/img/trashcan.png"} alt="delete" /></button>
                    </div>
                ))}
                <h4>Total: ${getTotalPrice()}</h4>
                <button onClick={deleteOrder}>ELIMINAR</button>
                <button onClick={handleCreateOrder}>ENVIAR</button>
            </section>
            

        </div>
    );
}
