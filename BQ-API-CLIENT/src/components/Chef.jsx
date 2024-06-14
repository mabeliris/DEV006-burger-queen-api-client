import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import "./Chef.css";

export function Chef({ setUser, activeSection, setActiveSection, orders }) {
  const [filterOrder, setFilterOrder] = useState("pending");
  const [localOrders, setLocalOrders] = useState([]);

  const handleLogout = () => {
    setUser(null);
  };

   // Este useEffect se ejecuta cuando cambian las órdenes del padre (orders)
   useEffect(() => {
    // Actualizar localOrders asegurando que las órdenes actuales se mantengan
    const updatedOrders = orders.map(order => {
      const existingOrder = localOrders.find(localOrder => localOrder.id === order.id);
      return existingOrder ? existingOrder : { ...order }; // Mantener la orden existente o crear una nueva
    });
    setLocalOrders(updatedOrders);
  }, [orders, localOrders]);
  
  const handleButtonClick = (buttonName) => {
    console.log('Button clicked:', buttonName);
    setActiveSection(buttonName);
    setInitialized(true); // Marcar como inicializado
  };

  const handleFilterOrderPending = () => {
    setFilterOrder("pending");
  };

  const handleFilterReady = () => {
    setFilterOrder("listos");
  };

  const handleSendOrder = (orderId) => {
    setLocalOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: "listos" } : order
      )
    );
  };

  const filteredOrders = localOrders.filter((order) => order.status === filterOrder);

  return (
    <>
      <header>
        <Navbar handleLogout={handleLogout} handleButtonClick={handleButtonClick} activeSection={activeSection} />
      </header>
      <section className="filterChef">
        <button className={"buttonChef" + (filterOrder === "pending" ? " active" : "")} onClick={handleFilterOrderPending}>En proceso</button>
        <button className={"buttonChef" + (filterOrder === "listos" ? " active" : "")} onClick={handleFilterReady}>Listos</button>
      </section>

      <section>
        {filteredOrders.map((chefOrder, index) => (
          <div key={index} className="orderItem">
            <p>ID de usuario: {chefOrder.userId}</p>
            <p>Cliente: {chefOrder.client}</p>
            <ul>
              {chefOrder.products.map((product, prodIndex) => (
                <li key={prodIndex}> {product.product.name} Cantidad: {product.qty} </li>
              ))}
            </ul>
            <p>Estado: {chefOrder.status}</p>
            <p>Fecha de entrada: {chefOrder.dateEntry}</p>
            <button className="sendOrderBtn" onClick={() => handleSendOrder(chefOrder.id)}>Enviar</button>
          </div>
        ))}
      </section>
    </>
  );
}
