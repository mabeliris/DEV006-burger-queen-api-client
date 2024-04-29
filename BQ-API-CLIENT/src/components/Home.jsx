
import "./Home.css"
import { Navbar } from "./Navbar.jsx";


// useState: guardar una variable que puede cambiar de valor.
// useEffect: controlar cuando se ejecutan algun efecto secundario

import { getProducts, filterByProduct, createOrderApi } from "./functions.js";
import { useState, useEffect } from 'react';



export function Home({ user, setOrders }) {

    

    

    const [products, setProducts] = useState([]);

    const [filterType, setFilterType] = useState("Desayuno");

    const [activeSection, setActiveSection] = useState('meserx');

    const [selectedProducts, setSelectedProducts] = useState([]);

    const [order, setOrder] = useState([])

    const [client, setClient] = useState("");

    


    // investigar: como hacer css in JS

    const handleFilterDesayuno = () => {
        setFilterType("Desayuno");
        
    }; // utilizarla para darle clase al botón

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
    }

    const date = new Date(); // crea un objeto Date con la fecha y hora actual
    
    const [month, day, year] = [
       date.getMonth(),
       date.getDate(),
       date.getFullYear(),
    ];
    const [hour, minutes, seconds] = [
       date.getHours(),
       date.getMinutes(),
       date.getSeconds(),
    ];

    const chain = `${month + 1}/${day}/${year} ${hour}:${minutes}:${seconds}`

    function handleCreateOrder() {
        const createOrder = {
            client: client,
            products: selectedProducts,
            status: "pending",
            dateEntry: chain,
            userId: user.user.id,
        };

        // Mostrar mensaje de confirmación
        const shouldCreateOrder = window.confirm("¿Deseas enviar la orden?");

        if (shouldCreateOrder) {
            createOrderApi(createOrder, user.token)
                .then((data) => {
                    setOrder(data);
                    alert('Pedido enviado exitosamente!')
                    setSelectedProducts([])
                    console.log("esta", selectedProducts)
                    setClient([]);
                    setOrders((prevOrders) => [data, ...prevOrders])
                    

                })
                .catch((error) => {
                    console.error("Error creating order:", error);
                    alert('No se pudo crear la orden:', error);
                });
        }
    }


    function deleteProduct(index) {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
    }

    function deleteOrder() {
        const shouldDeleteOrder = window.confirm("¿Deseas eliminar la orden?");

        if (shouldDeleteOrder) {
            setSelectedProducts([])
            setClient([]);
        }
    }

   

    useEffect(() => {
        createProducts();
    }, []);

    const filteredProducts = filterByProduct(products, filterType);

    const addProducts = (productToAdd) => {
        const updatedProducts = [...selectedProducts];
        const existingProductIndex = updatedProducts.findIndex(
            (item) => item.product.id === productToAdd.id
        );

        if (existingProductIndex !== -1) {
            // Si el producto ya existe en la orden, actualizar su cantidad.
            updatedProducts[existingProductIndex].qty = updatedProducts[existingProductIndex].qty + 1;
        } else {
            // Si el producto no existe en la orden, crearlo.
            updatedProducts.push({ qty: 1, product: productToAdd });
        }
        setSelectedProducts(updatedProducts);
    };

    function removeProduct(index) {
        const updatedProducts = [...selectedProducts];
        const existingProductIndex = updatedProducts.findIndex(
            (item) => item.product.id === updatedProducts[index].product.id
        );

        if (existingProductIndex !== -1) {
            if (updatedProducts[existingProductIndex].qty > 0) {
                updatedProducts[existingProductIndex].qty = updatedProducts[existingProductIndex].qty - 1;
                if (updatedProducts[existingProductIndex].qty === 0) {
                    updatedProducts.splice(existingProductIndex, 1);
                }
            }
        }
        setSelectedProducts(updatedProducts);
    }

    const getTotalPrice = () => {
        return selectedProducts.reduce((total, item) => total + item.product.price * item.qty, 0);
    }

    function alertRoutes() {
        alert("este sitio está en construcción :)")
    }

    //const handleButtonClick = (buttonName) => {
   //     setActiveSection(buttonName);
   // };

    

    return (
        <div className="homeDiv">
            <div className="routes">
                <div className="userEmail">
                    {user && <p className="welcomeMsg">Hola, {user.user.email}</p>}
                </div>
                <Navbar setActiveSection={setActiveSection} />
                
            </div>
            <br />
            <div className="order">
                <div className="products">
                    <button className={ "btnHome" + (filterType==="Desayuno"?" active":"") } onClick={handleFilterDesayuno}> DESAYUNO </button>
                    <button className={ "btnHome" + (filterType==="Desayuno"?"":" active") }onClick={handleFilter}> ALMUERZO Y CENA</button>
                    <br />

                    {filteredProducts.map((product) => (
                        <button className="btnOrder" onClick={() => addProducts(product)} key={product.id}>
                            {product.name} ${product.price}
                        </button>
                    ))}
                </div>
                <br />
                <div className="orderList">
                    <input className="inputName" type="text" name="cliente" placeholder="Nombre del cliente" value={client} onChange={createClient} />
                    <section className="sectionOrder">
                        <h3> ORDEN </h3>
                        <div className="productList">
                            {selectedProducts.map((item, index) => (
                                <section className="productOrder" key={index}>
                                    {item.product.name} ${item.product.price}
                                    <button className="decrease" onClick={() => removeProduct(index)}>-</button>
                                    <p className="itemQty"> {item.qty} </p>
                                    <button className="increase" onClick={() => addProducts(item.product)}>+</button>
                                    <button className="deleteProductBtn" onClick={() => deleteProduct(index)}>
                                        <img style={{ width: 20, height: 20 }} src="../src/assets/img/trashcan.png" alt="delete" />
                                    </button>
                                </section>
                            ))}
                        </div>
                        <h4 className="totalOrder">Total: ${getTotalPrice()}</h4>
                        <button className="deleteOrderBtn" onClick={deleteOrder}>ELIMINAR</button>
                        <button className="sendOrderBtn" onClick={handleCreateOrder}>ENVIAR</button>
                    </section>
                </div>
            </div>
        </div>
    );
}    
