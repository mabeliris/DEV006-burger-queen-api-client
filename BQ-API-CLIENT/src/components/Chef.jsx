import React from "react";
import { Navbar } from "./Navbar";
import "./Chef.css"

 

export function Chef ({ setUser, activeSection, setActiveSection, orders }) {
  // Lógica del componente aquí
  const handleLogout = () => {
        setUser(null);
  };

     const handleButtonClick = (buttonName) => {
        console.log('Button clicked:', buttonName);
        setActiveSection(buttonName);
    };

    //agregar boton de enviar a cada orden
    // poner un filtro
    // si el estado es pendiente que quede en la seccion de "en proceso"
    //si el estado es enviado que quede en listos
    //por que no sale el user id de la nueva orden y la anterior tiene 2?

  
   return (
    <> 
    <header>
      <Navbar handleLogout={handleLogout} handleButtonClick={handleButtonClick} activeSection={activeSection}/>
    </header>     
      <section className="filterChef">
        <button className="buttonChef">En proceso</button>
        <button className="buttonChef">Listos</button>
      </section>     
    
      <section>
         {orders.map((chefOrder, index) => (
           <div key={index} className="orderItem">
                <p>ID de usuario: {chefOrder.userId}</p>
                <p>Cliente: {chefOrder.client}</p>
                
              <ul >
               {chefOrder.products.map((product, prodIndex) => (
                 <li key={prodIndex}> {product.product.name} Cantidad: {product.qty} </li>
                ))}
              </ul>
              <p>Estado: {chefOrder.status}</p>
              <p>Fecha de entrada: {chefOrder.dateEntry}</p>
              <button className="sendOrderBtn" >Enviar</button>
              
           </div>
          ))}
        
                  
      </section>
     

      
      
    </>
  );
};
