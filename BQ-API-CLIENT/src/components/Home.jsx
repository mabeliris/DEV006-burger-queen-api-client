
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

    const [productQty, setproductQty] = useState([1])

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
            products: selectedProducts, //cambiar cómo se está formando qty (detalles)
            status: "pending",
        };
        console.log(orderData);

        createOrderApi(orderData, user.token)
            .then((data) => {
                setOrder(data);
                console.log(orderData);
            })
            .catch((error) => {
                console.error("Error creating order:", error);
            });

    }

    // función addProduct
    console.log(selectedProducts)
     console.log(products)

    const addQty = () => {
        return products.reduce((total, product) => total + order.qty, 1);
        setproductQty(addQty)        
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
            updatedProducts.push({qty: 1, product: productToAdd});
        }
    
        setSelectedProducts(updatedProducts);
    };
    console.log(selectedProducts)
    

    const getTotalPrice = () => {
        return selectedProducts.reduce((total, item) => total + item.product.price * item.qty, 0);

    }

    return (
        <div className="homeDiv">
            <button className="routeBtn">ADMIN</button>
            <button className="routeBtn">MESERX</button>
            <button className="routeBtn">CHEF</button>
            <button onClick={handleLogout}  ><img className="logoutBtn" src={"../src/assets/img/logout.png"} alt="delete" /></button>
            <br></br>
            <button className="btnHome" onClick={handleFilterDesayuno}> DESAYUNO </button>
            <button className="btnHome" onClick={handleFilter}> ALMUERZO Y CENA</button>
            <br></br>

            {filteredProducts.map((product) => (
                <button className="btnOrder" onClick={() => addProducts(product)} key={product.id}>

                    {product.name} ${product.price}
                </button>
            ))}

            <br></br>



            <input className="inputName" type="text" name="cliente" placeholder="Nombre del cliente" value={client} onChange={createClient} />
            <section className="sectionOrder">

                <h3> ORDEN </h3>
                {selectedProducts.map((item, index) => (
                    <div className="productOrder" key={index}>
                         {item.product.name} ${item.product.price}
                        <button>-</button>
                        <p> {item.qty} </p>
                        <button onClick={()=>{addProducts(item.product)}}>+</button>
                        <button className="deleteProductBtn" onClick={() => deleteProduct(index)}><img style={{ width: 20, height: 20 }} src={"../src/assets/img/trashcan.png"} alt="delete" /></button>
                    </div>
                ))}
                <h4 className="totalOrder">Total: ${getTotalPrice()}</h4>
                <button className="deleteOrderBtn" onClick={deleteOrder}>ELIMINAR</button>
                <button className="sendOrderBtn" onClick={handleCreateOrder}>ENVIAR</button>
            </section>


        </div>
    );
}
