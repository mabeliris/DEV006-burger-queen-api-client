
import "./Home.css"


// useState: guardar una variable que puede cambiar de valor.
// useEffect: controlar cuando se ejecutan algun efecto secundario

import { getProducts, filterByProduct, createOrderApi } from "./functions.js";
import { useState, useEffect } from 'react';


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
        const order = [{

            client: client,
            products: selectedProducts, //cambiar cómo se está formando qty (detalles)
            status: "pending",
        }];
        console.log(order);

        createOrderApi(order, user.token)
            .then((data) => {
                setOrder(data);
                console.log(order);
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
        const updatedProducts = [...selectedProducts];
        const existingProductIndex = updatedProducts.findIndex(
            (item) => item.product.id === productToAdd.id
        );

        if (existingProductIndex !== -1) {
            // Si el producto ya existe en la orde, actualizar su cantidad.
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

    return (
        <div className="homeDiv">
            <div className="routes">
                <button className="routeBtn">ADMIN</button>
                <button className="routeBtn">MESERX</button>
                <button className="routeBtn">CHEF</button>
                <button onClick={handleLogout}><img className="logoutBtn" src="../src/assets/img/logout.png" alt="delete" /></button>
            </div>
            <br />
            <div className="order">
                <div className="products">
                    <button className="btnHome" onClick={handleFilterDesayuno}> DESAYUNO </button>
                    <button className="btnHome" onClick={handleFilter}> ALMUERZO Y CENA</button>
                    <br />

                    {filteredProducts.map((product) => (
                        <button className="btnOrder" onClick={() => addProducts(product)} key={product.id}>
                            {product.name} ${product.price}
                        </button>
                    ))}
                </div>
                <br />
                <div className="orderList">
                    <input className="inputName" type="text" name="cliente" placeholder="Nombre del cliente" value={client} onChange={createClient}/>
                    <section className="sectionOrder">
                        <h3> ORDEN </h3>
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
                        <h4 className="totalOrder">Total: ${getTotalPrice()}</h4>
                        <button className="deleteOrderBtn" onClick={deleteOrder}>ELIMINAR</button>
                        <button className="sendOrderBtn" onClick={handleCreateOrder}>ENVIAR</button>
                    </section>
                </div>
            </div>
        </div>
    );
}    
